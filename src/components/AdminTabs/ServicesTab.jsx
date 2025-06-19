
import { useState } from 'react';
import { Plus, Save, Edit, Trash2, X } from 'lucide-react';
import { categories } from '../../utils/constant';
import { useDispatch } from 'react-redux';
import { addNewService } from '../../redux/slices/ngoSlice';
function ServicesTab({ services, setServices, ngos }) {
  const dispatch = useDispatch();
    const [showServiceForm, setShowServiceForm] = useState(false);
    const [editingService, setEditingService] = useState(null);
      const [serviceForm, setServiceForm] = useState({
    ngo_name: "",
    title: "",
    description: "",
    category: "",
    location: "",
    schedule: "",
    contact: "",
    status: "active",
  });
    const handleServiceSubmit = async(e) => {
    e.preventDefault();
const selectedNGO = ngos?.data?.find(
      (ngo) => ngo.name === serviceForm.ngo_name
    );
    if (!selectedNGO) {
      alert("Please select a valid NGO.");
      return;
    }
    const newService = {
      ...serviceForm,
      ngo_id: selectedNGO._id,
    };

    const response = await dispatch(addNewService(newService));
    if (response.error) {
      alert(`Error: ${response.error.message}`);
    }
   
   resetServiceForm();
  };

    const handleDeleteService = (id) => {
    if (window.confirm("Are you sure you want to delete this service?")) {
      setServices(services.filter((service) => service.id !== id));
    }
  };

  const resetServiceForm = () => {
    setServiceForm({
      ngo_name: "",
      title: "",
      description: "",
      category: "",
      location: "",
      schedule: "",
      contact: "",
      status: "active",
    });
    //setShowServiceForm(false);
    //setEditingService(null);
  };
    const editService = (service) => {
    setServiceForm({
      ngo_name: service.ngo_name,
      title: service.title,
      description: service.description,
      category: service.category,
      location: service.location,
      schedule: service.schedule,
      contact: service.contact,
      status: service.status,
    });
    setEditingService(service);
    setShowServiceForm(true);
  };
  return (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-gray-900">
                Manage Services
              </h2>
              <button
                onClick={() => setShowServiceForm(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
              >
                <Plus size={16} />
                <span>Add Service</span>
              </button>
            </div>

            {/* Service Form Modal */}
            {showServiceForm && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                <div className="bg-white rounded-lg max-w-2xl w-full max-h-screen overflow-y-auto">
                  <div className="p-6">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-semibold">
                        {editingService ? "Edit Service" : "Add New Service"}
                      </h3>
                      <button
                        onClick={resetServiceForm}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <X size={24} />
                      </button>
                    </div>

                    <form onSubmit={handleServiceSubmit} className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          NGO Organization
                        </label>
                        <select
                          value={serviceForm.ngo_name}
                          onChange={(e) =>
                            setServiceForm({
                              ...serviceForm,
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

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Service Title
                          </label>
                          <input
                            type="text"
                            value={serviceForm.title}
                            onChange={(e) =>
                              setServiceForm({
                                ...serviceForm,
                                title: e.target.value,
                              })
                            }
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Category
                          </label>
                          <select
                            value={serviceForm.category}
                            onChange={(e) =>
                              setServiceForm({
                                ...serviceForm,
                                category: e.target.value,
                              })
                            }
                            required
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

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Description
                        </label>
                        <textarea
                          value={serviceForm.description}
                          onChange={(e) =>
                            setServiceForm({
                              ...serviceForm,
                              description: e.target.value,
                            })
                          }
                          required
                          rows={3}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Location
                          </label>
                          <input
                            type="text"
                            value={serviceForm.location}
                            onChange={(e) =>
                              setServiceForm({
                                ...serviceForm,
                                location: e.target.value,
                              })
                            }
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Contact
                          </label>
                          <input
                            type="text"
                            value={serviceForm.contact}
                            onChange={(e) =>
                              setServiceForm({
                                ...serviceForm,
                                contact: e.target.value,
                              })
                            }
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Schedule
                          </label>
                          <input
                            type="text"
                            value={serviceForm.schedule}
                            onChange={(e) =>
                              setServiceForm({
                                ...serviceForm,
                                schedule: e.target.value,
                              })
                            }
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Status
                          </label>
                          <select
                            value={serviceForm.status}
                            onChange={(e) =>
                              setServiceForm({
                                ...serviceForm,
                                status: e.target.value,
                              })
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                          >
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                          </select>
                        </div>
                      </div>

                      <div className="flex justify-end space-x-3 pt-4">
                        <button
                          type="button"
                          onClick={resetServiceForm}
                          className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2"
                        >
                          <Save size={16} />
                          <span>{editingService ? "Update" : "Create"}</span>
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            )}

            {/* Services List */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Service
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        NGO
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Category
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {services.map((service) => (
                      <tr key={service._id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {service.title}
                            </div>
                            <div className="text-sm text-gray-500">
                              {service.location}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-sm text-gray-900">
                            {service.ngo_name}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800 capitalize">
                            {service.category}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              service.status === "active"
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {service.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button
                            onClick={() => editService(service)}
                            className="text-blue-600 hover:text-blue-800 mr-3"
                          >
                            <Edit size={16} />
                          </button>
                          <button
                            onClick={() => handleDeleteService(service.id)}
                            className="text-red-600 hover:text-red-800"
                          >
                            <Trash2 size={16} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

    );
}


export default ServicesTab;


