import { onMount, createSignal } from 'solid-js';
import { useSites } from '../../store/sites';

// Leaflet types (alternative to Google Maps - free and open source)
declare global {
  interface Window {
    L: any;
  }
}

export default function MapPanel() {
  let mapDiv!: HTMLDivElement;
  const { filteredSites } = useSites();
  const [mapLoaded, setMapLoaded] = createSignal(false);
  let map: any = null;
  let markers: any[] = [];

  const loadLeafletScript = () => {
    return new Promise((resolve) => {
      if (window.L) {
        resolve(true);
        return;
      }

      // Load Leaflet CSS
      const cssLink = document.createElement('link');
      cssLink.rel = 'stylesheet';
      cssLink.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
      document.head.appendChild(cssLink);

      // Load Leaflet JS
      const script = document.createElement('script');
      script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
      script.onload = () => {
        setMapLoaded(true);
        resolve(true);
      };
      document.head.appendChild(script);
    });
  };

  const getMarkerColor = (status: string) => {
    switch(status) {
      case 'connected': return '#10B981'; // Green
      case 'offline': return '#EF4444';   // Red  
      case 'priority': return '#8B5CF6';  // Purple
      default: return '#3B82F6';          // Blue
    }
  };

  const createCustomIcon = (status: string) => {
    const color = getMarkerColor(status);
    
    const svgIcon = `
      <svg width="25" height="30" viewBox="0 0 25 30" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="0" dy="2" stdDeviation="2" flood-opacity="0.3"/>
          </filter>
        </defs>
        <path d="M12.5 1C7.8 1 4 4.8 4 9.5c0 6.3 8.5 19.5 8.5 19.5s8.5-13.2 8.5-19.5C21 4.8 17.2 1 12.5 1z" 
              fill="${color}" stroke="white" stroke-width="2" filter="url(#shadow)"/>
        <circle cx="12.5" cy="9.5" r="3" fill="white"/>
        <circle cx="12.5" cy="9.5" r="1.5" fill="${color}"/>
      </svg>
    `;

    return window.L.divIcon({
      html: svgIcon,
      className: 'custom-div-icon',
      iconSize: [25, 30],
      iconAnchor: [12.5, 30],
      popupAnchor: [0, -30]
    });
  };

  const initializeMap = async () => {
    await loadLeafletScript();
    
    if (!mapLoaded()) return;

    // Initialize map centered on Indonesia
    map = window.L.map(mapDiv, {
      center: [-2.5, 118],
      zoom: 5,
      zoomControl: true,
      attributionControl: true
    });

    // Add tile layer (Google Maps style)
    window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
      maxZoom: 19
    }).addTo(map);

    // Alternative: Google-like tiles (if you want closer to Google Maps appearance)
    // window.L.tileLayer('https://mt1.google.com/vt/lyrs=r&x={x}&y={y}&z={z}', {
    //   attribution: '© Google Maps',
    //   maxZoom: 20
    // }).addTo(map);

    // Add custom CSS for markers
    const style = document.createElement('style');
    style.textContent = `
      .custom-div-icon {
        background: none !important;
        border: none !important;
      }
      .leaflet-popup-content-wrapper {
        border-radius: 8px;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      }
      .leaflet-popup-content {
        margin: 12px;
        font-size: 13px;
        line-height: 1.4;
      }
    `;
    document.head.appendChild(style);

    // Add markers for each site
    updateMarkers();
  };

  const updateMarkers = () => {
    // Clear existing markers
    markers.forEach(marker => map.removeLayer(marker));
    markers = [];

    // Add new markers
    filteredSites().forEach(site => {
      const icon = createCustomIcon(site.status);
      
      const marker = window.L.marker([site.latitude, site.longitude], { 
        icon: icon 
      }).addTo(map);

      // Create popup content
      const popupContent = `
        <div style="min-width: 200px;">
          <h3 style="margin: 0 0 8px 0; color: #1f2937; font-size: 14px; font-weight: 600;">${site.id}</h3>
          <div style="font-size: 12px; color: #6b7280;">
            <div style="margin: 4px 0;">
              <strong>Status:</strong> 
              <span style="color: ${getMarkerColor(site.status)}; font-weight: 500; text-transform: capitalize;">${site.status}</span>
            </div>
            <div style="margin: 4px 0;"><strong>Region:</strong> ${site.region}</div>
            <div style="margin: 4px 0;"><strong>Location:</strong> ${site.latitude.toFixed(4)}, ${site.longitude.toFixed(4)}</div>
          </div>
        </div>
      `;

      marker.bindPopup(popupContent);
      markers.push(marker);

      // Add pulsing effect for connected/priority sites
      if (site.status === 'connected' || site.status === 'priority') {
        const pulseIcon = marker.getElement();
        if (pulseIcon) {
          pulseIcon.style.animation = 'pulse 2s infinite';
        }
      }
    });
  };

  onMount(() => {
    // Add CSS for pulse animation
    const pulseStyle = document.createElement('style');
    pulseStyle.textContent = `
      @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.1); }
        100% { transform: scale(1); }
      }
    `;
    document.head.appendChild(pulseStyle);

    initializeMap();
    
    // Update markers every 5 seconds
    const interval = setInterval(updateMarkers, 5000);
    
    return () => {
      clearInterval(interval);
      // Cleanup
      if (map) {
        map.remove();
      }
    };
  });

  return (
    <div class="panel h-full w-full flex overflow-hidden">
      {/* Left Sidebar */}
      <div class="w-64 flex flex-col bg-white border-r border-gray-200">
        {/* Header */}
        <div class="p-4 border-b border-gray-200">
          <h3 class="font-semibold text-gray-800 text-sm">Smart SPBU Operations Center</h3>
          <p class="text-xs text-gray-500 mt-1">Real-time monitoring</p>
        </div>
        
        {/* Live Map Section */}
        <div class="p-4 border-b border-gray-200">
          <div class="bg-blue-500 text-white px-3 py-2 rounded text-xs font-medium mb-3">Live Map</div>
          <div class="space-y-2 text-xs">
            <div class="flex items-center gap-2">
              <div class="w-3 h-3 rounded-full bg-emerald-500 shadow-sm"></div>
              <span class="text-gray-700">Connected: Stations online & operational</span>
            </div>
            <div class="flex items-center gap-2">
              <div class="w-3 h-3 rounded-full bg-red-500 shadow-sm"></div>
              <span class="text-gray-700">Offline: SPBU needing connectivity</span>
            </div>
            <div class="flex items-center gap-2">
              <div class="w-3 h-3 rounded-full bg-violet-500 shadow-sm"></div>
              <span class="text-gray-700">Priority: High priority rollout sites</span>
            </div>
            <div class="flex items-center gap-2">
              <div class="w-3 h-3 rounded-full bg-blue-500 shadow-sm"></div>
              <span class="text-gray-700">Default: Standard monitoring</span>
            </div>
          </div>
        </div>

        {/* Live Statistics */}
        <div class="p-4 border-b border-gray-200">
          <h4 class="font-medium text-gray-800 text-xs mb-3">Live Statistics</h4>
          <div class="space-y-2 text-xs">
            <div class="flex justify-between">
              <span class="text-gray-600">Pre-Purchase Stations</span>
              <span class="font-medium text-blue-600">5,518</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600">Active Stations</span>
              <span class="font-medium text-green-600">2,280</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600">On-Status Technicians</span>
              <span class="font-medium text-gray-800">150+</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600">Offline Stations</span>
              <span class="font-medium text-red-600">2,280</span>
            </div>
          </div>
        </div>

        {/* Status Indicators */}
        <div class="p-4">
          <h4 class="font-medium text-gray-800 text-xs mb-3">Status Indicators</h4>
          <div class="space-y-2 text-xs">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2">
                <div class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                <span class="text-gray-700">Connected</span>
              </div>
              <span class="text-emerald-600 font-semibold">Active</span>
            </div>
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2">
                <div class="w-2 h-2 rounded-full bg-red-500"></div>
                <span class="text-gray-700">Offline</span>
              </div>
              <span class="text-red-600 font-semibold">Alert</span>
            </div>
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2">
                <div class="w-2 h-2 rounded-full bg-violet-500 animate-pulse"></div>
                <span class="text-gray-700">Priority</span>
              </div>
              <span class="text-violet-600 font-semibold">Focus</span>
            </div>
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2">
                <div class="w-2 h-2 rounded-full bg-blue-500"></div>
                <span class="text-gray-700">Standard</span>
              </div>
              <span class="text-blue-600 font-semibold">Normal</span>
            </div>
          </div>
          
          {/* Legend for marker animations */}
          <div class="mt-4 pt-3 border-t border-gray-100">
            <p class="text-xs text-gray-500 mb-2">Animation Legend:</p>
            <div class="space-y-1 text-xs">
              <div class="flex items-center gap-2">
                <div class="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></div>
                <span class="text-gray-600">Pulsing = Active status</span>
              </div>
              <div class="flex items-center gap-2">
                <div class="w-2 h-2 rounded-full bg-gray-400"></div>
                <span class="text-gray-600">Static = Inactive status</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Map Container */}
      <div class="flex-1 flex flex-col">
        <div class="flex items-center gap-4 px-3 py-2 border-b border-gray-200 text-xs bg-gray-50">
          <div class="font-semibold text-gray-700">Indonesia SPBU Connectivity Status - Interactive Map</div>
          {!mapLoaded() && (
            <div class="flex items-center gap-2 text-blue-600">
              <div class="w-3 h-3 border border-blue-600 border-t-transparent rounded-full animate-spin"></div>
              <span>Loading map...</span>
            </div>
          )}
          {mapLoaded() && (
            <div class="text-green-600 text-xs">✓ Map loaded</div>
          )}
        </div>
        <div ref={mapDiv} class="flex-1" style={{ "min-height": "400px" }} />
      </div>
    </div>
  );
}
