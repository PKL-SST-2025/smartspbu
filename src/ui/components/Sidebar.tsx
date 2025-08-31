import { A, useLocation } from '@solidjs/router';
import { HiSolidMap, HiSolidBellAlert, HiSolidHomeModern, HiSolidUsers, HiSolidUser } from 'solid-icons/hi';
import { colors } from '../../theme';

const nav = [
  { href: '/', label: 'Dashboard', icon: HiSolidHomeModern },
  { href: '/sites', label: 'Sites', icon: HiSolidMap },
  { href: '/alerts', label: 'Alerts', icon: HiSolidBellAlert },
  { href: '/users', label: 'Users', icon: HiSolidUsers },
  { href: '/profil', label: 'Profile', icon: HiSolidUser },
];

export default function Sidebar() {
  const loc = useLocation();
  return (
    <aside class="hidden md:flex flex-col w-60 bg-blue-700 border-r border-blue-800">
      <div class="h-16 flex items-center px-4 font-bold text-lg text-white tracking-wide">Smart SPBU</div>
      <nav class="flex-1 px-2 space-y-1">
        {nav.map(item => {
          const active = () => loc.pathname === item.href;
          return (
            <A href={item.href} class="group flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition" style={{
              'background-color': active() ? 'rgba(255,255,255,0.2)' : 'transparent',
              color: active() ? '#ffffff' : '#bfdbfe'
            }}>
              <item.icon size={18} />
              <span>{item.label}</span>
              {active() && <span class="ml-auto w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.5)]" />}
            </A>
          );
        })}
      </nav>
      <div class="p-4 text-[10px] uppercase tracking-wider text-blue-200">v0.1 MVP</div>
    </aside>
  );
}
