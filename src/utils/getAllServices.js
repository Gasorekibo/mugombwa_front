export const getAllServices = (ngos) => {
  return ngos?.flatMap(ngo => {
    return ngo?.services?.map(service => ({
      ...service,
      ngo_name: ngo.name,
      ngo_color: ngo.color,
      ngo_id: ngo._id
    }));
  });
};

// Helper function to get NGO by ID
export const getNGOById = (ngos, id) => {
  return ngos.find(ngo => ngo.id === parseInt(id));
};

// Helper function to get services by NGO ID
export const getServicesByNGOId = (ngos, ngoId) => {
  const ngo = getNGOById(ngos, ngoId);
  return ngo ? ngo.services : [];
};