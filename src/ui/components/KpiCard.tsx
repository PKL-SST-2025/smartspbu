import { JSXElement, createSignal, onMount } from 'solid-js';

interface Props {
  title: string;
  value: JSXElement;
  subtitle?: string;
  color?: string;
  loading?: boolean;
}

export default function KpiCard(p: Props) {
  const [isVisible, setIsVisible] = createSignal(false);
  
  onMount(() => {
    // Trigger animation after mount
    setTimeout(() => setIsVisible(true), 100);
  });

  return (
    <div class={`panel p-5 flex flex-col gap-2 min-w-[140px] transition-all duration-500 transform ${isVisible() ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'} hover:shadow-lg hover:-translate-y-1`}>
      <div class="panel-header text-xs font-medium text-gray-500 uppercase tracking-wider">{p.title}</div>
      
      {p.loading ? (
        <div class="skeleton h-8 w-16 rounded mb-1"></div>
      ) : (
        <div 
          class="text-2xl md:text-3xl font-bold transition-all duration-300 hover:scale-105" 
          style={{ 
            color: p.color || '#3B82F6', 
            filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))'
          }}
        >
          {p.value}
        </div>
      )}
      
      {p.subtitle && (
        <div class="text-xs text-gray-600 font-medium transition-opacity duration-300">
          {p.subtitle}
        </div>
      )}
    </div>
  );
}
