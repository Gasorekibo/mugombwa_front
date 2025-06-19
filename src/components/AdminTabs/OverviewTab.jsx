import React from "react";
import {
  Users,
  Briefcase,
  Megaphone,
  TrendingUp,
  Calendar,
  AlertTriangle,
  Activity,
  Clock,
  BarChart3,
} from "lucide-react";

const OverviewDashboard = ({ ngos, services, announcements, loading }) => {
  // Calculate statistics
  const totalNGOs = ngos?.count || 0;
  const totalServices = services?.length || 0;
  const totalAnnouncements = announcements?.count || 0;
  
  const activeServices = services?.filter(service => service.status === "active")?.length || 0;
  const inactiveServices = totalServices - activeServices;

  // Category distribution
  const categoryStats = services?.reduce((acc, service) => {
    acc[service.category] = (acc[service.category] || 0) + 1;
    return acc;
  }, {}) || {};

  const topCategories = Object.entries(categoryStats)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 5);

  // Priority distribution for announcements
  const priorityStats = announcements?.data?.reduce((acc, announcement) => {
    acc[announcement.priority] = (acc[announcement.priority] || 0) + 1;
    return acc;
  }, {}) || {};

  // Recent activity (last 7 days)
  const recentAnnouncements = announcements?.data?.filter(announcement => {
    const announcementDate = new Date(announcement.createdAt || announcement.created_at);
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    return announcementDate >= weekAgo;
  })?.length || 0;

  // NGO distribution by services
  const ngoServiceDistribution = services?.reduce((acc, service) => {
    const ngoName = service.ngo_name;
    if (ngoName) {
      acc[ngoName] = (acc[ngoName] || 0) + 1;
    }
    return acc;
  }, {}) || {};

  const topNGOsByServices = Object.entries(ngoServiceDistribution)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 5);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Main Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-2xl font-bold text-gray-900">{totalNGOs}</p>
              <p className="text-gray-600 text-sm">NGO Partners</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <Briefcase className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-2xl font-bold text-gray-900">{totalServices}</p>
              <p className="text-gray-600 text-sm">Total Services</p>
              <p className="text-xs text-green-600 mt-1">{activeServices} active</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Megaphone className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-2xl font-bold text-gray-900">{totalAnnouncements}</p>
              <p className="text-gray-600 text-sm">Announcements</p>
              <p className="text-xs text-purple-600 mt-1">{recentAnnouncements} this week</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-orange-100 rounded-lg">
              <Activity className="h-6 w-6 text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-2xl font-bold text-gray-900">
                {((activeServices / totalServices) * 100 || 0).toFixed(1)}%
              </p>
              <p className="text-gray-600 text-sm">Service Uptime</p>
              <p className="text-xs text-orange-600 mt-1">{inactiveServices} inactive</p>
            </div>
          </div>
        </div>
      </div>

      {/* Charts and Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Service Categories */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center mb-4">
            <BarChart3 className="h-5 w-5 text-gray-600 mr-2" />
            <h3 className="text-lg font-semibold text-gray-900">Top Service Categories</h3>
          </div>
          <div className="space-y-3">
            {topCategories.map(([category, count]) => (
              <div key={category} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-blue-500 rounded mr-3"></div>
                  <span className="text-sm text-gray-700 capitalize">{category}</span>
                </div>
                <div className="flex items-center">
                  <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full"
                      style={{ width: `${(count / totalServices) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium text-gray-900">{count}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* NGO Performance */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center mb-4">
            <TrendingUp className="h-5 w-5 text-gray-600 mr-2" />
            <h3 className="text-lg font-semibold text-gray-900">Most Active NGOs</h3>
          </div>
          <div className="space-y-3">
            {topNGOsByServices.map(([ngoName, serviceCount], index) => (
              <div key={ngoName} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium text-white mr-3 ${
                    index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-gray-400' : index === 2 ? 'bg-orange-500' : 'bg-blue-500'
                  }`}>
                    {index + 1}
                  </div>
                  <span className="text-sm text-gray-700">{ngoName}</span>
                </div>
                <span className="text-sm font-medium text-gray-900">{serviceCount} services</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Priority and Status Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Announcement Priorities */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center mb-4">
            <AlertTriangle className="h-5 w-5 text-gray-600 mr-2" />
            <h3 className="text-lg font-semibold text-gray-900">Announcement Priorities</h3>
          </div>
          <div className="space-y-2">
            {Object.entries(priorityStats).map(([priority, count]) => (
              <div key={priority} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className={`w-2 h-2 rounded-full mr-2 ${
                    priority === 'urgent' ? 'bg-red-500' : 
                    priority === 'high' ? 'bg-orange-500' : 'bg-blue-500'
                  }`}></div>
                  <span className="text-sm text-gray-700 capitalize">{priority}</span>
                </div>
                <span className="text-sm font-medium text-gray-900">{count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Service Status */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center mb-4">
            <Activity className="h-5 w-5 text-gray-600 mr-2" />
            <h3 className="text-lg font-semibold text-gray-900">Service Status</h3>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-2 h-2 rounded-full mr-2 bg-green-500"></div>
                <span className="text-sm text-gray-700">Active</span>
              </div>
              <span className="text-sm font-medium text-gray-900">{activeServices}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-2 h-2 rounded-full mr-2 bg-red-500"></div>
                <span className="text-sm text-gray-700">Inactive</span>
              </div>
              <span className="text-sm font-medium text-gray-900">{inactiveServices}</span>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center mb-4">
            <Clock className="h-5 w-5 text-gray-600 mr-2" />
            <h3 className="text-lg font-semibold text-gray-900">Quick Actions</h3>
          </div>
          <div className="space-y-2">
            <button className="w-full text-left px-3 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded">
              View Recent Activity
            </button>
            <button className="w-full text-left px-3 py-2 text-sm text-green-600 hover:bg-green-50 rounded">
              Export Reports
            </button>
            <button className="w-full text-left px-3 py-2 text-sm text-purple-600 hover:bg-purple-50 rounded">
              Manage Users
            </button>
            <button className="w-full text-left px-3 py-2 text-sm text-orange-600 hover:bg-orange-50 rounded">
              System Settings
            </button>
          </div>
        </div>
      </div>

      {/* Recent Activity Feed */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div className="flex items-center mb-4">
          <Calendar className="h-5 w-5 text-gray-600 mr-2" />
          <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
        </div>
        <div className="space-y-3">
          {announcements?.data?.slice(0, 5).map((announcement) => (
            <div key={announcement.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
              <div className={`w-2 h-2 rounded-full mt-2 ${
                announcement.priority === 'urgent' ? 'bg-red-500' : 
                announcement.priority === 'high' ? 'bg-orange-500' : 'bg-blue-500'
              }`}></div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900">{announcement.title}</p>
                <p className="text-sm text-gray-600">{announcement.ngo_name}</p>
                <p className="text-xs text-gray-500 mt-1">
                  {new Date(announcement.createdAt || announcement.created_at).toLocaleDateString()}
                </p>
              </div>
            </div>
          )) || (
            <p className="text-gray-500 text-sm">No recent activity</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default OverviewDashboard;