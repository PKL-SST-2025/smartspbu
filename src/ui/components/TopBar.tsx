import { createSignal } from 'solid-js';
import { colors } from '../../theme';
import { A, useNavigate } from '@solidjs/router';
import { useAlerts } from '../../store/alerts';
import { HiSolidBellAlert, HiSolidArrowRightOnRectangle } from 'solid-icons/hi';

export default function TopBar() {
  const [search, setSearch] = createSignal('');
  const { alerts } = useAlerts();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    navigate('/login');
  };

  return (
    <header class="h-16 flex items-center px-4 gap-4 border-b border-[var(--border-color)] glass">
      <div class="font-semibold tracking-wide accent-glow text-sm md:text-base">Operational Center</div>
      <input value={search()} onInput={e => setSearch(e.currentTarget.value)} placeholder="Search site / ticket" class="ml-auto bg-white border border-[var(--border-color)] rounded-md px-3 py-1.5 text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-[var(--accent)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)]" />
      <A href="/alerts" class="relative inline-flex items-center justify-center w-9 h-9 rounded-full hover:bg-gray-100 transition border border-[var(--border-color)]" aria-label="View alerts">
        <HiSolidBellAlert size={20} class="text-[var(--text-secondary)]" />
        <span class="absolute -top-1 -right-1 bg-[var(--accent)] text-white text-[10px] font-semibold px-1.5 py-[1px] rounded-full shadow-[0_0_6px_var(--accent)]">{alerts().length}</span>
      </A>
      <button 
        onClick={handleLogout}
        class="inline-flex items-center justify-center w-9 h-9 rounded-full hover:bg-gray-100 transition border border-[var(--border-color)]" 
        aria-label="Logout"
        title="Logout"
      >
        <HiSolidArrowRightOnRectangle size={20} class="text-[var(--text-secondary)]" />
      </button>
      <div class="w-8 h-8 rounded-full" style={{ 'background': 'linear-gradient(135deg,#102331,#0A161F)' }} />
    </header>
  );
}
