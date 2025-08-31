export default function TicketsPanel() {
  return (
    <div class="panel p-4 flex flex-col gap-2">
      <div class="panel-header">Dispatch & Field Ops</div>
      <ul class="text-[11px] space-y-1 text-[var(--text-muted)]">
        <li><span class="text-[var(--text-secondary)]">Active Technicians:</span> 152</li>
        <li><span class="text-[var(--text-secondary)]">Open Tickets:</span> 34</li>
        <li><span class="text-[var(--text-secondary)]">Avg MTTR:</span> 7.4h</li>
        <li><span class="text-[var(--text-secondary)]">SLA &lt;24h:</span> 94%</li>
      </ul>
    </div>
  );
}
