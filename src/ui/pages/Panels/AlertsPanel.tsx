import { useAlerts } from '../../../store/alerts';

export default function AlertsPanel() {
  const { alerts } = useAlerts();
  return (
    <div class="rounded-lg border bg-white p-4 shadow-sm flex flex-col gap-2">
      <div class="flex items-center justify-between">
        <div class="font-semibold text-sm">Active Alerts</div>
        <button class="text-xs text-blue-600">View all</button>
      </div>
      <ul class="text-xs divide-y">
        {alerts().map(a => (
          <li class="py-1 flex gap-2 items-center">
            <span class="w-2 h-2 rounded-full" classList={{ 
              'bg-red-500': a.type==='Offline', 
              'bg-amber-500': a.type==='Low Tank', 
              'bg-fuchsia-600': a.type==='Anomaly' || a.type==='Tank Anomaly',
              'bg-orange-500': a.type==='Priority Rollout',
              'bg-blue-500': a.type==='Connectivity Issue' || a.type==='Signal Weak',
              'bg-green-500': a.type==='Maintenance Required'
            }} />
            <span class="font-mono text-slate-700">{a.site}</span>
            <span class="flex-1">{a.type}</span>
            <span class="text-slate-400">{a.age}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
