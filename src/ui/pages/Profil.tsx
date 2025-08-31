import { createSignal } from 'solid-js';
import { HiSolidUser, HiSolidEnvelope, HiSolidMapPin, HiSolidPencil, HiSolidPhone, HiSolidIdentification, HiSolidCalendar, HiSolidShieldCheck, HiSolidClock, HiSolidCog, HiSolidKey, HiSolidBell, HiSolidGlobeAlt, HiSolidCamera } from 'solid-icons/hi';

export default function Profil() {
  const [activeTab, setActiveTab] = createSignal('profile');
  const [isEditing, setIsEditing] = createSignal(false);
  const [profile, setProfile] = createSignal({
    username: 'admin',
    email: 'admin@smartspbu.com',
    fullName: 'Administrator Smart SPBU',
    phone: '+62 812-3456-7890',
    alamat: 'Jl. Sudirman No. 123, Jakarta Pusat, DKI Jakarta 10270',
    dateOfBirth: '1990-05-15',
    employeeId: 'EMP-2024-001',
    department: 'Operations',
    role: 'System Administrator',
    joinDate: '15 Januari 2024',
    lastLogin: '31 Agustus 2025, 14:30 WIB',
    timezone: 'Asia/Jakarta',
    language: 'Bahasa Indonesia'
  });

  const [editForm, setEditForm] = createSignal({
    username: profile().username,
    email: profile().email,
    fullName: profile().fullName,
    phone: profile().phone,
    alamat: profile().alamat,
    dateOfBirth: profile().dateOfBirth,
    timezone: profile().timezone,
    language: profile().language
  });

  const [securitySettings, setSecuritySettings] = createSignal({
    twoFactorEnabled: true,
    emailNotifications: true,
    pushNotifications: false,
    sessionTimeout: '30',
    lastPasswordChange: '15 Juli 2025'
  });

  const [activityLog] = createSignal([
    { date: '31 Aug 2025', time: '14:30', action: 'Login', ip: '192.168.1.100', device: 'Windows Desktop' },
    { date: '31 Aug 2025', time: '09:15', action: 'Viewed Dashboard', ip: '192.168.1.100', device: 'Windows Desktop' },
    { date: '30 Aug 2025', time: '16:45', action: 'Updated User Data', ip: '192.168.1.100', device: 'Windows Desktop' },
    { date: '30 Aug 2025', time: '10:20', action: 'Login', ip: '192.168.1.100', device: 'Windows Desktop' },
    { date: '29 Aug 2025', time: '15:30', action: 'Generated Report', ip: '192.168.1.100', device: 'Windows Desktop' }
  ]);

  const handleEdit = () => {
    setEditForm({
      username: profile().username,
      email: profile().email,
      fullName: profile().fullName,
      phone: profile().phone,
      alamat: profile().alamat,
      dateOfBirth: profile().dateOfBirth,
      timezone: profile().timezone,
      language: profile().language
    });
    setIsEditing(true);
  };

  const handleSave = () => {
    setProfile(prev => ({
      ...prev,
      username: editForm().username,
      email: editForm().email,
      fullName: editForm().fullName,
      phone: editForm().phone,
      alamat: editForm().alamat,
      dateOfBirth: editForm().dateOfBirth,
      timezone: editForm().timezone,
      language: editForm().language
    }));
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const tabs = [
    { id: 'profile', label: 'Profile Information', icon: HiSolidUser },
    { id: 'security', label: 'Security Settings', icon: HiSolidShieldCheck },
    { id: 'activity', label: 'Activity Log', icon: HiSolidClock },
    { id: 'preferences', label: 'Preferences', icon: HiSolidCog }
  ];

  return (
    <div class="p-6 space-y-6">
      {/* Header */}
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-gray-900">User Profile</h1>
          <p class="text-gray-600 mt-1">Manage your account settings and preferences</p>
        </div>
        {activeTab() === 'profile' && !isEditing() && (
          <button 
            onClick={handleEdit}
            class="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            <HiSolidPencil size={16} />
            Edit Profile
          </button>
        )}
      </div>

      {/* Profile Header Card */}
      <div class="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div class="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-8">
          <div class="flex items-center gap-6">
            <div class="relative">
              <div class="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-lg">
                <HiSolidUser size={48} class="text-blue-600" />
              </div>
              <button class="absolute bottom-0 right-0 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-shadow">
                <HiSolidCamera size={16} class="text-gray-600" />
              </button>
            </div>
            <div class="flex-1">
              <h2 class="text-2xl font-bold text-white">{profile().fullName}</h2>
              <p class="text-blue-100 text-lg">{profile().role}</p>
              <div class="flex items-center gap-4 mt-2 text-blue-200 text-sm">
                <span>ID: {profile().employeeId}</span>
                <span>•</span>
                <span>{profile().department}</span>
                <span>•</span>
                <span>Member since {profile().joinDate}</span>
              </div>
            </div>
            <div class="text-right">
              <div class="bg-white/20 rounded-lg p-3">
                <div class="text-white text-sm">Last Login</div>
                <div class="text-blue-100 font-medium">{profile().lastLogin}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4 p-6 bg-gray-50">
          <div class="text-center">
            <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-2">
              <HiSolidShieldCheck class="text-green-600" size={24} />
            </div>
            <div class="text-2xl font-bold text-green-600">Active</div>
            <div class="text-sm text-gray-600">Account Status</div>
          </div>
          <div class="text-center">
            <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-2">
              <HiSolidKey class="text-blue-600" size={24} />
            </div>
            <div class="text-2xl font-bold text-blue-600">Admin</div>
            <div class="text-sm text-gray-600">Access Level</div>
          </div>
          <div class="text-center">
            <div class="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-2">
              <HiSolidClock class="text-orange-600" size={24} />
            </div>
            <div class="text-2xl font-bold text-orange-600">247</div>
            <div class="text-sm text-gray-600">Days Active</div>
          </div>
          <div class="text-center">
            <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-2">
              <HiSolidGlobeAlt class="text-purple-600" size={24} />
            </div>
            <div class="text-2xl font-bold text-purple-600">1</div>
            <div class="text-sm text-gray-600">Active Sessions</div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div class="bg-white rounded-xl border border-gray-200">
        <div class="border-b border-gray-200">
          <nav class="flex space-x-8 px-6">
            {tabs.map((tab) => (
              <button
                onClick={() => setActiveTab(tab.id)}
                class={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab() === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <tab.icon size={16} />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div class="p-6">
          {activeTab() === 'profile' && (
            <div class="space-y-6">
              {isEditing() ? (
                // Edit Mode
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div class="space-y-4">
                    <div class="space-y-2">
                      <label class="block text-sm font-medium text-gray-700">Full Name</label>
                      <div class="relative">
                        <HiSolidUser size={20} class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                          type="text"
                          value={editForm().fullName}
                          onInput={(e) => setEditForm(prev => ({ ...prev, fullName: e.target.value }))}
                          class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                          placeholder="Enter full name"
                        />
                      </div>
                    </div>

                    <div class="space-y-2">
                      <label class="block text-sm font-medium text-gray-700">Username</label>
                      <div class="relative">
                        <HiSolidIdentification size={20} class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                          type="text"
                          value={editForm().username}
                          onInput={(e) => setEditForm(prev => ({ ...prev, username: e.target.value }))}
                          class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                          placeholder="Enter username"
                        />
                      </div>
                    </div>

                    <div class="space-y-2">
                      <label class="block text-sm font-medium text-gray-700">Email</label>
                      <div class="relative">
                        <HiSolidEnvelope size={20} class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                          type="email"
                          value={editForm().email}
                          onInput={(e) => setEditForm(prev => ({ ...prev, email: e.target.value }))}
                          class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                          placeholder="Enter email"
                        />
                      </div>
                    </div>

                    <div class="space-y-2">
                      <label class="block text-sm font-medium text-gray-700">Phone Number</label>
                      <div class="relative">
                        <HiSolidPhone size={20} class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                          type="tel"
                          value={editForm().phone}
                          onInput={(e) => setEditForm(prev => ({ ...prev, phone: e.target.value }))}
                          class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                          placeholder="Enter phone number"
                        />
                      </div>
                    </div>
                  </div>

                  <div class="space-y-4">
                    <div class="space-y-2">
                      <label class="block text-sm font-medium text-gray-700">Date of Birth</label>
                      <div class="relative">
                        <HiSolidCalendar size={20} class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                          type="date"
                          value={editForm().dateOfBirth}
                          onInput={(e) => setEditForm(prev => ({ ...prev, dateOfBirth: e.target.value }))}
                          class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        />
                      </div>
                    </div>

                    <div class="space-y-2">
                      <label class="block text-sm font-medium text-gray-700">Timezone</label>
                      <div class="relative">
                        <HiSolidGlobeAlt size={20} class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <select
                          value={editForm().timezone}
                          onChange={(e) => setEditForm(prev => ({ ...prev, timezone: e.target.value }))}
                          class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        >
                          <option value="Asia/Jakarta">Asia/Jakarta (WIB)</option>
                          <option value="Asia/Makassar">Asia/Makassar (WITA)</option>
                          <option value="Asia/Jayapura">Asia/Jayapura (WIT)</option>
                        </select>
                      </div>
                    </div>

                    <div class="space-y-2">
                      <label class="block text-sm font-medium text-gray-700">Language</label>
                      <select
                        value={editForm().language}
                        onChange={(e) => setEditForm(prev => ({ ...prev, language: e.target.value }))}
                        class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      >
                        <option value="Bahasa Indonesia">Bahasa Indonesia</option>
                        <option value="English">English</option>
                      </select>
                    </div>

                    <div class="space-y-2">
                      <label class="block text-sm font-medium text-gray-700">Address</label>
                      <div class="relative">
                        <HiSolidMapPin size={20} class="absolute left-3 top-3 text-gray-400" />
                        <textarea
                          value={editForm().alamat}
                          onInput={(e) => setEditForm(prev => ({ ...prev, alamat: e.target.value }))}
                          rows="4"
                          class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
                          placeholder="Enter full address"
                        />
                      </div>
                    </div>
                  </div>

                  <div class="md:col-span-2 flex gap-3 pt-4">
                    <button
                      onClick={handleSave}
                      class="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
                    >
                      Save Changes
                    </button>
                    <button
                      onClick={handleCancel}
                      class="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200 font-medium"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                // View Mode
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div class="space-y-4">
                    <div class="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                      <div class="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <HiSolidUser size={20} class="text-blue-600" />
                      </div>
                      <div class="flex-1">
                        <div class="text-sm font-medium text-gray-500">Full Name</div>
                        <div class="text-lg font-semibold text-gray-800">{profile().fullName}</div>
                      </div>
                    </div>

                    <div class="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                      <div class="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                        <HiSolidIdentification size={20} class="text-purple-600" />
                      </div>
                      <div class="flex-1">
                        <div class="text-sm font-medium text-gray-500">Username</div>
                        <div class="text-lg font-semibold text-gray-800">{profile().username}</div>
                      </div>
                    </div>

                    <div class="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                      <div class="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                        <HiSolidEnvelope size={20} class="text-green-600" />
                      </div>
                      <div class="flex-1">
                        <div class="text-sm font-medium text-gray-500">Email</div>
                        <div class="text-lg font-semibold text-gray-800">{profile().email}</div>
                      </div>
                    </div>

                    <div class="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                      <div class="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                        <HiSolidPhone size={20} class="text-yellow-600" />
                      </div>
                      <div class="flex-1">
                        <div class="text-sm font-medium text-gray-500">Phone Number</div>
                        <div class="text-lg font-semibold text-gray-800">{profile().phone}</div>
                      </div>
                    </div>
                  </div>

                  <div class="space-y-4">
                    <div class="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                      <div class="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                        <HiSolidCalendar size={20} class="text-red-600" />
                      </div>
                      <div class="flex-1">
                        <div class="text-sm font-medium text-gray-500">Date of Birth</div>
                        <div class="text-lg font-semibold text-gray-800">{new Date(profile().dateOfBirth).toLocaleDateString('id-ID', { 
                          day: 'numeric', 
                          month: 'long', 
                          year: 'numeric' 
                        })}</div>
                      </div>
                    </div>

                    <div class="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                      <div class="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                        <HiSolidGlobeAlt size={20} class="text-indigo-600" />
                      </div>
                      <div class="flex-1">
                        <div class="text-sm font-medium text-gray-500">Timezone</div>
                        <div class="text-lg font-semibold text-gray-800">{profile().timezone}</div>
                      </div>
                    </div>

                    <div class="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                      <div class="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center">
                        <HiSolidGlobeAlt size={20} class="text-pink-600" />
                      </div>
                      <div class="flex-1">
                        <div class="text-sm font-medium text-gray-500">Language</div>
                        <div class="text-lg font-semibold text-gray-800">{profile().language}</div>
                      </div>
                    </div>

                    <div class="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                      <div class="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                        <HiSolidMapPin size={20} class="text-orange-600" />
                      </div>
                      <div class="flex-1">
                        <div class="text-sm font-medium text-gray-500">Address</div>
                        <div class="text-lg font-semibold text-gray-800">{profile().alamat}</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab() === 'security' && (
            <div class="space-y-6">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="space-y-4">
                  <h3 class="text-lg font-semibold text-gray-900">Security Settings</h3>
                  
                  <div class="space-y-4">
                    <div class="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div class="flex items-center gap-3">
                        <HiSolidShieldCheck class="text-green-500" size={20} />
                        <div>
                          <div class="font-medium text-gray-900">Two-Factor Authentication</div>
                          <div class="text-sm text-gray-600">Secure your account with 2FA</div>
                        </div>
                      </div>
                      <label class="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" checked={securitySettings().twoFactorEnabled} class="sr-only peer" />
                        <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>

                    <div class="p-4 bg-gray-50 rounded-lg">
                      <div class="flex items-center gap-3 mb-3">
                        <HiSolidKey class="text-blue-500" size={20} />
                        <div class="font-medium text-gray-900">Password</div>
                      </div>
                      <div class="text-sm text-gray-600 mb-3">
                        Last changed: {securitySettings().lastPasswordChange}
                      </div>
                      <button class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
                        Change Password
                      </button>
                    </div>

                    <div class="p-4 bg-gray-50 rounded-lg">
                      <div class="flex items-center gap-3 mb-3">
                        <HiSolidClock class="text-orange-500" size={20} />
                        <div class="font-medium text-gray-900">Session Timeout</div>
                      </div>
                      <select class="w-full px-3 py-2 border border-gray-300 rounded-lg">
                        <option value="15">15 minutes</option>
                        <option value="30" selected>30 minutes</option>
                        <option value="60">1 hour</option>
                        <option value="120">2 hours</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div class="space-y-4">
                  <h3 class="text-lg font-semibold text-gray-900">Notification Preferences</h3>
                  
                  <div class="space-y-4">
                    <div class="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div class="flex items-center gap-3">
                        <HiSolidEnvelope class="text-blue-500" size={20} />
                        <div>
                          <div class="font-medium text-gray-900">Email Notifications</div>
                          <div class="text-sm text-gray-600">Receive alerts via email</div>
                        </div>
                      </div>
                      <label class="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" checked={securitySettings().emailNotifications} class="sr-only peer" />
                        <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>

                    <div class="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div class="flex items-center gap-3">
                        <HiSolidBell class="text-purple-500" size={20} />
                        <div>
                          <div class="font-medium text-gray-900">Push Notifications</div>
                          <div class="text-sm text-gray-600">Browser notifications</div>
                        </div>
                      </div>
                      <label class="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" checked={securitySettings().pushNotifications} class="sr-only peer" />
                        <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>

                    <div class="p-4 bg-red-50 border border-red-200 rounded-lg">
                      <div class="flex items-center gap-3 mb-3">
                        <HiSolidShieldCheck class="text-red-500" size={20} />
                        <div class="font-medium text-red-900">Danger Zone</div>
                      </div>
                      <div class="text-sm text-red-600 mb-3">
                        These actions cannot be undone. Please be careful.
                      </div>
                      <button class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm">
                        Deactivate Account
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab() === 'activity' && (
            <div class="space-y-6">
              <div class="flex items-center justify-between">
                <h3 class="text-lg font-semibold text-gray-900">Recent Activity</h3>
                <button class="text-blue-600 hover:text-blue-700 text-sm font-medium">View All</button>
              </div>

              <div class="space-y-3">
                {activityLog().map((activity, index) => (
                  <div class="flex items-center gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div class="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <HiSolidClock class="text-blue-600" size={20} />
                    </div>
                    <div class="flex-1">
                      <div class="font-medium text-gray-900">{activity.action}</div>
                      <div class="text-sm text-gray-600">
                        {activity.date} at {activity.time} • {activity.device} • IP: {activity.ip}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                <div class="bg-blue-50 p-4 rounded-lg">
                  <div class="text-2xl font-bold text-blue-600">156</div>
                  <div class="text-sm text-blue-700">Total Logins</div>
                  <div class="text-xs text-blue-600">This month</div>
                </div>
                <div class="bg-green-50 p-4 rounded-lg">
                  <div class="text-2xl font-bold text-green-600">98.5%</div>
                  <div class="text-sm text-green-700">Uptime</div>
                  <div class="text-xs text-green-600">Last 30 days</div>
                </div>
                <div class="bg-purple-50 p-4 rounded-lg">
                  <div class="text-2xl font-bold text-purple-600">1</div>
                  <div class="text-sm text-purple-700">Active Devices</div>
                  <div class="text-xs text-purple-600">Currently online</div>
                </div>
              </div>
            </div>
          )}

          {activeTab() === 'preferences' && (
            <div class="space-y-6">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="space-y-4">
                  <h3 class="text-lg font-semibold text-gray-900">Display Preferences</h3>
                  
                  <div class="space-y-4">
                    <div class="p-4 bg-gray-50 rounded-lg">
                      <label class="block text-sm font-medium text-gray-700 mb-2">Theme</label>
                      <select class="w-full px-3 py-2 border border-gray-300 rounded-lg">
                        <option value="light">Light</option>
                        <option value="dark">Dark</option>
                        <option value="auto">Auto (System)</option>
                      </select>
                    </div>

                    <div class="p-4 bg-gray-50 rounded-lg">
                      <label class="block text-sm font-medium text-gray-700 mb-2">Dashboard Layout</label>
                      <select class="w-full px-3 py-2 border border-gray-300 rounded-lg">
                        <option value="grid">Grid View</option>
                        <option value="list">List View</option>
                        <option value="compact">Compact View</option>
                      </select>
                    </div>

                    <div class="p-4 bg-gray-50 rounded-lg">
                      <label class="block text-sm font-medium text-gray-700 mb-2">Items per Page</label>
                      <select class="w-full px-3 py-2 border border-gray-300 rounded-lg">
                        <option value="10">10</option>
                        <option value="25" selected>25</option>
                        <option value="50">50</option>
                        <option value="100">100</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div class="space-y-4">
                  <h3 class="text-lg font-semibold text-gray-900">System Preferences</h3>
                  
                  <div class="space-y-4">
                    <div class="p-4 bg-gray-50 rounded-lg">
                      <label class="block text-sm font-medium text-gray-700 mb-2">Auto-refresh Interval</label>
                      <select class="w-full px-3 py-2 border border-gray-300 rounded-lg">
                        <option value="30">30 seconds</option>
                        <option value="60" selected>1 minute</option>
                        <option value="300">5 minutes</option>
                        <option value="0">Disabled</option>
                      </select>
                    </div>

                    <div class="p-4 bg-gray-50 rounded-lg">
                      <label class="block text-sm font-medium text-gray-700 mb-2">Default Page</label>
                      <select class="w-full px-3 py-2 border border-gray-300 rounded-lg">
                        <option value="dashboard" selected>Dashboard</option>
                        <option value="sites">Sites</option>
                        <option value="alerts">Alerts</option>
                        <option value="users">Users</option>
                      </select>
                    </div>

                    <div class="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <div class="font-medium text-gray-900">Sound Notifications</div>
                        <div class="text-sm text-gray-600">Play sound for alerts</div>
                      </div>
                      <label class="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" checked class="sr-only peer" />
                        <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <div class="pt-4 border-t border-gray-200">
                <button class="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
                  Save Preferences
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}