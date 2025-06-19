// Mock data for the refugee services platform
export const ngos = [
  {
    id: 1,
    name: 'World Vision',
    description: 'Education & Sanitation Services',
    color: '#1E40AF',
    icon: 'GraduationCap',
    contact_info: 'Phone: +250 788 123 456<br>Email: worldvision@mugombwa.rw',
    services: [
      {
        id: 1,
        title: 'Primary Education Program',
        description: 'Daily classes for children aged 6-12 with qualified teachers and learning materials',
        category: 'education',
        location: 'Community Center Block A',
        schedule: 'Monday-Friday: 8:00 AM - 12:00 PM',
        contact: '+250 788 123 456',
        status: 'active'
      },
      {
        id: 2,
        title: 'Adult Literacy Classes',
        description: 'Reading and writing classes for adults in Kinyarwanda, French, and English',
        category: 'education',
        location: 'Community Center Block B',
        schedule: 'Tuesday/Thursday: 6:00 PM - 8:00 PM',
        contact: '+250 788 123 456',
        status: 'active'
      },
      {
        id: 3,
        title: 'Water Distribution',
        description: 'Clean water access points with quality testing and distribution schedules',
        category: 'sanitation',
        location: 'Water Point 1 & 2',
        schedule: 'Daily: 6:00 AM - 6:00 PM',
        contact: '+250 788 123 456',
        status: 'active'
      },
      {
        id: 4,
        title: 'Sanitation Facilities',
        description: 'Public toilet and hygiene facilities with maintenance and cleaning services',
        category: 'sanitation',
        location: 'Multiple locations',
        schedule: '24/7 Access',
        contact: '+250 788 123 456',
        status: 'active'
      }
    ]
  },
  {
    id: 2,
    name: 'Plan International',
    description: 'Children\'s Rights & Protection',
    color: '#059669',
    icon: 'Heart',
    contact_info: 'Phone: +250 788 234 567<br>Email: plan@mugombwa.rw',
    services: [
      {
        id: 5,
        title: 'Child Protection Services',
        description: 'Safe spaces and protection for children with trained social workers',
        category: 'protection',
        location: 'Child-Friendly Space 1',
        schedule: 'Monday-Saturday: 9:00 AM - 5:00 PM',
        contact: '+250 788 234 567',
        status: 'active'
      },
      {
        id: 6,
        title: 'Youth Programs',
        description: 'Skills training and activities for youth aged 15-24',
        category: 'youth',
        location: 'Youth Center',
        schedule: 'Daily: 2:00 PM - 6:00 PM',
        contact: '+250 788 234 567',
        status: 'active'
      },
      {
        id: 7,
        title: 'Recreational Activities',
        description: 'Sports and games for children to promote physical and mental wellbeing',
        category: 'recreation',
        location: 'Sports Ground',
        schedule: 'Daily: 4:00 PM - 6:00 PM',
        contact: '+250 788 234 567',
        status: 'active'
      }
    ]
  },
  {
    id: 3,
    name: 'MINEMA',
    description: 'Emergency Response & Safety',
    color: '#DC2626',
    icon: 'Shield',
    contact_info: 'Phone: +250 788 345 678<br>Email: minema@mugombwa.rw',
    services: [
      {
        id: 8,
        title: 'Emergency Response',
        description: '24/7 emergency assistance for medical, fire, and security incidents',
        category: 'emergency',
        location: 'Emergency Center',
        schedule: '24/7 Available',
        contact: '+250 788 345 678',
        status: 'active'
      },
      {
        id: 9,
        title: 'Safety Training',
        description: 'Fire safety and emergency preparedness training for all residents',
        category: 'safety',
        location: 'Training Hall',
        schedule: 'Weekly: Saturday 10:00 AM',
        contact: '+250 788 345 678',
        status: 'active'
      },
      {
        id: 10,
        title: 'Emergency Shelter',
        description: 'Temporary shelter for emergencies and displaced families',
        category: 'emergency',
        location: 'Shelter Area C',
        schedule: '24/7 Available',
        contact: '+250 788 345 678',
        status: 'active'
      }
    ]
  },
  {
    id: 4,
    name: 'Prison Fellowship',
    description: 'Legal Aid & Rights',
    color: '#7C3AED',
    icon: 'Scale',
    contact_info: 'Phone: +250 788 456 789<br>Email: legal@mugombwa.rw',
    services: [
      {
        id: 11,
        title: 'Legal Aid Consultation',
        description: 'Free legal advice and assistance from qualified lawyers',
        category: 'legal',
        location: 'Legal Aid Office',
        schedule: 'Monday-Friday: 9:00 AM - 4:00 PM',
        contact: '+250 788 456 789',
        status: 'active'
      },
      {
        id: 12,
        title: 'Document Assistance',
        description: 'Help with legal documents, applications, and official paperwork',
        category: 'legal',
        location: 'Document Center',
        schedule: 'Monday-Friday: 8:00 AM - 5:00 PM',
        contact: '+250 788 456 789',
        status: 'active'
      },
      {
        id: 13,
        title: 'Rights Awareness',
        description: 'Legal rights education sessions for refugees and asylum seekers',
        category: 'education',
        location: 'Community Hall',
        schedule: 'Wednesday: 3:00 PM - 5:00 PM',
        contact: '+250 788 456 789',
        status: 'active'
      }
    ]
  },
  {
    id: 5,
    name: 'Save the Children',
    description: 'Health & Nutrition',
    color: '#EA580C',
    icon: 'Stethoscope',
    contact_info: 'Phone: +250 788 567 890<br>Email: health@mugombwa.rw',
    services: [
      {
        id: 14,
        title: 'Health Clinic',
        description: 'Primary healthcare services with qualified medical staff',
        category: 'health',
        location: 'Health Center',
        schedule: 'Monday-Friday: 8:00 AM - 5:00 PM',
        contact: '+250 788 567 890',
        status: 'active'
      },
      {
        id: 15,
        title: 'Vaccination Program',
        description: 'Child vaccination services following WHO guidelines',
        category: 'health',
        location: 'Health Center',
        schedule: 'Monday/Wednesday: 9:00 AM - 12:00 PM',
        contact: '+250 788 567 890',
        status: 'active'
      },
      {
        id: 16,
        title: 'Nutrition Program',
        description: 'Nutrition support and monitoring for children under 5',
        category: 'health',
        location: 'Nutrition Center',
        schedule: 'Daily: 10:00 AM - 2:00 PM',
        contact: '+250 788 567 890',
        status: 'active'
      },
      {
        id: 17,
        title: 'Maternal Health',
        description: 'Healthcare for mothers and babies including prenatal care',
        category: 'health',
        location: 'Maternal Ward',
        schedule: 'Monday-Friday: 8:00 AM - 5:00 PM',
        contact: '+250 788 567 890',
        status: 'active'
      }
    ]
  }
];

export const announcements = [
  {
    id: 1,
    ngo_id: 1,
    ngo_name: 'World Vision',
    ngo_color: '#1E40AF',
    title: 'New Education Enrollment Open',
    content: 'Registration for new education programs is now open. Visit Community Center Block A to register your children. Bring identification documents and proof of residence in the camp.',
    priority: 'high',
    category: 'education',
    created_at: '2024-01-15T10:00:00Z'
  },
  {
    id: 2,
    ngo_id: 2,
    ngo_name: 'Plan International',
    ngo_color: '#059669',
    title: 'Youth Skills Training Program',
    content: 'New vocational training program starting next month. Limited spots available for youth aged 15-24. Training includes computer skills, tailoring, and carpentry.',
    priority: 'normal',
    category: 'youth',
    created_at: '2024-01-14T14:30:00Z'
  },
  {
    id: 3,
    ngo_id: 3,
    ngo_name: 'MINEMA',
    ngo_color: '#DC2626',
    title: 'Emergency Drill This Friday',
    content: 'Mandatory emergency preparedness drill scheduled for Friday at 2:00 PM. All residents must participate. Assembly points will be clearly marked.',
    priority: 'urgent',
    category: 'emergency',
    created_at: '2024-01-13T09:15:00Z'
  },
  {
    id: 4,
    ngo_id: 4,
    ngo_name: 'Prison Fellowship',
    ngo_color: '#7C3AED',
    title: 'Legal Aid Clinic Hours Extended',
    content: 'Legal aid consultation hours extended to better serve the community. Now available Monday through Friday, 9:00 AM to 4:00 PM.',
    priority: 'normal',
    category: 'legal',
    created_at: '2024-01-12T16:45:00Z'
  },
  {
    id: 5,
    ngo_id: 5,
    ngo_name: 'Save the Children',
    ngo_color: '#EA580C',
    title: 'Vaccination Campaign Next Week',
    content: 'Special vaccination campaign for children under 5 years old starting Monday. Please bring your child\'s health card and arrive early to avoid long queues.',
    priority: 'high',
    category: 'health',
    created_at: '2024-01-11T11:20:00Z'
  }
];

export const emergencyContacts = [
  {
    id: 1,
    name: 'MINEMA Emergency Hotline',
    phone: '+250 788 345 678',
    type: 'emergency',
    available_24_7: true
  },
  {
    id: 2,
    name: 'Health Emergency',
    phone: '+250 788 567 890',
    type: 'health',
    available_24_7: true
  },
  {
    id: 3,
    name: 'Security Office',
    phone: '+250 788 111 222',
    type: 'security',
    available_24_7: true
  },
  {
    id: 4,
    name: 'Fire Department',
    phone: '+250 788 333 444',
    type: 'fire',
    available_24_7: true
  },
  {
    id: 5,
    name: 'Camp Manager',
    phone: '+250 788 555 666',
    type: 'administration',
    available_24_7: false
  }
];

// Helper function to get all services
export const getAllServices = () => {
  return ngos.flatMap(ngo => 
    ngo.services.map(service => ({
      ...service,
      ngo_name: ngo.name,
      ngo_color: ngo.color,
      ngo_id: ngo.id
    }))
  );
};

// Helper function to get NGO by ID
export const getNGOById = (ngos, id) => {
  return ngos.find(ngo => ngo._id === id);
};

// Helper function to get services by NGO ID
export const getServicesByNGOId = (ngos, ngoId) => {
  const ngo = getNGOById(ngos, ngoId);
  return ngo ? ngo.services : [];
};