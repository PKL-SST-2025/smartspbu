import { createSignal, createMemo } from 'solid-js';
export interface SitePoint { id: string; longitude: number; latitude: number; status: 'connected'|'offline'|'priority'; region?: string; }

const initial: SitePoint[] = [
  { id: 'SPBU-1023', longitude: 106.8456, latitude: -6.2088, status: 'connected', region: 'Jakarta' },
  { id: 'SPBU-2344', longitude: 112.7521, latitude: -7.2575, status: 'offline', region: 'Surabaya' },
  { id: 'SPBU-8842', longitude: 98.6785, latitude: 3.5952, status: 'priority', region: 'Medan' },
  { id: 'SPBU-1045', longitude: 107.6191, latitude: -6.9175, status: 'connected', region: 'Bandung' },
  { id: 'SPBU-3567', longitude: 110.4203, latitude: -7.7956, status: 'connected', region: 'Yogyakarta' },
  { id: 'SPBU-7823', longitude: 116.8443, latitude: -1.2379, status: 'offline', region: 'Balikpapan' },
  { id: 'SPBU-9901', longitude: 119.4327, latitude: -5.1477, status: 'priority', region: 'Makassar' },
  { id: 'SPBU-4456', longitude: 95.3238, latitude: 5.5483, status: 'connected', region: 'Banda Aceh' },
  { id: 'SPBU-6678', longitude: 115.2126, latitude: -8.6705, status: 'offline', region: 'Denpasar' },
  { id: 'SPBU-1234', longitude: 109.3425, latitude: -7.4971, status: 'connected', region: 'Purwokerto' },
  { id: 'SPBU-5789', longitude: 140.7186, latitude: -2.5489, status: 'priority', region: 'Jayapura' },
  { id: 'SPBU-8901', longitude: 104.0304, latitude: 1.1074, status: 'connected', region: 'Batam' },
  { id: 'SPBU-2468', longitude: 100.3543, latitude: -0.9471, status: 'offline', region: 'Padang' },
];

const [sites, setSites] = createSignal(initial);
const [filters, setFilters] = createSignal<{[k:string]: boolean}>({ connected: true, offline: true, priority: true });

const filteredSites = createMemo(() => sites().filter(s => filters()[s.status]));

export const useSites = () => ({ sites, setSites, filters, setFilters, filteredSites });
