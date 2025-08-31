import { createSignal } from 'solid-js';

export interface AlertItem { id: number; type: string; site: string; age: string; }

const initial: AlertItem[] = [
  { id: 1, type: 'Offline', site: 'SPBU-2344', age: '15m' },
  { id: 2, type: 'Low Tank', site: 'SPBU-6678', age: '45m' },
  { id: 3, type: 'Priority Rollout', site: 'SPBU-9901', age: '5m' },
  { id: 4, type: 'Offline', site: 'SPBU-7823', age: '22m' },
  { id: 5, type: 'Low Tank', site: 'SPBU-2468', age: '31m' },
  { id: 6, type: 'Priority Rollout', site: 'SPBU-5789', age: '8m' },
  { id: 7, type: 'Connectivity Issue', site: 'SPBU-1023', age: '2m' },
  { id: 8, type: 'Tank Anomaly', site: 'SPBU-4456', age: '12m' },
  { id: 9, type: 'Maintenance Required', site: 'SPBU-1234', age: '1h' },
  { id: 10, type: 'Signal Weak', site: 'SPBU-8901', age: '25m' },
];

const [alerts, setAlerts] = createSignal<AlertItem[]>(initial);
export const useAlerts = () => ({ alerts, setAlerts });
