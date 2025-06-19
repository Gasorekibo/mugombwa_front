import React, { useState } from 'react';
import { 
  Phone, 
  AlertTriangle, 
  Clock, 
  MapPin, 
  FileText,
  Shield,
  Heart,
  Users,
  Flame,
  Lock
} from 'lucide-react';
import { getAllEmergenciesContact } from '../redux/slices/emergenceSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import {PremiumLoader} from '../components/LoadingSpinner';
const Emergency = () => {

  const dispatch = useDispatch();
  const {emergencies:emergencyContacts, loading, error} = useSelector((state) => state.emergencies);

  useEffect(() => {
    dispatch(getAllEmergenciesContact());
  }, [dispatch]);

  const [incidentForm, setIncidentForm] = useState({
    type: '',
    description: '',
    location: '',
    reporter_name: '',
    phone: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const incidentTypes = [
    'Medical Emergency',
    'Fire',
    'Security Incident',
    'Violence/Conflict',
    'Theft',
    'Infrastructure Damage',
    'Other'
  ];

  const getContactIcon = (type) => {
    switch (type) {
      case 'emergency':
        return <AlertTriangle className="text-red-600" size={20} />;
      case 'health':
        return <Heart className="text-red-600" size={20} />;
      case 'security':
        return <Shield className="text-blue-600" size={20} />;
      case 'fire':
        return <Flame className="text-orange-600" size={20} />;
      case 'administration':
        return <Users className="text-gray-600" size={20} />;
      default:
        return <Phone className="text-gray-600" size={20} />;
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setIncidentForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmitIncident = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setSubmitSuccess(true);
      setIncidentForm({
        type: '',
        description: '',
        location: '',
        reporter_name: '',
        phone: ''
      });
      setIsSubmitting(false);
      setTimeout(() => setSubmitSuccess(false), 5000);
    }, 1000);
  };
if(loading) return <PremiumLoader />;
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center">
              <AlertTriangle className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Emergency Services</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            24/7 emergency assistance, safety protocols, and incident reporting for the camp community
          </p>
        </div>

        {/* Emergency Alert */}
        <div className="bg-red-50 border-l-4 border-red-600 p-6 mb-8 rounded-lg">
          <div className="flex items-center">
            <AlertTriangle className="h-6 w-6 text-red-600 mr-3" />
            <div>
              <h3 className="text-lg font-semibold text-red-900">In Case of Emergency</h3>
              <p className="text-red-700 mt-1">
                For immediate life-threatening emergencies, call <strong>+250 788 345 678</strong> immediately.
                Do not wait to fill out forms or search for information.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Emergency Contacts */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
              <Phone className="h-6 w-6 mr-2 text-red-600" />
              Emergency Contacts
            </h2>

            <div className="space-y-4">
              {emergencyContacts?.data?.map((contact) => (
                <div key={contact.id} className="border border-gray-200 rounded-lg p-4 hover:border-red-300 transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      {getContactIcon(contact.type)}
                      <h3 className="font-semibold text-gray-900">{contact.name}</h3>
                    </div>
                    {contact.available_24_7 && (
                      <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                        24/7
                      </span>
                    )}
                  </div>
                  
                  <a 
                    href={`tel:${contact.phone}`}
                    className="text-2xl font-bold text-red-600 hover:text-red-800 block mb-2"
                  >
                    {contact.phone}
                  </a>
                  
                  <p className="text-sm text-gray-600 capitalize">{contact.type} Services</p>
                  
                  <button
                    onClick={() => window.open(`tel:${contact.phone}`)}
                    className="mt-3 w-full bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center space-x-2"
                  >
                    <Phone size={16} />
                    <span>Call Now</span>
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Incident Reporting */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
              <FileText className="h-6 w-6 mr-2 text-blue-600" />
              Report an Incident
            </h2>

            {submitSuccess && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-green-600 rounded-full mr-3"></div>
                  <p className="text-green-800">
                    Incident report submitted successfully. Our team will review it promptly.
                  </p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmitIncident} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Incident Type *
                </label>
                <select
                  name="type"
                  value={incidentForm.type}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select incident type</option>
                  {incidentTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description *
                </label>
                <textarea
                  name="description"
                  value={incidentForm.description}
                  onChange={handleInputChange}
                  required
                  rows={4}
                  placeholder="Describe what happened, when, and any other relevant details..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location *
                </label>
                <input
                  type="text"
                  name="location"
                  value={incidentForm.location}
                  onChange={handleInputChange}
                  required
                  placeholder="Where did this incident occur?"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Name (Optional)
                </label>
                <input
                  type="text"
                  name="reporter_name"
                  value={incidentForm.reporter_name}
                  onChange={handleInputChange}
                  placeholder="Your name (leave blank for anonymous reporting)"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number (Optional)
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={incidentForm.phone}
                  onChange={handleInputChange}
                  placeholder="Your phone number for follow-up"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>Submitting...</span>
                  </>
                ) : (
                  <>
                    <FileText size={16} />
                    <span>Submit Report</span>
                  </>
                )}
              </button>
            </form>

            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <div className="flex items-start space-x-2">
                <Lock size={16} className="text-gray-400 mt-1 flex-shrink-0" />
                <div className="text-sm text-gray-600">
                  <p className="font-medium">Privacy Notice</p>
                  <p>Your report will be handled confidentially. Anonymous reports are accepted and your privacy is protected.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Safety Protocols */}
        <div className="mt-12 bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
            <Shield className="h-6 w-6 mr-2 text-green-600" />
            Safety Protocols & Procedures
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-red-50 p-4 rounded-lg">
              <h3 className="font-semibold text-red-900 mb-2">Fire Emergency</h3>
              <ul className="text-sm text-red-700 space-y-1">
                <li>• Alert others and evacuate immediately</li>
                <li>• Call +250 788 333 444</li>
                <li>• Meet at designated assembly points</li>
                <li>• Do not use elevators</li>
              </ul>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold text-blue-900 mb-2">Medical Emergency</h3>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Call +250 788 567 890</li>
                <li>• Do not move injured person</li>
                <li>• Provide first aid if trained</li>
                <li>• Wait for medical personnel</li>
              </ul>
            </div>

            <div className="bg-orange-50 p-4 rounded-lg">
              <h3 className="font-semibold text-orange-900 mb-2">Security Incident</h3>
              <ul className="text-sm text-orange-700 space-y-1">
                <li>• Ensure your safety first</li>
                <li>• Call +250 788 111 222</li>
                <li>• Do not confront dangerous situations</li>
                <li>• Report to security office</li>
              </ul>
            </div>
          </div>

          <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-yellow-600" />
              <h3 className="font-semibold text-yellow-900">Emergency Assembly Points</h3>
            </div>
            <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-yellow-700">
              <div>
                <p><strong>Primary:</strong> Community Center Main Entrance</p>
                <p><strong>Secondary:</strong> Sports Ground</p>
              </div>
              <div>
                <p><strong>Medical:</strong> Health Center Emergency Ward</p>
                <p><strong>Shelter:</strong> Emergency Shelter Area C</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Emergency;