import { onMount } from 'solid-js';
import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';

export default function SlaTrendChart() {
  let div!: HTMLDivElement;
  onMount(() => {
    const root = am5.Root.new(div);
    root._logo?.set('disabled', true);
    const chart = root.container.children.push(am5xy.XYChart.new(root, { paddingLeft: 0, paddingRight: 0 }));
    const xRenderer = am5xy.AxisRendererX.new(root, { minGridDistance: 20, stroke: am5.color(0x263140), strokeOpacity: 0.4 });
    const xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root, { categoryField: 'd', renderer: xRenderer }));
    const yRenderer = am5xy.AxisRendererY.new(root, { stroke: am5.color(0x263140), strokeOpacity: 0.4 });
    const yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, { renderer: yRenderer }));
    const series = chart.series.push(am5xy.LineSeries.new(root, {
      name: 'SLA', xAxis, yAxis, valueYField: 'v', categoryXField: 'd',
      stroke: am5.color(0x12F7FF)
    }));
    series.strokes.template.setAll({ strokeOpacity: 0.9, strokeWidth: 2 });
    const data = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'].map((d)=>({ d, v: 90 + Math.random()*10 }));
    series.data.setAll(data); xAxis.data.setAll(data);
    return () => root.dispose();
  });
  return <div ref={div} class="h-48" />;
}
