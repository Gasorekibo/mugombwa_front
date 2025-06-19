

import React, { useEffect, useState } from "react";
import { Briefcase, Megaphone, Eye } from "lucide-react";
import { useSelector } from "react-redux";
import { getAllServices } from "../utils/getAllServices";
import { getAllAnnouncements } from "../redux/slices/announcementSlice";
import { getAllNgos } from "../redux/slices/ngoSlice";
import { useDispatch } from "react-redux";
import OverviewTab from "../components/AdminTabs/OverviewTab"
import AnnouncementsTab from "../components/AdminTabs/AnnouncementTab";
import ServicesTab from "../components/AdminTabs/ServicesTab";
import {PremiumLoader} from '../components/LoadingSpinner'
const Admin = () => {
  const dispatch = useDispatch(); 
  const { ngos, loading: ngosLoading } = useSelector((state) => state.ngos);
  const { announcements, loading: announcementsLoading } = useSelector(
    (state) => state.announcements
  );
  const [activeTab, setActiveTab] = useState("overview");
  const [services, setServices] = useState(getAllServices(ngos?.data || []));
  const [allAnnouncements, setAllAnnouncements] = useState(announcements);

  const tabs = [
    { id: "overview", name: "Dashboard", icon: Eye },
    { id: "services", name: "Services", icon: Briefcase },
    { id: "announcements", name: "Announcements", icon: Megaphone },
  ];
  useEffect(()=> {
    dispatch(getAllNgos());
    dispatch(getAllAnnouncements());
    dispatch(getAllNgos())
  },[])
if(ngosLoading || announcementsLoading) return <PremiumLoader/>;
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <h1 className="text-3xl font-bold text-gray-900">Admin Panel</h1>
            <p className="text-gray-600 mt-2">
              Manage services, announcements, and platform content
            </p>
          </div>

          {/* Tab Navigation */}
          <div className="flex space-x-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors flex items-center space-x-2 ${
                    activeTab === tab.id
                      ? "bg-blue-100 text-blue-700 border-b-2 border-blue-700"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                  }`}
                >
                  <Icon size={16} />
                  <span>{tab.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Render components based on active tab */}
        {activeTab === "overview" && (
          <OverviewTab
            ngos={ngos}
            services={services}
            announcements={allAnnouncements}
            loading={ngosLoading || announcementsLoading}
          />
        )}

        {activeTab === "services" && (
          <ServicesTab
            services={services}
            setServices={setServices}
            ngos={ngos}
          />
        )}

        {activeTab === "announcements" && (
          <AnnouncementsTab
            announcements={allAnnouncements}
            setAnnouncements={setAllAnnouncements}
            ngos={ngos}
          />
        )}
      </div>
    </div>
  );
};

export default Admin;