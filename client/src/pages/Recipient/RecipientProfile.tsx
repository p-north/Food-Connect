import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuthStore from '../../store/authStore';
import RecipientLayout from '../../components/layout/RecipientLayout';
import { Avatar, AvatarFallback } from '../../components/ui/avatar';
import { getUserInitials, generateDynamicColor } from '../../lib/helpers';

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
  // const userData = localStorage.getItem('user');
  console.log(user);

  const initials = getUserInitials(user?.name || 'John Doe');

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
    <RecipientLayout>
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-32 w-80 h-80 bg-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
          <div className="absolute -bottom-40 -left-32 w-80 h-80 bg-emerald-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <div className="bg-white/90 backdrop-blur-lg shadow-2xl overflow-hidden rounded-3xl border border-white/20">
            <div className="bg-gradient-to-r from-green-500 to-emerald-600 px-8 py-6">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-3xl leading-6 font-bold text-white">Profile Information</h2>
                  <p className="mt-2 max-w-2xl text-lg text-green-100">Manage your personal details and preferences</p>
                </div>
                {!isEditing ? (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="inline-flex items-center px-6 py-3 border-2 border-white/20 rounded-xl shadow-lg text-sm font-semibold text-white bg-white/10 backdrop-blur-sm hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white transition-all duration-300 transform hover:scale-105"
                  >
                    <svg className="-ml-1 mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    Edit
                  </button>
                ) : (
                  <div className="flex space-x-4">
                    <button
                      onClick={() => setIsEditing(false)}
                      className="inline-flex items-center px-6 py-3 border-2 border-white/30 rounded-xl shadow-lg text-sm font-semibold text-white bg-white/10 backdrop-blur-sm hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white transition-all duration-300"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSave}
                      className="inline-flex items-center px-6 py-3 border-2 border-transparent rounded-xl shadow-lg text-sm font-semibold text-green-600 bg-white hover:bg-green-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-300 transform hover:scale-105"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
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
            </div>

            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <svg className="animate-spin h-12 w-12 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </div>
            ) : (
              <>
                <div className="bg-white/50 backdrop-blur-sm border-t border-white/20">
                  <div className="flex px-8 py-8">
                    <div className="mr-6">
                      <div
                        className="h-28 w-28 rounded-full overflow-hidden shadow-xl border-4 border-white/50"
                        style={{ backgroundColor: generateDynamicColor(initials) }}
                      >
                        <Avatar className="h-full w-full">
                          <AvatarFallback className="text-2xl font-bold">{initials}</AvatarFallback>
                        </Avatar>
                      </div>
                      {isEditing && (
                        <button className="mt-3 w-full text-sm text-green-600 hover:text-green-700 font-semibold transition-colors duration-300">
                          Change photo
                        </button>
                      )}
                    </div>

                    <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="transform transition-all duration-300 hover:scale-105 focus-within:scale-105">
                        <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                          Name
                        </label>
                        {isEditing ? (
                          <input
                            type="text"
                            name="name"
                            id="name"
                            value={profileData.name}
                            onChange={handleInputChange}
                            className="block w-full border-2 border-gray-200 rounded-xl shadow-sm py-3 px-4 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-900 bg-white/80 backdrop-blur-sm transition-all duration-300"
                          />
                        ) : (
                          <div className="bg-white/60 backdrop-blur-sm rounded-xl py-3 px-4 border border-gray-200">
                            <p className="text-gray-900 font-medium">{profileData.name}</p>
                          </div>
                        )}
                      </div>

                      <div className="transform transition-all duration-300 hover:scale-105 focus-within:scale-105">
                        <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                          Email
                        </label>
                        {isEditing ? (
                          <input
                            type="email"
                            name="email"
                            id="email"
                            value={profileData.email}
                            onChange={handleInputChange}
                            className="block w-full border-2 border-gray-200 rounded-xl shadow-sm py-3 px-4 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-900 bg-white/80 backdrop-blur-sm transition-all duration-300"
                          />
                        ) : (
                          <div className="bg-white/60 backdrop-blur-sm rounded-xl py-3 px-4 border border-gray-200">
                            <p className="text-gray-900 font-medium">{profileData.email}</p>
                          </div>
                        )}
                      </div>

                      <div className="transform transition-all duration-300 hover:scale-105 focus-within:scale-105">
                        <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                          Phone Number
                        </label>
                        {isEditing ? (
                          <input
                            type="tel"
                            name="phone"
                            id="phone"
                            value={profileData.phone}
                            onChange={handleInputChange}
                            className="block w-full border-2 border-gray-200 rounded-xl shadow-sm py-3 px-4 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-900 bg-white/80 backdrop-blur-sm transition-all duration-300"
                          />
                        ) : (
                          <div className="bg-white/60 backdrop-blur-sm rounded-xl py-3 px-4 border border-gray-200">
                            <p className="text-gray-900 font-medium">{profileData.phone}</p>
                          </div>
                        )}
                      </div>

                      <div className="transform transition-all duration-300 hover:scale-105 focus-within:scale-105">
                        <label htmlFor="address" className="block text-sm font-semibold text-gray-700 mb-2">
                          Address
                        </label>
                        {isEditing ? (
                          <input
                            type="text"
                            name="address"
                            id="address"
                            value={profileData.address}
                            onChange={handleInputChange}
                            className="block w-full border-2 border-gray-200 rounded-xl shadow-sm py-3 px-4 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-900 bg-white/80 backdrop-blur-sm transition-all duration-300"
                          />
                        ) : (
                          <div className="bg-white/60 backdrop-blur-sm rounded-xl py-3 px-4 border border-gray-200">
                            <p className="text-gray-900 font-medium">{profileData.address}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white/30 backdrop-blur-sm border-t border-white/20 px-8 py-8">
                  <h3 className="text-xl leading-6 font-bold text-gray-900 mb-6">Dietary Preferences</h3>
                  <div className="flex flex-wrap gap-3 mt-2">
                    {profileData.dietary.map((pref, idx) => (
                      <span key={idx} className="inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border border-green-200 shadow-sm">
                        {pref}
                        {isEditing && (
                          <button
                            type="button"
                            className="ml-2 inline-flex text-green-600 hover:text-green-800 transition-colors duration-300"
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
                        className="inline-flex items-center px-4 py-2 border-2 border-dashed border-green-300 rounded-full text-sm font-semibold text-green-700 hover:text-green-800 hover:border-green-400 bg-white/60 backdrop-blur-sm transition-all duration-300 transform hover:scale-105"
                      >
                        <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                        </svg>
                        Add preference
                      </button>
                    )}
                  </div>
                </div>

                <div className="bg-white/20 backdrop-blur-sm border-t border-white/20 px-8 py-8">
                  <h3 className="text-xl leading-6 font-bold text-gray-900 mb-6">Notification Preferences</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="flex items-center bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-white/30 shadow-sm">
                      <input
                        id="notification-email"
                        name="notification-email"
                        type="checkbox"
                        checked={profileData.notifications.email}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className="h-5 w-5 text-green-600 focus:ring-green-500 border-gray-300 rounded-lg"
                      />
                      <label htmlFor="notification-email" className="ml-3 block text-sm font-semibold text-gray-900">
                        Email notifications
                      </label>
                    </div>
                    <div className="flex items-center bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-white/30 shadow-sm">
                      <input
                        id="notification-sms"
                        name="notification-sms"
                        type="checkbox"
                        checked={profileData.notifications.sms}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className="h-5 w-5 text-green-600 focus:ring-green-500 border-gray-300 rounded-lg"
                      />
                      <label htmlFor="notification-sms" className="ml-3 block text-sm font-semibold text-gray-900">
                        SMS notifications
                      </label>
                    </div>
                    <div className="flex items-center bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-white/30 shadow-sm">
                      <input
                        id="notification-push"
                        name="notification-push"
                        type="checkbox"
                        checked={profileData.notifications.push}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className="h-5 w-5 text-green-600 focus:ring-green-500 border-gray-300 rounded-lg"
                      />
                      <label htmlFor="notification-push" className="ml-3 block text-sm font-semibold text-gray-900">
                        Push notifications
                      </label>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Enhanced CSS animations */}
        <style>{`
          .backdrop-blur-lg {
            backdrop-filter: blur(16px);
          }
          
          .backdrop-blur-sm {
            backdrop-filter: blur(8px);
          }
        `}</style>
      </div>
    </RecipientLayout>
  );
};
export default RecipientProfile;