import React, { useState, useEffect } from 'react';
import { 
  Bell, 
  Calendar, 
  Search, 
  Filter,
  AlertTriangle,
  Info,
  Star,
  Clock
} from 'lucide-react';
import {useSelector} from 'react-redux';
import { PremiumLoader } from '../components/LoadingSpinner';
import { useDispatch } from 'react-redux';
import {getAllAnnouncements} from '../redux/slices/announcementSlice';
import {categoryOptions, priorityOptions} from '../utils/constant'
const Announcements = () => {
  const dispatch = useDispatch();
 
  const {announcements, loading, error} = useSelector((state) => state.announcements);
  const [filteredAnnouncements, setFilteredAnnouncements] = useState(announcements?.data || []);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPriority, setSelectedPriority] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');

   useEffect(() => {
    dispatch(getAllAnnouncements());
  }, [dispatch]);

  useEffect(() => {
    let filtered = announcements?.data || [];

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(announcement =>
        announcement.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        announcement.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        announcement.ngo_name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by priority
    if (selectedPriority !== 'all') {
      filtered = filtered.filter(announcement => announcement.priority === selectedPriority);
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(announcement => announcement.category === selectedCategory);
    }

    setFilteredAnnouncements(filtered);
  }, [searchTerm, selectedPriority, selectedCategory]);

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 'urgent':
        return <AlertTriangle size={20} className="text-red-600" />;
      case 'high':
        return <Star size={20} className="text-orange-600" />;
      default:
        return <Info size={20} className="text-blue-600" />;
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'urgent':
        return 'border-l-red-500 bg-red-50';
      case 'high':
        return 'border-l-orange-500 bg-orange-50';
      default:
        return 'border-l-blue-500 bg-blue-50';
    }
  };

  const getPriorityBadge = (priority) => {
    switch (priority) {
      case 'urgent':
        return 'bg-red-100 text-red-800';
      case 'high':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-blue-100 text-blue-800';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) {
      return 'Today';
    } else if (diffDays === 2) {
      return 'Yesterday';
    } else if (diffDays <= 7) {
      return `${diffDays - 1} days ago`;
    } else {
      return date.toLocaleDateString();
    }
  };
if(loading) return <PremiumLoader/>;
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Community Updates</h1>
          <p className="text-xl text-gray-600">
            Stay informed with the latest news and announcements from our NGO partners
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search announcements..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Priority Filter */}
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <select
                value={selectedPriority}
                onChange={(e) => setSelectedPriority(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
              >
                {priorityOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Category Filter */}
            <div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
              >
                {categoryOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Results Summary */}
          <div className="mt-4 text-sm text-gray-600">
            Showing {filteredAnnouncements.length} of {announcements?.count} announcements
          </div>
        </div>

        {/* Announcements List */}
        {filteredAnnouncements.length > 0 ? (
          <div className="space-y-6">
            {filteredAnnouncements.map((announcement) => (
              <div
                key={announcement?._id}
                className={`border-l-4 rounded-lg shadow-sm p-6 ${getPriorityColor(announcement.priority)}`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    {getPriorityIcon(announcement.priority)}
                    <div>
                      <div className="flex items-center space-x-2 mb-1">
                        <span 
                          className="text-sm font-medium"
                          style={{ color: announcement.ngo_color }}
                        >
                          {announcement.ngo_name}
                        </span>
                        <span className={`text-xs px-2 py-1 rounded-full capitalize ${getPriorityBadge(announcement.priority)}`}>
                          {announcement.priority}
                        </span>
                      </div>
                      <h2 className="text-xl font-semibold text-gray-900">
                        {announcement.title}
                      </h2>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <Clock size={16} />
                    <span>{formatDate(announcement.createdAt)}</span>
                  </div>
                </div>

                <div className="prose max-w-none">
                  <p className="text-gray-700 leading-relaxed">
                    {announcement.content}
                  </p>
                </div>

                {announcement.category && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <span className="inline-block bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full capitalize">
                      {announcement.category}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Bell size={48} className="mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No announcements found</h3>
            <p className="text-gray-600">Try adjusting your search criteria or filters</p>
          </div>
        )}

        {/* Subscribe Notice */}
        <div className="mt-12 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <div className="flex items-center space-x-3">
            <Bell className="h-6 w-6 text-blue-600 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-blue-900">Stay Updated</h3>
              <p className="text-blue-700 text-sm mt-1">
                Check back regularly for the latest updates from our NGO partners. 
                Important announcements are prioritized at the top.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Announcements;