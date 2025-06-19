import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Clock, 
  MapPin, 
  Phone, 
  Mail,
  GraduationCap,
  Heart,
  Shield,
  Scale,
  Stethoscope
} from 'lucide-react';
import { getNGOById, getServicesByNGOId } from '../data/mockData';
import { useSelector } from 'react-redux';
const NGODetail = () => {
  const { id } = useParams();
const {ngos} = useSelector((state) => state.ngos)
const ngo = getNGOById(ngos?.data, id);

  const services = getServicesByNGOId(ngos?.data, id);

  const iconMap = {
    GraduationCap,
    Heart,
    Shield,
    Scale,
    Stethoscope
  };

  if (!ngo) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">NGO Not Found</h2>
          <Link to="/services" className="text-blue-600 hover:text-blue-800">
            ← Back to Services
          </Link>
        </div>
      </div>
    );
  }

  const IconComponent = iconMap[ngo.icon];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link
            to="/services"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4"
          >
            <ArrowLeft size={20} className="mr-2" />
            Back to Services
          </Link>
          
          <div className="flex items-center space-x-4">
            <div 
              className="w-16 h-16 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: ngo.color }}
            >
              {IconComponent && <IconComponent className="h-8 w-8 text-white" />}
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{ngo.name}</h1>
              <p className="text-lg text-gray-600">{ngo.description}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">About {ngo.name}</h2>
              <p className="text-gray-700 leading-relaxed">
                {ngo.name} is dedicated to providing essential services to the Mugombwa refugee camp community. 
                Our mission is to support refugees through comprehensive programs designed to meet their immediate 
                needs while building foundations for long-term stability and empowerment.
              </p>
            </div>

            {/* Services */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Our Services</h2>
              {services.length > 0 ? (
                <div className="space-y-6">
                  {services.map((service) => (
                    <div key={service.id} className="border border-gray-200 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{service.title}</h3>
                      <p className="text-gray-600 mb-4">{service.description}</p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-start space-x-2">
                          <MapPin size={16} className="text-gray-400 mt-1 flex-shrink-0" />
                          <div>
                            <p className="text-sm font-medium text-gray-900">Location</p>
                            <p className="text-sm text-gray-600">{service.location}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start space-x-2">
                          <Clock size={16} className="text-gray-400 mt-1 flex-shrink-0" />
                          <div>
                            <p className="text-sm font-medium text-gray-900">Schedule</p>
                            <p className="text-sm text-gray-600">{service.schedule}</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <div className="flex items-center justify-between">
                          <span className="inline-block bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full capitalize">
                            {service.category}
                          </span>
                          <a 
                            href={`tel:${service.contact}`}
                            className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center space-x-1"
                          >
                            <Phone size={14} />
                            <span>Call for Info</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-600">No services currently available. Check back soon!</p>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Contact Information */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
              <div 
                className="text-sm text-gray-700 space-y-2"
                dangerouslySetInnerHTML={{ __html: ngo.contact_info }}
              />
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2">
                  <Phone size={16} />
                  <span>Call Now</span>
                </button>
                <Link
                  to="/services"
                  className="block w-full bg-gray-100 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors text-center"
                >
                  View All Services
                </Link>
                <Link
                  to="/announcements"
                  className="block w-full bg-gray-100 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors text-center"
                >
                  Latest Updates
                </Link>
              </div>
            </div>

            {/* Operating Hours */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">General Operating Hours</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Monday - Friday</span>
                  <span className="text-gray-900">8:00 AM - 5:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Saturday</span>
                  <span className="text-gray-900">9:00 AM - 2:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Sunday</span>
                  <span className="text-gray-900">Closed</span>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-3">
                *Hours may vary by service. Check individual service schedules above.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NGODetail;