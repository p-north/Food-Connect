import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuthStore from '../../store/authStore';

interface ProfileData {
  name: string;
  email: string;
  phone: string;
  address: string;
  dietary: string[];
  notifications: {
    email: boolean;
    sms: boolean;
    push: boolean;
  };
  profileImage: string;
}

const RecipientProfile = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState<ProfileData>({
    name: '',
    email: '',
    phone: '',
    address: '',
    dietary: [],
    notifications: {
      email: true,
      sms: true,
      push: false,
    },
    profileImage: '/images/profile.jpg'
  });

  // Fetch profile data (mock)
  useEffect(() => {
    // In a real app, this would be an API call
    setTimeout(() => {
      setProfileData({
        name: user?.name || 'John Doe',
        email: user?.email || 'john@example.com',
        phone: '+1 (555) 123-4567',
        address: '123 Main St, Anytown, USA',
        dietary: ['Vegetarian', 'Nut Allergy'],
        notifications: {
          email: true,
          sms: true,
          push: false,
        },
        profileImage: '/images/profile.jpg'
      });
      setIsLoading(false);
    }, 1000);
  }, [user]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox' && name.startsWith('notification-')) {
      const notificationType = name.replace('notification-', '');
      setProfileData({
        ...profileData,
        notifications: {
          ...profileData.notifications,
          [notificationType]: checked,
        },
      });
    } else {
      setProfileData({
        ...profileData,
        [name]: value,
      });
    }
  };

  const handleSave = () => {
    // In a real app, this would make an API call to update the profile
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsEditing(false);
    }, 1000);
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div className="min-h-screen bg-green-50 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <header className="flex justify-between items-center mb-6 border-b border-gray-200 pb-4">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <svg className="h-8 w-8 text-green-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9v-2h2v2zm0-4H9V8h2v4z"/>
              </svg>
              <h1 className="ml-2 text-2xl font-bold text-gray-900">FoodConnect</h1>
            </Link>
          </div>
          <nav className="flex space-x-4">
            <Link 
              to="/recipient/dashboard" 
              className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100"
            >
              Dashboard
            </Link>
            <Link 
              to="/recipient/reservations" 
              className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100"
            >
              Reservations
            </Link>
            <button 
              onClick={handleLogout}
              className="px-3 py-2 rounded-md text-sm font-medium text-red-700 hover:bg-red-100"
            >
              Logout
            </button>
          </nav>
        </header>

        <main>
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
              <div>
                <h2 className="text-lg leading-6 font-medium text-gray-900">Profile Information</h2>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">Manage your personal details and preferences</p>
              </div>
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  <svg className="-ml-1 mr-2 h-5 w-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  Edit
                </button>
              ) : (
                <div className="flex space-x-2">
                  <button
                    onClick={() => setIsEditing(false)}
                    className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Saving...
                      </>
                    ) : (
                      <>
                        <svg className="-ml-1 mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        Save
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>
            
            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <svg className="animate-spin h-10 w-10 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </div>
            ) : (
              <>
                <div className="border-t border-gray-200">
                  <div className="flex px-4 py-5 sm:p-6">
                    <div className="mr-4">
                      <div className="h-24 w-24 rounded-full overflow-hidden bg-gray-100">
                        <img
                          src={profileData.profileImage}
                          alt={profileData.name}
                          className="h-full w-full object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = 'https://via.placeholder.com/150?text=User';
                          }}
                        />
                      </div>
                      {isEditing && (
                        <button className="mt-2 w-full text-xs text-green-600 hover:text-green-700">
                          Change photo
                        </button>
                      )}
                    </div>
                    
                    <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                          Full Name
                        </label>
                        {isEditing ? (
                          <input
                            type="text"
                            name="name"
                            id="name"
                            value={profileData.name}
                            onChange={handleInputChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                          />
                        ) : (
                          <p className="mt-1 text-sm text-gray-900">{profileData.name}</p>
                        )}
                      </div>
                      
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                          Email
                        </label>
                        {isEditing ? (
                          <input
                            type="email"
                            name="email"
                            id="email"
                            value={profileData.email}
                            onChange={handleInputChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                          />
                        ) : (
                          <p className="mt-1 text-sm text-gray-900">{profileData.email}</p>
                        )}
                      </div>
                      
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                          Phone Number
                        </label>
                        {isEditing ? (
                          <input
                            type="tel"
                            name="phone"
                            id="phone"
                            value={profileData.phone}
                            onChange={handleInputChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                          />
                        ) : (
                          <p className="mt-1 text-sm text-gray-900">{profileData.phone}</p>
                        )}
                      </div>
                      
                      <div>
                        <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                          Address
                        </label>
                        {isEditing ? (
                          <input
                            type="text"
                            name="address"
                            id="address"
                            value={profileData.address}
                            onChange={handleInputChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                          />
                        ) : (
                          <p className="mt-1 text-sm text-gray-900">{profileData.address}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
                  <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Dietary Preferences</h3>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {profileData.dietary.map((pref, idx) => (
                      <span key={idx} className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                        {pref}
                        {isEditing && (
                          <button 
                            type="button"
                            className="ml-1.5 inline-flex text-green-400 hover:text-green-600"
                            onClick={() => {
                              setProfileData({
                                ...profileData,
                                dietary: profileData.dietary.filter((_, i) => i !== idx)
                              });
                            }}
                          >
                            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        )}
                      </span>
                    ))}
                    
                    {isEditing && (
                      <button 
                        type="button"
                        className="inline-flex items-center px-3 py-1 border border-dashed border-gray-300 rounded-full text-sm font-medium text-gray-700 hover:text-gray-800 hover:border-gray-400"
                      >
                        <svg className="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                        </svg>
                        Add preference
                      </button>
                    )}
                  </div>
                </div>
                
                <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
                  <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Notification Preferences</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex items-center">
                      <input
                        id="notification-email"
                        name="notification-email"
                        type="checkbox"
                        checked={profileData.notifications.email}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                      />
                      <label htmlFor="notification-email" className="ml-2 block text-sm text-gray-900">
                        Email notifications
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        id="notification-sms"
                        name="notification-sms"
                        type="checkbox"
                        checked={profileData.notifications.sms}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                      />
                      <label htmlFor="notification-sms" className="ml-2 block text-sm text-gray-900">
                        SMS notifications
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        id="notification-push"
                        name="notification-push"
                        type="checkbox"
                        checked={profileData.notifications.push}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                      />
                      <label htmlFor="notification-push" className="ml-2 block text-sm text-gray-900">
                        Push notifications
                      </label>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default RecipientProfile; 