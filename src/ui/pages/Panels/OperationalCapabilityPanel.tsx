import { colors } from '../../../theme';

export default function OperationalCapabilityPanel() {
  return (
    <div class="panel p-4 flex flex-col gap-3">
      <div class="panel-header text-blue-600 font-semibold">Operational Capability Panel</div>
      <ul class="text-xs space-y-2 text-gray-700">
        <li class="flex items-center gap-2">
          <div class="w-2 h-2 bg-blue-500 rounded-full"></div>
          <span><span class="font-semibold text-blue-600">150+</span> field technicians nationwide</span>
        </li>
        <li class="flex items-center gap-2">
          <div class="w-2 h-2 bg-green-500 rounded-full"></div>
          <span><span class="font-semibold text-green-600">99.5%</span> uptime target</span>
        </li>
        <li class="flex items-center gap-2">
          <div class="w-2 h-2 bg-orange-500 rounded-full"></div>
          <span><span class="font-semibold text-orange-600">&lt;24-hour</span> rapid-response capability</span>
        </li>
      </ul>
    </div>
  );
}
