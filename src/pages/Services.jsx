import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Clock,
  MapPin,
  Phone,
  Search,
  Filter,
  GraduationCap,
  Heart,
  Shield,
  Scale,
  Stethoscope,
} from "lucide-react";
import { useSelector } from "react-redux";
import { getAllServices } from "../utils/getAllServices";
const Services = () => {
  const { ngos } = useSelector((state) => state.ngos);
  const [services, setServices] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedNGO, setSelectedNGO] = useState("all");

  const categories = [
    { value: "all", label: "All Services" },
    { value: "education", label: "Education" },
    { value: "health", label: "Health" },
    { value: "legal", label: "Legal Aid" },
    { value: "emergency", label: "Emergency" },
    { value: "protection", label: "Protection" },
    { value: "sanitation", label: "Sanitation" },
    { value: "youth", label: "Youth Programs" },
    { value: "recreation", label: "Recreation" },
    { value: "safety", label: "Safety" },
  ];

  useEffect(() => {
    const allServices = getAllServices(ngos?.data || []);
    const activeServices = allServices.filter(
      (service) => service.status === "active"
    );
    setServices(activeServices);
    setFilteredServices(activeServices);
  }, []);
  useEffect(() => {
    let filtered = services;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (service) =>
          service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          service.description
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          service.ngo_name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter(
        (service) => service.category === selectedCategory
      );
    }

    // Filter by NGO
    if (selectedNGO !== "all") {
      filtered = filtered.filter((service) => service.ngo_name === selectedNGO);
    }

    setFilteredServices(filtered);
  }, [services, searchTerm, selectedCategory, selectedNGO]);

  const uniqueNGOs = [...new Set(services.map((service) => service.ngo_name))];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Available Services
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Comprehensive services from our NGO partners to support your needs
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                placeholder="Search services..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Category Filter */}
            <div className="relative">
              <Filter
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
              >
                {categories.map((category) => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>
            </div>

            {/* NGO Filter */}
            <div>
              <select
                value={selectedNGO}
                onChange={(e) => setSelectedNGO(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
              >
                <option value="all">All Organizations</option>
                {uniqueNGOs.map((ngo) => (
                  <option key={ngo} value={ngo}>
                    {ngo}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Results Summary */}
          <div className="mt-4 text-sm text-gray-600">
            Showing {filteredServices.length} of {services.length} services
          </div>
        </div>

        {/* Services Grid */}
        {filteredServices.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredServices.map((service) => (
              <div
                key={service._id}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <div className="p-6">
                  {/* NGO Header */}
                  <div className="flex items-center space-x-2 mb-4">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: service.ngo_color }}
                    >
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                    <span
                      className="text-sm font-medium"
                      style={{ color: service.ngo_color }}
                    >
                      {service.ngo_name}
                    </span>
                  </div>

                  {/* Service Title */}
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {service.description}
                  </p>

                  {/* Service Details */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-start space-x-2">
                      <MapPin
                        size={16}
                        className="text-gray-400 mt-0.5 flex-shrink-0"
                      />
                      <span className="text-sm text-gray-700">
                        {service.location}
                      </span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <Clock
                        size={16}
                        className="text-gray-400 mt-0.5 flex-shrink-0"
                      />
                      <span className="text-sm text-gray-700">
                        {service.schedule}
                      </span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <Phone
                        size={16}
                        className="text-gray-400 mt-0.5 flex-shrink-0"
                      />
                      <a
                        href={`tel:${service.contact}`}
                        className="text-sm text-blue-600 hover:text-blue-800"
                      >
                        {service.contact}
                      </a>
                    </div>
                  </div>

                  {/* Category Badge */}
                  <div className="flex justify-between items-center">
                    <span className="inline-block bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full capitalize">
                      {service.category}
                    </span>
                    <Link
                      to={`/ngo/${service.ngo_id}`}
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                    >
                      View NGO →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search size={48} className="mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No services found
            </h3>
            <p className="text-gray-600">
              Try adjusting your search criteria or filters
            </p>
          </div>
        )}

        {/* Emergency Notice */}
        <div className="mt-12 bg-red-50 border border-red-200 rounded-lg p-6">
          <div className="flex items-center space-x-3">
            <Shield className="h-6 w-6 text-red-600 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-red-900">
                Need Emergency Help?
              </h3>
              <p className="text-red-700 text-sm mt-1">
                For urgent situations, visit our{" "}
                <Link to="/emergency" className="underline font-medium">
                  Emergency Services page
                </Link>{" "}
                or call +250 788 345 678
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
