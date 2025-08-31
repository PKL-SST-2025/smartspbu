import { onMount, createSignal } from 'solid-js';
import KpiCard from '../components/KpiCard';
import { colors } from '../../theme';
import MapPanel from './MapPanel';
import TicketsPanel from './TicketsPanel';
import ConnectivityStatusPanel from './Panels/ConnectivityStatusPanel';
import OperationalCapabilityPanel from './Panels/OperationalCapabilityPanel';
import ImpactTrackingPanel from './Panels/ImpactTrackingPanel';
import SlaTrendChart from '../components/Charts/SlaTrendChart';

export default function Dashboard() {
  const [kpis, setKpis] = createSignal({
    total: 7600,
    connected: 5518,
    offline: 2280,
    uptime: 99.5,
    technicians: 150,
  });
  
  const [loading, setLoading] = createSignal(true);

  onMount(() => {
    // Simulate API loading
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  });

  return (
    <div class="flex flex-col gap-6 animate-in fade-in duration-700">
      {/* Top KPI Cards - Enhanced with transitions */}
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div class="bg-white p-6 rounded-xl border border-gray-200 text-center shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105 animate-in slide-in-from-top-1 duration-500">
          {loading() ? (
            <>
              <div class="skeleton h-8 w-16 mx-auto mb-2 rounded"></div>
              <div class="skeleton h-4 w-20 mx-auto rounded"></div>
            </>
          ) : (
            <>
              <div class="text-3xl font-bold text-blue-600 transition-colors duration-300">7,600</div>
              <div class="text-sm text-gray-600 mt-2">Total SPBU</div>
            </>
          )}
        </div>
        <div class="bg-white p-6 rounded-xl border border-gray-200 text-center shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105 animate-in slide-in-from-top-2 duration-500">
          {loading() ? (
            <>
              <div class="skeleton h-8 w-16 mx-auto mb-2 rounded"></div>
              <div class="skeleton h-4 w-20 mx-auto rounded"></div>
            </>
          ) : (
            <>
              <div class="text-3xl font-bold text-green-600 transition-colors duration-300">5,518</div>
              <div class="text-sm text-gray-600 mt-2">Connected</div>
            </>
          )}
        </div>
        <div class="bg-white p-6 rounded-xl border border-gray-200 text-center shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105 animate-in slide-in-from-top-3 duration-500">
          {loading() ? (
            <>
              <div class="skeleton h-8 w-16 mx-auto mb-2 rounded"></div>
              <div class="skeleton h-4 w-20 mx-auto rounded"></div>
            </>
          ) : (
            <>
              <div class="text-3xl font-bold text-red-600 transition-colors duration-300">2,280</div>
              <div class="text-sm text-gray-600 mt-2">Offline</div>
            </>
          )}
        </div>
        <div class="bg-white p-6 rounded-xl border border-gray-200 text-center shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105 animate-in slide-in-from-top-4 duration-500">
          {loading() ? (
            <>
              <div class="skeleton h-8 w-16 mx-auto mb-2 rounded"></div>
              <div class="skeleton h-4 w-20 mx-auto rounded"></div>
            </>
          ) : (
            <>
              <div class="text-3xl font-bold text-blue-600 transition-colors duration-300">99.5%</div>
              <div class="text-sm text-gray-600 mt-2">Uptime</div>
            </>
          )}
        </div>
      </div>

      {/* Main Content Grid with smooth transitions */}
      <div class="grid grid-cols-1 2xl:grid-cols-4 gap-6 animate-in slide-in-from-bottom duration-700 delay-500">
        {/* Map Panel - Enhanced with loading state */}
        <div class="2xl:col-span-3 h-[720px] group">
          <div class="h-full transform transition-all duration-500 hover:shadow-xl rounded-xl overflow-hidden">
            <MapPanel />
          </div>
        </div>

        {/* Right column: stack the smaller panels with staggered animation */}
        <div class="2xl:col-span-1 flex flex-col gap-4">
          <div class="transform transition-all duration-300 hover:scale-105 hover:shadow-lg animate-in slide-in-from-right duration-600 delay-700">
            <ConnectivityStatusPanel />
          </div>
          <div class="transform transition-all duration-300 hover:scale-105 hover:shadow-lg animate-in slide-in-from-right duration-600 delay-800">
            <OperationalCapabilityPanel />
          </div>
          <div class="transform transition-all duration-300 hover:scale-105 hover:shadow-lg animate-in slide-in-from-right duration-600 delay-900">
            <ImpactTrackingPanel />
          </div>
        </div>
      </div>
    </div>
  );
}
