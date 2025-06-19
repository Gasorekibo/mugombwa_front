import  { useState } from "react";
import { Plus, Save, X, Calendar } from "lucide-react";
import { useDispatch } from "react-redux";
import { createAnnouncement } from "../../redux/slices/announcementSlice";
import {} from "lucide-react";
import { categories,priorities } from "../../utils/constant";
function AnnouncementsTab({ announcements, ngos }) {
  const dispatch = useDispatch();
  const [showAnnouncementForm, setShowAnnouncementForm] = useState(false);
  const [announcementForm, setAnnouncementForm] = useState({
    ngo_name: "",
    title: "",
    content: "",
    priority: "normal",
    category: "",
  });

  const handleAnnouncementSubmit = async (e) => {
    e.preventDefault();
    const selectedNGO = ngos?.data?.find(
      (ngo) => ngo?.name === announcementForm.ngo_name
    );
    if (!selectedNGO) {
      alert("Please select a valid NGO.");
      return;
    }
    const newAnnouncement = {
      ...announcementForm,
      ngo_id: selectedNGO?._id,
      ngo_color: selectedNGO?.color,
      isActive: true,
    };
    const response = await dispatch(createAnnouncement(newAnnouncement));
    if (response.error) {
      alert(`Error: ${response.error.message}`);
    }
   resetAnnouncementForm();
  };

  const resetAnnouncementForm = () => {
    setAnnouncementForm({
      ngo_name: "",
      title: "",
      content: "",
      priority: "normal",
      category: "",
    });
    setShowAnnouncementForm(false);
  };
 

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-900">
          Manage Announcements
        </h2>
        <button
          onClick={() => setShowAnnouncementForm(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
        >
          <Plus size={16} />
          <span>Add Announcement</span>
        </button>
      </div>

      {/* Announcement Form Modal */}
      {showAnnouncementForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-screen overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Add New Announcement</h3>
                <button
                  onClick={resetAnnouncementForm}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X size={24} />
                </button>
              </div>

              <form onSubmit={handleAnnouncementSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    NGO Organization
                  </label>
                  <select
                    value={announcementForm.ngo_name}
                    onChange={(e) =>
                      setAnnouncementForm({
                        ...announcementForm,
                        ngo_name: e.target.value,
                      })
                    }
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select NGO</option>
                    {ngos?.data?.map((ngo) => (
                      <option key={ngo.id} value={ngo.id}>
                        {ngo.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Title
                  </label>
                  <input
                    type="text"
                    value={announcementForm.title}
                    onChange={(e) =>
                      setAnnouncementForm({
                        ...announcementForm,
                        title: e.target.value,
                      })
                    }
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Content
                  </label>
                  <textarea
                    value={announcementForm.content}
                    onChange={(e) =>
                      setAnnouncementForm({
                        ...announcementForm,
                        content: e.target.value,
                      })
                    }
                    required
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Priority
                    </label>
                    <select
                      value={announcementForm.priority}
                      onChange={(e) =>
                        setAnnouncementForm({
                          ...announcementForm,
                          priority: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      {priorities.map((priority) => (
                        <option key={priority.value} value={priority.value}>
                          {priority.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Category
                    </label>
                    <select
                      value={announcementForm.category}
                      onChange={(e) =>
                        setAnnouncementForm({
                          ...announcementForm,
                          category: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select Category</option>
                      {categories.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat.charAt(0).toUpperCase() + cat.slice(1)}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={resetAnnouncementForm}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleAnnouncementSubmit()}
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2"
                  >
                    <Save size={16} />
                    <span>Publish</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Announcements List */}
      <div className="space-y-4">
        {announcements?.data?.map((announcement) => (
          <div
            key={announcement.id}
            className="bg-white rounded-lg shadow-sm p-6"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center space-x-3">
                <div
                  className={`w-2 h-2 rounded-full ${
                    announcement.priority === "urgent"
                      ? "bg-red-500"
                      : announcement.priority === "high"
                      ? "bg-orange-500"
                      : "bg-blue-500"
                  }`}
                ></div>
                <span
                  className="text-sm font-medium"
                  style={{ color: announcement.ngo_color }}
                >
                  {announcement.ngo_name}
                </span>
                <span
                  className={`text-xs px-2 py-1 rounded-full capitalize ${
                    announcement.priority === "urgent"
                      ? "bg-red-100 text-red-800"
                      : announcement.priority === "high"
                      ? "bg-orange-100 text-orange-800"
                      : "bg-blue-100 text-blue-800"
                  }`}
                >
                  {announcement.priority}
                </span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <Calendar size={14} />
                <span>
                  {new Date(announcement.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>

            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {announcement.title}
            </h3>

            <p className="text-gray-700 mb-4">{announcement.content}</p>

            {announcement.category && (
              <span className="inline-block bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full capitalize">
                {announcement.category}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default AnnouncementsTab;
