import { onMount } from 'solid-js';
import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import { colors } from '../../../theme';

export default function ImpactTrackingPanel() {
  let div!: HTMLDivElement;
  onMount(() => {
    const root = am5.Root.new(div);
    root._logo?.set('disabled', true);
    const chart = root.container.children.push(am5xy.XYChart.new(root, { paddingLeft: 0, paddingRight: 0 }));
    const xRenderer = am5xy.AxisRendererX.new(root, { minGridDistance: 20, stroke: am5.color(0xE5E7EB), strokeOpacity: 0.4 });
    const xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root, { categoryField: 'month', renderer: xRenderer }));
    const yRenderer = am5xy.AxisRendererY.new(root, { stroke: am5.color(0xE5E7EB), strokeOpacity: 0.4 });
    const yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, { renderer: yRenderer }));
    const series = chart.series.push(am5xy.ColumnSeries.new(root, {
      name: 'Sites',
      xAxis, yAxis,
      valueYField: 'value', categoryXField: 'month',
      fill: am5.color(0x3B82F6), stroke: am5.color(0x3B82F6)
    }));
    series.columns.template.setAll({ cornerRadiusTL: 3, cornerRadiusTR: 3, fillOpacity: 0.8 });
    const data = [
      { month: 'Jan', value: 40 }, { month: 'Feb', value: 70 }, { month: 'Mar', value: 120 }, { month: 'Apr', value: 180 }
    ];
    series.data.setAll(data);
    xAxis.data.setAll(data);
    return () => root.dispose();
  });

  return (
    <div class="panel p-4 flex flex-col gap-4">
      <div class="panel-header text-blue-600 font-semibold">Impact Tracking Panel</div>
      
      {/* Key Metrics */}
      <div class="space-y-3">
        <div class="flex items-center gap-2 text-xs">
          <div class="w-2 h-2 bg-blue-500 rounded-full"></div>
          <span class="text-gray-700">Real-time progress monitoring for rollout phases</span>
        </div>
        <div class="flex items-center gap-2 text-xs">
          <div class="w-2 h-2 bg-green-500 rounded-full"></div>
          <span class="text-gray-700">Transparent SLA & uptime reporting</span>
        </div>
        <div class="flex items-center gap-2 text-xs">
          <div class="w-2 h-2 bg-orange-500 rounded-full"></div>
          <span class="text-gray-700">Data-driven decision-making for coverage & supply</span>
        </div>
      </div>

      {/* Progress Statistics */}
      <div class="grid grid-cols-3 gap-4 text-center">
        <div class="bg-gray-50 p-3 rounded">
          <div class="text-lg font-bold text-orange-600">150+</div>
          <div class="text-xs text-gray-600">Active Field Technicians</div>
        </div>
        <div class="bg-gray-50 p-3 rounded">
          <div class="text-lg font-bold text-blue-600">34</div>
          <div class="text-xs text-gray-600">Provinces Operational</div>
        </div>
        <div class="bg-gray-50 p-3 rounded">
          <div class="text-lg font-bold text-green-600">247,472</div>
          <div class="text-xs text-gray-600">Telkomsel Service Area</div>
        </div>
      </div>

      {/* Bottom Statistics */}
      <div class="grid grid-cols-3 gap-4 text-center text-xs">
        <div>
          <div class="text-lg font-bold text-orange-600">+24h</div>
          <div class="text-gray-600">Emergency Response</div>
        </div>
        <div>
          <div class="text-lg font-bold text-blue-600">4.5/5</div>
          <div class="text-gray-600">Customer Satisfaction</div>
        </div>
        <div>
          <div class="text-lg font-bold text-green-600">99.9%</div>
          <div class="text-gray-600">Scheduled Availability</div>
        </div>
      </div>

      {/* Chart */}
      <div class="h-32">
        <div ref={div} class="h-full w-full" />
      </div>
    </div>
  );
}
