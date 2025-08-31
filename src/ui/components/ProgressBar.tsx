interface ProgressBarProps { value: number; max: number; color?: string; height?: string; }
export default function ProgressBar(p: ProgressBarProps) {
  const pct = () => (p.max === 0 ? 0 : (p.value / p.max) * 100);
  return (
    <div class="w-full bg-slate-200/70 rounded-md overflow-hidden" style={{ height: p.height || '8px' }}>
      <div class="h-full transition-all" style={{ width: pct() + '%', background: p.color || '#0F828C' }} />
    </div>
  );
}
