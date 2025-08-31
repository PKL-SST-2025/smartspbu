import ProgressBar from '../../components/ProgressBar';
import { colors } from '../../../theme';

export default function ConnectivityStatusPanel() {
  const total = 7600;
  const connected = 5518;
  const offline = 2280; // intentionally > diff due sample
  const target = 500;
  const progress = 180; // placeholder achieved sites
  return (
    <div class="panel p-4 flex flex-col gap-3">
      <div class="panel-header">Connectivity Status</div>
      <div class="grid grid-cols-2 gap-x-4 gap-y-1 text-[11px] text-[var(--text-muted)]">
        <div>Total SPBU</div><div class="font-semibold text-right text-[var(--text-secondary)]">{total.toLocaleString()}</div>
        <div>Connected</div><div class="font-semibold text-right text-emerald-400">{connected.toLocaleString()}</div>
        <div>Offline</div><div class="font-semibold text-right text-red-400">{offline.toLocaleString()}</div>
        <div>Priority Target</div><div class="font-semibold text-right text-[var(--text-secondary)]">{target}</div>
      </div>
      <div class="text-[9px] uppercase tracking-wide text-[var(--text-faint)]">Phase-1 Rollout Progress ({progress}/{target})</div>
      <ProgressBar value={progress} max={target} />
    </div>
  );
}
