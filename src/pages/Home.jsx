import React from 'react';
import { Link } from 'react-router-dom';
import { 
  GraduationCap, 
  Heart, 
  Shield, 
  Scale, 
  Stethoscope,
  ArrowRight,
  Users,
  Calendar,
  Bell,
  MapPin
} from 'lucide-react';
import { getAllServices } from '../utils/getAllServices';
import { getAllNgos } from '../redux/slices/ngoSlice';
import { useSelector, useDispatch } from 'react-redux';
import { getAllAnnouncements } from '../redux/slices/announcementSlice';
import { PremiumLoader } from '../components/LoadingSpinner';
const Home = () => {
  const iconMap = {
    GraduationCap,
    Heart,
    Shield,
    Scale,
    Stethoscope
  };
const dispatch = useDispatch();
  const { ngos, loading, error } = useSelector((state) => state.ngos);
  const { announcements, loading: announcementLoading, error: announcementError } = useSelector((state) => state.announcements);
console.log(error)
  React.useEffect(() => {
    dispatch(getAllNgos());
    dispatch(getAllAnnouncements()); 
  }, [dispatch]);
  const recentAnnouncements = announcements?.data?.slice(0, 3);
  const allServices = getAllServices(ngos?.data);

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'urgent': return 'border-l-red-500 bg-red-50';
      case 'high': return 'border-l-orange-500 bg-orange-50';
      default: return 'border-l-blue-500 bg-blue-50';
    }
  };
if(loading || announcementError) return <PremiumLoader/>
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-green-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Welcome to Mugombwa
              <span className="block text-yellow-300">Refugee Services</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
              Your central hub for accessing all NGO services, updates, and support in one place. 
              Connected. Supported. Empowered.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/services"
                className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center space-x-2"
              >
                <span>Explore Services</span>
                <ArrowRight size={20} />
              </Link>
              <Link
                to="/emergency"
                className="bg-red-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-red-700 transition-colors flex items-center justify-center space-x-2"
              >
                <Shield size={20} />
                <span>Emergency Help</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="bg-blue-50 p-6 rounded-lg">
              <Users className="h-10 w-10 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{ngos?.data?.length}</div>
              <div className="text-sm text-gray-600">NGO Partners</div>
            </div>
            <div className="bg-green-50 p-6 rounded-lg">
              <Stethoscope className="h-10 w-10 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{allServices?.length}+</div>
              <div className="text-sm text-gray-600">Services Available</div>
            </div>
            <div className="bg-purple-50 p-6 rounded-lg">
              <Calendar className="h-10 w-10 text-purple-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">24/7</div>
              <div className="text-sm text-gray-600">Emergency Support</div>
            </div>
            <div className="bg-orange-50 p-6 rounded-lg">
              <MapPin className="h-10 w-10 text-orange-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">1</div>
              <div className="text-sm text-gray-600">Central Location</div>
            </div>
          </div>
        </div>
      </section>

      {/* NGO Services Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our NGO Partners</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Dedicated organizations working together to provide comprehensive support and services
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {ngos?.data?.map((ngo) => {
              const IconComponent = iconMap[ngo.icon];
              return (
                <Link
                  key={ngo?._id}
                  to={`/ngo/${ngo?._id}`}
                  className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden group"
                >
                  <div className="p-6">
                    <div className="flex items-center space-x-4 mb-4">
                      <div 
                        className="w-12 h-12 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: ngo.color }}
                      >
                        {IconComponent && <IconComponent className="h-6 w-6 text-white" />}
                      </div>
                      <div>
                        <h3 className="font-bold text-lg text-gray-900">{ngo.name}</h3>
                        <p className="text-sm text-gray-600">{ngo.description}</p>
                      </div>
                    </div>
                    <div 
                      className="text-sm text-gray-700 mb-4"
                      dangerouslySetInnerHTML={{ __html: ngo.contact_info }}
                    />
                    <div className="flex items-center text-blue-600 group-hover:text-blue-800 transition-colors">
                      <span className="text-sm font-medium">View Services</span>
                      <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Recent Announcements */}
      {recentAnnouncements?.length > 0 && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900">Latest Updates</h2>
              <Link
                to="/announcements"
                className="text-blue-600 hover:text-blue-800 font-medium flex items-center space-x-1"
              >
                <span>View All</span>
                <ArrowRight size={16} />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {recentAnnouncements?.map((announcement) => (
                <div
                  key={announcement._id}
                  className={`border-l-4 p-6 rounded-lg ${getPriorityColor(announcement?.priority)}`}
                >
                  <div className="flex items-center space-x-2 mb-2">
                    <Bell size={16} style={{ color: announcement.ngo_color }} />
                    <span className="text-sm font-medium" style={{ color: announcement.ngo_color }}>
                      {announcement.ngo_name}
                    </span>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{announcement.title}</h3>
                  <p className="text-gray-700 text-sm mb-3 line-clamp-3">{announcement.content}</p>
                  <div className="text-xs text-gray-500">
                    {new Date(announcement.createdAt).toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Quick Actions */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Need Help?</h2>
            <p className="text-xl text-gray-300">Quick access to essential services and support</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link
              to="/emergency"
              className="bg-red-600 hover:bg-red-700 p-6 rounded-lg text-center transition-colors group"
            >
              <Shield className="h-8 w-8 mx-auto mb-3 group-hover:scale-110 transition-transform" />
              <h3 className="font-semibold mb-2">Emergency Services</h3>
              <p className="text-sm text-red-100">24/7 emergency assistance and incident reporting</p>
            </Link>

            <Link
              to="/services"
              className="bg-blue-600 hover:bg-blue-700 p-6 rounded-lg text-center transition-colors group"
            >
              <Stethoscope className="h-8 w-8 mx-auto mb-3 group-hover:scale-110 transition-transform" />
              <h3 className="font-semibold mb-2">Health Services</h3>
              <p className="text-sm text-blue-100">Medical care, vaccination, and nutrition programs</p>
            </Link>

            <Link
              to="/services"
              className="bg-green-600 hover:bg-green-700 p-6 rounded-lg text-center transition-colors group"
            >
              <GraduationCap className="h-8 w-8 mx-auto mb-3 group-hover:scale-110 transition-transform" />
              <h3 className="font-semibold mb-2">Education</h3>
              <p className="text-sm text-green-100">Learning opportunities for children and adults</p>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;