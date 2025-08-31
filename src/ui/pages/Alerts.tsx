import { useAlerts } from '../../store/alerts';
import { HiSolidExclamationTriangle, HiSolidBellAlert, HiSolidClock, HiSolidMapPin } from 'solid-icons/hi';

export default function Alerts() {
  const { alerts } = useAlerts();

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'Offline':
      case 'Connectivity Issue':
      case 'Signal Weak':
        return HiSolidExclamationTriangle;
      case 'Low Tank':
      case 'Tank Anomaly':
        return HiSolidBellAlert;
      default:
        return HiSolidBellAlert;
    }
  };

  const getAlertColor = (type: string) => {
    switch (type) {
      case 'Offline': return 'bg-red-100 text-red-700 border-red-200';
      case 'Low Tank': return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'Priority Rollout': return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'Tank Anomaly': return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'Connectivity Issue': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'Signal Weak': return 'bg-indigo-100 text-indigo-700 border-indigo-200';
      case 'Maintenance Required': return 'bg-green-100 text-green-700 border-green-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getAlertDot = (type: string) => {
    switch (type) {
      case 'Offline': return 'bg-red-500';
      case 'Low Tank': return 'bg-amber-500';
      case 'Priority Rollout': return 'bg-orange-500';
      case 'Tank Anomaly': return 'bg-purple-500';
      case 'Connectivity Issue': return 'bg-blue-500';
      case 'Signal Weak': return 'bg-indigo-500';
      case 'Maintenance Required': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getPriorityLevel = (type: string) => {
    switch (type) {
      case 'Offline': return 'Critical';
      case 'Low Tank': return 'High';
      case 'Tank Anomaly': return 'High';
      case 'Priority Rollout': return 'Medium';
      case 'Connectivity Issue': return 'Medium';
      case 'Signal Weak': return 'Low';
      case 'Maintenance Required': return 'Low';
      default: return 'Medium';
    }
  };

  const criticalAlerts = () => alerts().filter(a => getPriorityLevel(a.type) === 'Critical');
  const highAlerts = () => alerts().filter(a => getPriorityLevel(a.type) === 'High');
  const mediumAlerts = () => alerts().filter(a => getPriorityLevel(a.type) === 'Medium');
  const lowAlerts = () => alerts().filter(a => getPriorityLevel(a.type) === 'Low');

  return (
    <div class="p-6 space-y-6">
      {/* Header */}
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-gray-900">Alert Management</h1>
          <p class="text-gray-600 mt-1">Monitor and manage system alerts across all locations</p>
        </div>
        <div class="flex items-center gap-4">
          <div class="bg-white rounded-lg border border-gray-200 px-4 py-2">
            <div class="text-2xl font-bold text-gray-900">{alerts().length}</div>
            <div class="text-sm text-gray-600">Total Alerts</div>
          </div>
        </div>
      </div>

      {/* Priority Summary */}
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div class="bg-white rounded-xl border border-red-200 p-4">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
              <HiSolidExclamationTriangle class="text-red-600" size={20} />
            </div>
            <div>
              <p class="text-sm text-gray-600">Critical</p>
              <p class="text-xl font-bold text-red-600">{criticalAlerts().length}</p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-xl border border-amber-200 p-4">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
              <HiSolidBellAlert class="text-amber-600" size={20} />
            </div>
            <div>
              <p class="text-sm text-gray-600">High</p>
              <p class="text-xl font-bold text-amber-600">{highAlerts().length}</p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-xl border border-orange-200 p-4">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <HiSolidBellAlert class="text-orange-600" size={20} />
            </div>
            <div>
              <p class="text-sm text-gray-600">Medium</p>
              <p class="text-xl font-bold text-orange-600">{mediumAlerts().length}</p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-xl border border-blue-200 p-4">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <HiSolidBellAlert class="text-blue-600" size={20} />
            </div>
            <div>
              <p class="text-sm text-gray-600">Low</p>
              <p class="text-xl font-bold text-blue-600">{lowAlerts().length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Alerts List */}
      <div class="space-y-4">
        <h2 class="text-lg font-semibold text-gray-900">Active Alerts</h2>
        <div class="space-y-3">
          {alerts().map((alert) => {
            const IconComponent = getAlertIcon(alert.type);
            const priority = getPriorityLevel(alert.type);
            
            return (
              <div class={`bg-white rounded-xl border p-4 hover:shadow-md transition-all duration-200 ${getAlertColor(alert.type)}`}>
                <div class="flex items-start gap-4">
                  {/* Alert Icon */}
                  <div class="flex-shrink-0">
                    <div class="w-10 h-10 rounded-lg bg-white/50 flex items-center justify-center">
                      <IconComponent size={20} />
                    </div>
                  </div>

                  {/* Alert Content */}
                  <div class="flex-1 min-w-0">
                    <div class="flex items-start justify-between">
                      <div>
                        <h3 class="font-semibold text-lg">{alert.type}</h3>
                        <div class="flex items-center gap-2 mt-1">
                          <HiSolidMapPin size={14} />
                          <span class="text-sm font-medium">{alert.site}</span>
                        </div>
                      </div>
                      
                      <div class="flex items-center gap-3">
                        {/* Priority Badge */}
                        <div class={`px-2.5 py-1 rounded-full text-xs font-medium flex items-center gap-1.5`}>
                          <div class={`w-2 h-2 rounded-full ${getAlertDot(alert.type)}`}></div>
                          {priority}
                        </div>
                        
                        {/* Time */}
                        <div class="flex items-center gap-1 text-sm">
                          <HiSolidClock size={14} />
                          <span>{alert.age} ago</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
