import React from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Mugombwa Refugee Camp</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              Centralized platform connecting refugees with essential services from NGO partners. 
              Access education, health, legal aid, emergency services, and more in one place.
            </p>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-sm">
                <MapPin size={16} className="text-gray-400" />
                <span className="text-gray-300">Mugombwa Refugee Camp, Rwanda</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <Phone size={16} className="text-gray-400" />
                <span className="text-gray-300">+250 788 000 000</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <Mail size={16} className="text-gray-400" />
                <span className="text-gray-300">info@mugombwa.rw</span>
              </div>
            </div>
          </div>

          {/* Emergency */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-red-400">Emergency Contacts</h3>
            <div className="space-y-2">
              <div className="text-sm">
                <p className="text-gray-300">Emergency Hotline</p>
                <p className="text-white font-medium">+250 788 345 678</p>
              </div>
              <div className="text-sm">
                <p className="text-gray-300">Health Emergency</p>
                <p className="text-white font-medium">+250 788 567 890</p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            &copy; 2024 Mugombwa Refugee Services Platform. Built to serve the community.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;