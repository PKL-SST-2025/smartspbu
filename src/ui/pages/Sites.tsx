import { createSignal } from 'solid-js';
import { HiSolidMapPin, HiSolidSignal, HiSolidClock } from 'solid-icons/hi';

interface SiteRow { 
  id: string; 
  region: string; 
  status: string; 
  level: number; 
  lastSeen: string; 
}

export default function Sites() {
  const [rows] = createSignal<SiteRow[]>([
    { id: 'SPBU-1023', region: 'Jakarta', status: 'connected', level: 72, lastSeen: '1m' },
    { id: 'SPBU-2344', region: 'Bandung', status: 'offline', level: 34, lastSeen: '15m' },
    { id: 'SPBU-8842', region: 'Medan', status: 'connected', level: 56, lastSeen: '2m' },
    { id: 'SPBU-1045', region: 'Bandung', status: 'connected', level: 89, lastSeen: '30s' },
    { id: 'SPBU-3567', region: 'Yogyakarta', status: 'connected', level: 67, lastSeen: '3m' },
    { id: 'SPBU-7823', region: 'Balikpapan', status: 'offline', level: 23, lastSeen: '22m' },
    { id: 'SPBU-9901', region: 'Makassar', status: 'priority', level: 45, lastSeen: '5m' },
    { id: 'SPBU-4456', region: 'Banda Aceh', status: 'connected', level: 78, lastSeen: '1m' },
    { id: 'SPBU-6678', region: 'Denpasar', status: 'offline', level: 12, lastSeen: '45m' },
    { id: 'SPBU-1234', region: 'Purwokerto', status: 'connected', level: 91, lastSeen: '2m' },
    { id: 'SPBU-5789', region: 'Jayapura', status: 'priority', level: 38, lastSeen: '8m' },
    { id: 'SPBU-8901', region: 'Batam', status: 'connected', level: 83, lastSeen: '1m' },
    { id: 'SPBU-2468', region: 'Padang', status: 'offline', level: 19, lastSeen: '31m' },
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected': return 'bg-emerald-100 text-emerald-700';
      case 'offline': return 'bg-red-100 text-red-700';
      case 'priority': return 'bg-orange-100 text-orange-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusDot = (status: string) => {
    switch (status) {
      case 'connected': return 'bg-emerald-500';
      case 'offline': return 'bg-red-500';
      case 'priority': return 'bg-orange-500';
      default: return 'bg-gray-500';
    }
  };

  const getTankColor = (level: number) => {
    if (level >= 70) return 'bg-emerald-500';
    if (level >= 40) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div class="p-6 space-y-6">
      {/* Header */}
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-gray-900">Sites Management</h1>
          <p class="text-gray-600 mt-1">Monitor all SPBU locations and their status</p>
        </div>
        <div class="flex items-center gap-4 text-sm text-gray-600">
          <div class="flex items-center gap-2">
            <div class="w-2 h-2 rounded-full bg-emerald-500"></div>
            <span>Connected</span>
          </div>
          <div class="flex items-center gap-2">
            <div class="w-2 h-2 rounded-full bg-orange-500"></div>
            <span>Priority</span>
          </div>
          <div class="flex items-center gap-2">
            <div class="w-2 h-2 rounded-full bg-red-500"></div>
            <span>Offline</span>
          </div>
        </div>
      </div>

      {/* Sites Grid */}
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {rows().map((site) => (
          <div class="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-lg transition-all duration-200 hover:border-blue-200">
            {/* Site Header */}
            <div class="flex items-start justify-between mb-4">
              <div>
                <h3 class="font-semibold text-gray-900 text-lg">{site.id}</h3>
                <div class="flex items-center gap-1 text-gray-600 mt-1">
                  <HiSolidMapPin size={14} />
                  <span class="text-sm">{site.region}</span>
                </div>
              </div>
              <div class={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(site.status)}`}>
                <div class={`w-2 h-2 rounded-full ${getStatusDot(site.status)}`}></div>
                {site.status}
              </div>
            </div>

            {/* Tank Level */}
            <div class="mb-4">
              <div class="flex items-center justify-between mb-2">
                <span class="text-sm font-medium text-gray-700">Tank Level</span>
                <span class="text-sm font-semibold text-gray-900">{site.level}%</span>
              </div>
              <div class="w-full bg-gray-200 rounded-full h-2">
                <div 
                  class={`h-2 rounded-full transition-all duration-300 ${getTankColor(site.level)}`}
                  style={{ width: `${site.level}%` }}
                ></div>
              </div>
            </div>

            {/* Last Seen */}
            <div class="flex items-center gap-2 text-sm text-gray-600">
              <HiSolidClock size={14} />
              <span>Last seen {site.lastSeen} ago</span>
            </div>
          </div>
        ))}
      </div>

      {/* Summary Stats */}
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mt-8">
        <div class="bg-white rounded-xl border border-gray-200 p-4">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <HiSolidMapPin class="text-blue-600" size={20} />
            </div>
            <div>
              <p class="text-sm text-gray-600">Total Sites</p>
              <p class="text-xl font-bold text-gray-900">{rows().length}</p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-xl border border-gray-200 p-4">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
              <HiSolidSignal class="text-emerald-600" size={20} />
            </div>
            <div>
              <p class="text-sm text-gray-600">Connected</p>
              <p class="text-xl font-bold text-gray-900">{rows().filter(s => s.status === 'connected').length}</p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-xl border border-gray-200 p-4">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <HiSolidSignal class="text-orange-600" size={20} />
            </div>
            <div>
              <p class="text-sm text-gray-600">Priority</p>
              <p class="text-xl font-bold text-gray-900">{rows().filter(s => s.status === 'priority').length}</p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-xl border border-gray-200 p-4">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
              <HiSolidSignal class="text-red-600" size={20} />
            </div>
            <div>
              <p class="text-sm text-gray-600">Offline</p>
              <p class="text-xl font-bold text-gray-900">{rows().filter(s => s.status === 'offline').length}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
