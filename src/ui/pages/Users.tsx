import { createSignal } from 'solid-js';
import { HiSolidUser, HiSolidMapPin, HiSolidClock, HiSolidGlobeAlt } from 'solid-icons/hi';

interface UserRow { 
  id: string; 
  name: string; 
  location: string; 
  nearestSpbu: string; 
  distance: string;
  status: string;
  lastActive: string;
}

export default function Users() {
  const [rows] = createSignal<UserRow[]>([
    { id: 'USR-001', name: 'Budi Santoso', location: 'Jakarta Pusat', nearestSpbu: 'SPBU-1023', distance: '1.2 km', status: 'active', lastActive: '2m' },
    { id: 'USR-002', name: 'Siti Nurhaliza', location: 'Bandung', nearestSpbu: 'SPBU-1045', distance: '0.8 km', status: 'active', lastActive: '5m' },
    { id: 'USR-003', name: 'Ahmad Wijaya', location: 'Surabaya', nearestSpbu: 'SPBU-2344', distance: '2.1 km', status: 'inactive', lastActive: '1h' },
    { id: 'USR-004', name: 'Maya Sari', location: 'Medan', nearestSpbu: 'SPBU-8842', distance: '1.5 km', status: 'active', lastActive: '1m' },
    { id: 'USR-005', name: 'Denny Pratama', location: 'Yogyakarta', nearestSpbu: 'SPBU-3567', distance: '0.6 km', status: 'active', lastActive: '3m' },
    { id: 'USR-006', name: 'Lisa Anggina', location: 'Balikpapan', nearestSpbu: 'SPBU-7823', distance: '3.2 km', status: 'inactive', lastActive: '2h' },
    { id: 'USR-007', name: 'Rizki Habibi', location: 'Makassar', nearestSpbu: 'SPBU-9901', distance: '1.8 km', status: 'active', lastActive: '4m' },
    { id: 'USR-008', name: 'Indira Sari', location: 'Banda Aceh', nearestSpbu: 'SPBU-4456', distance: '2.5 km', status: 'active', lastActive: '6m' },
    { id: 'USR-009', name: 'Fajar Ramadhan', location: 'Denpasar', nearestSpbu: 'SPBU-6678', distance: '1.1 km', status: 'inactive', lastActive: '45m' },
    { id: 'USR-010', name: 'Ratna Dewi', location: 'Purwokerto', nearestSpbu: 'SPBU-1234', distance: '0.9 km', status: 'active', lastActive: '2m' },
    { id: 'USR-011', name: 'Andi Saputra', location: 'Jayapura', nearestSpbu: 'SPBU-5789', distance: '4.1 km', status: 'inactive', lastActive: '3h' },
    { id: 'USR-012', name: 'Wulan Safitri', location: 'Batam', nearestSpbu: 'SPBU-8901', distance: '1.3 km', status: 'active', lastActive: '1m' },
    { id: 'USR-013', name: 'Hendra Gunawan', location: 'Padang', nearestSpbu: 'SPBU-2468', distance: '2.8 km', status: 'inactive', lastActive: '1h' },
  ]);

  const getStatusColor = (status: string) => {
    return status === 'active' 
      ? 'bg-emerald-100 text-emerald-700' 
      : 'bg-gray-100 text-gray-700';
  };

  const getStatusDot = (status: string) => {
    return status === 'active' ? 'bg-emerald-500' : 'bg-gray-400';
  };

  const getDistanceColor = (distance: string) => {
    const km = parseFloat(distance);
    if (km <= 1) return 'text-emerald-600';
    if (km <= 2) return 'text-yellow-600';
    return 'text-red-600';
  };

  const activeUsers = () => rows().filter(user => user.status === 'active').length;
  const inactiveUsers = () => rows().filter(user => user.status === 'inactive').length;
  const averageDistance = () => {
    const distances = rows().map(user => parseFloat(user.distance));
    const avg = distances.reduce((a, b) => a + b, 0) / distances.length;
    return avg.toFixed(1);
  };
  const uniqueCities = () => [...new Set(rows().map(user => user.location))].length;

  return (
    <div class="p-6 space-y-6">
      {/* Header */}
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-gray-900">User Management</h1>
          <p class="text-gray-600 mt-1">Monitor user locations and SPBU proximity</p>
        </div>
        <div class="flex items-center gap-4 text-sm text-gray-600">
          <div class="flex items-center gap-2">
            <div class="w-2 h-2 rounded-full bg-emerald-500"></div>
            <span>Active</span>
          </div>
          <div class="flex items-center gap-2">
            <div class="w-2 h-2 rounded-full bg-gray-400"></div>
            <span>Inactive</span>
          </div>
        </div>
      </div>

      {/* Statistics Cards */}
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div class="bg-white rounded-xl border border-gray-200 p-4">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <HiSolidUser class="text-blue-600" size={20} />
            </div>
            <div>
              <p class="text-sm text-gray-600">Total Users</p>
              <p class="text-xl font-bold text-gray-900">{rows().length}</p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-xl border border-gray-200 p-4">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
              <HiSolidUser class="text-emerald-600" size={20} />
            </div>
            <div>
              <p class="text-sm text-gray-600">Active Users</p>
              <p class="text-xl font-bold text-emerald-600">{activeUsers()}</p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-xl border border-gray-200 p-4">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <HiSolidMapPin class="text-orange-600" size={20} />
            </div>
            <div>
              <p class="text-sm text-gray-600">Avg Distance</p>
              <p class="text-xl font-bold text-orange-600">{averageDistance()} km</p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-xl border border-gray-200 p-4">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <HiSolidGlobeAlt class="text-purple-600" size={20} />
            </div>
            <div>
              <p class="text-sm text-gray-600">Cities</p>
              <p class="text-xl font-bold text-purple-600">{uniqueCities()}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Users Grid */}
      <div class="space-y-4">
        <h2 class="text-lg font-semibold text-gray-900">User Directory</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {rows().map((user) => (
            <div class="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-lg transition-all duration-200 hover:border-blue-200">
              {/* User Header */}
              <div class="flex items-start justify-between mb-4">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <HiSolidUser class="text-blue-600" size={20} />
                  </div>
                  <div>
                    <h3 class="font-semibold text-gray-900">{user.name}</h3>
                    <p class="text-sm text-gray-600">{user.id}</p>
                  </div>
                </div>
                <div class={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(user.status)}`}>
                  <div class={`w-2 h-2 rounded-full ${getStatusDot(user.status)}`}></div>
                  {user.status}
                </div>
              </div>

              {/* Location Info */}
              <div class="space-y-3">
                <div class="flex items-center gap-2 text-sm">
                  <HiSolidMapPin class="text-gray-400" size={14} />
                  <span class="text-gray-700">{user.location}</span>
                </div>

                {/* Nearest SPBU */}
                <div class="bg-gray-50 rounded-lg p-3">
                  <div class="flex items-center justify-between">
                    <div>
                      <p class="text-xs text-gray-600 font-medium">Nearest SPBU</p>
                      <p class="text-sm font-semibold text-gray-900">{user.nearestSpbu}</p>
                    </div>
                    <div class="text-right">
                      <p class="text-xs text-gray-600">Distance</p>
                      <p class={`text-sm font-bold ${getDistanceColor(user.distance)}`}>{user.distance}</p>
                    </div>
                  </div>
                </div>

                {/* Last Active */}
                <div class="flex items-center gap-2 text-sm text-gray-600">
                  <HiSolidClock size={14} />
                  <span>Last active {user.lastActive} ago</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Additional Analytics */}
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div class="bg-white rounded-xl border border-gray-200 p-5">
          <div class="flex items-center gap-3 mb-3">
            <div class="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
              <HiSolidUser class="text-emerald-600" size={16} />
            </div>
            <h3 class="font-semibold text-gray-900">User Activity</h3>
          </div>
          <div class="space-y-2">
            <div class="flex justify-between">
              <span class="text-sm text-gray-600">Active Users</span>
              <span class="text-sm font-semibold text-emerald-600">{activeUsers()}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-sm text-gray-600">Inactive Users</span>
              <span class="text-sm font-semibold text-gray-600">{inactiveUsers()}</span>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-2 mt-3">
              <div 
                class="bg-emerald-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(activeUsers() / rows().length) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-xl border border-gray-200 p-5">
          <div class="flex items-center gap-3 mb-3">
            <div class="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
              <HiSolidMapPin class="text-orange-600" size={16} />
            </div>
            <h3 class="font-semibold text-gray-900">Proximity</h3>
          </div>
          <div class="space-y-2">
            <div class="flex justify-between">
              <span class="text-sm text-gray-600">≤ 1 km</span>
              <span class="text-sm font-semibold text-emerald-600">{rows().filter(u => parseFloat(u.distance) <= 1).length}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-sm text-gray-600">1-2 km</span>
              <span class="text-sm font-semibold text-yellow-600">{rows().filter(u => parseFloat(u.distance) > 1 && parseFloat(u.distance) <= 2).length}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-sm text-gray-600">{'>'} 2 km</span>
              <span class="text-sm font-semibold text-red-600">{rows().filter(u => parseFloat(u.distance) > 2).length}</span>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-xl border border-gray-200 p-5">
          <div class="flex items-center gap-3 mb-3">
            <div class="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
              <HiSolidGlobeAlt class="text-purple-600" size={16} />
            </div>
            <h3 class="font-semibold text-gray-900">Coverage</h3>
          </div>
          <div class="space-y-2">
            <div class="flex justify-between">
              <span class="text-sm text-gray-600">Cities Covered</span>
              <span class="text-sm font-semibold text-purple-600">{uniqueCities()}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-sm text-gray-600">Avg Distance</span>
              <span class="text-sm font-semibold text-orange-600">{averageDistance()} km</span>
            </div>
            <div class="flex justify-between">
              <span class="text-sm text-gray-600">Max Distance</span>
              <span class="text-sm font-semibold text-red-600">{Math.max(...rows().map(u => parseFloat(u.distance))).toFixed(1)} km</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
