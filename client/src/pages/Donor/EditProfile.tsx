import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import DonorLayout from '../../components/layout/DonorLayout';

const EditProfile = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState({
    name: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    phone: '',
    email: '',
    description: '',
    website: ''
  });

  const [previewImage, setPreviewImage] = useState(() => {
    return localStorage.getItem('profileImage') || '';
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreviewImage(imageUrl);
      localStorage.setItem('profileImage', imageUrl);
    }
  };

  // Load profile from localStorage on component mount
  useEffect(() => {
    const savedProfile = localStorage.getItem('foodConnectProfile');
    if (savedProfile) {
      setProfile(JSON.parse(savedProfile));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Save to localStorage
    localStorage.setItem('foodConnectProfile', JSON.stringify(profile));
    navigate('/donor/dashboard');
  };

  const [profileImage, setProfileImage] = useState<File | null>(null);

  return (
    <DonorLayout>
      <div className="scale-95 min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-32 w-80 h-80 bg-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
          <div className="absolute -bottom-40 -left-32 w-80 h-80 bg-emerald-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <div className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden border border-white/20">
            <div className="bg-gradient-to-r from-green-500 to-emerald-600 px-8 py-6">
              <h1 className="text-3xl font-bold text-white">Edit Your Profile</h1>
              <p className="text-green-100 mt-2 text-lg">Update your business information and preferences</p>
            </div>
            
            <form onSubmit={handleSubmit} className="p-8">
              <div className="mb-10">
                <h2 className="text-lg font-bold text-gray-900 mb-4">Profile Image</h2>
                <div className="flex items-center gap-6">
                  {profileImage ? (
                    <img
                      src={URL.createObjectURL(profileImage)}
                      alt="Profile"
                      className="h-24 w-24 rounded-full object-cover shadow-xl border-4 border-white/50"
                    />
                  ) : (
                    <div className="h-24 w-24 rounded-full bg-gradient-to-r from-green-100 to-emerald-100 border-4 border-white/50 shadow-xl flex items-center justify-center text-2xl font-bold text-green-700">
                      {profile.name.charAt(0)}
                    </div>
                  )}
                  
                  <div className="flex-1">
                    <div className="bg-white/60 backdrop-blur-sm border-2 border-dashed border-green-300 rounded-2xl p-6">
                      <div className="text-center">
                        <svg
                          className="mx-auto h-12 w-12 text-green-400"
                          stroke="currentColor"
                          fill="none"
                          viewBox="0 0 48 48"
                          aria-hidden="true"
                        >
                          <path
                            d="M14 22l10 10 10-10M24 32V12"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <div className="mt-2">
                          <label
                            htmlFor="file-upload"
                            className="cursor-pointer bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-semibold px-6 py-3 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 inline-block"
                          >
                            <span>Upload a file</span>
                            <input
                              id="file-upload"
                              name="file-upload"
                              type="file"
                              className="sr-only"
                              onChange={(e) => {
                                if (e.target.files && e.target.files[0]) {
                                  setProfileImage(e.target.files[0]);
                                }
                              }}
                            />
                          </label>
                        </div>
                        <p className="text-sm text-gray-500 mt-2">PNG, JPG, GIF up to 10MB</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-10">
                <h2 className="text-2xl font-bold mb-6 pb-3 border-b-2 border-green-200 text-green-700">
                  Business Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                  <div className="md:col-span-2 transform transition-all duration-300 hover:scale-105 focus-within:scale-105">
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Business Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={profile.name}
                      onChange={handleChange}
                      required
                      placeholder="Your organization or business name"
                      className="text-black w-full border-2 border-gray-200 rounded-2xl shadow-sm py-4 px-5 focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white/80 backdrop-blur-sm transition-all duration-300 hover:bg-white"
                    />
                  </div>
                  <div className="md:col-span-2 transform transition-all duration-300 hover:scale-105 focus-within:scale-105">
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Address
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={profile.address}
                      onChange={handleChange}
                      required
                      placeholder="What is your main address?"
                      className="text-black w-full border-2 border-gray-200 rounded-2xl shadow-sm py-4 px-5 focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white/80 backdrop-blur-sm transition-all duration-300 hover:bg-white"
                    />
                  </div>
                  <div className="transform transition-all duration-300 hover:scale-105 focus-within:scale-105">
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      City
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={profile.city}
                      onChange={handleChange}
                      required
                      placeholder="Ex: Vancouver"
                      className="text-black w-full border-2 border-gray-200 rounded-2xl shadow-sm py-4 px-5 focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white/80 backdrop-blur-sm transition-all duration-300 hover:bg-white"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="transform transition-all duration-300 hover:scale-105 focus-within:scale-105">
                      <label className="block text-sm font-semibold text-gray-700 mb-3">
                        State/Province
                      </label>
                      <input
                        type="text"
                        name="state"
                        value={profile.state}
                        onChange={handleChange}
                        required
                        placeholder="Ex: BC"
                        className="text-black w-full border-2 border-gray-200 rounded-2xl shadow-sm py-4 px-5 focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white/80 backdrop-blur-sm transition-all duration-300 hover:bg-white"
                      />
                    </div>
                    <div className="transform transition-all duration-300 hover:scale-105 focus-within:scale-105">
                      <label className="block text-sm font-semibold text-gray-700 mb-3">
                        ZIP/Postal Code
                      </label>
                      <input
                        type="text"
                        name="zip"
                        value={profile.zip}
                        onChange={handleChange}
                        required
                        className="text-black w-full border-2 border-gray-200 rounded-2xl shadow-sm py-4 px-5 focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white/80 backdrop-blur-sm transition-all duration-300 hover:bg-white"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-10">
                <h2 className="text-2xl font-bold mb-6 pb-3 border-b-2 border-green-200 text-green-700">
                  Contact Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                  <div className="transform transition-all duration-300 hover:scale-105 focus-within:scale-105">
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={profile.phone}
                      onChange={handleChange}
                      required
                      placeholder="Ex: xxx-xxx-xxxx"
                      className="text-black w-full border-2 border-gray-200 rounded-2xl shadow-sm py-4 px-5 focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white/80 backdrop-blur-sm transition-all duration-300 hover:bg-white"
                    />
                  </div>
                  <div className="transform transition-all duration-300 hover:scale-105 focus-within:scale-105">
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={profile.email}
                      onChange={handleChange}
                      required
                      placeholder="youremail@example.com"
                      className="text-black w-full border-2 border-gray-200 rounded-2xl shadow-sm py-4 px-5 focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white/80 backdrop-blur-sm transition-all duration-300 hover:bg-white"
                    />
                  </div>
                  <div className="md:col-span-2 transform transition-all duration-300 hover:scale-105 focus-within:scale-105">
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Website (Optional)
                    </label>
                    <div className="flex rounded-2xl shadow-sm overflow-hidden">
                      <span className="inline-flex items-center px-5 border border-r-0 border-gray-200 bg-gray-50 text-gray-500 font-medium">
                        https://
                      </span>
                      <input
                        type="text"
                        name="website"
                        value={profile.website}
                        onChange={handleChange}
                        placeholder="www.yourwebsite.com"
                        className="text-black flex-1 min-w-0 block w-full px-5 py-4 border-2 border-l-0 border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white/80 backdrop-blur-sm transition-all duration-300 hover:bg-white"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-10">
                <h2 className="text-2xl font-bold mb-6 pb-3 border-b-2 border-green-200 text-green-700">
                  About Your Business
                </h2>
                <div className="transform transition-all duration-300 hover:scale-105 focus-within:scale-105">
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={profile.description}
                    onChange={handleChange}
                    rows={5}
                    placeholder="Describe who you are, about you, what you offer etc."
                    className="text-black w-full border-2 border-gray-200 rounded-2xl shadow-sm py-4 px-5 focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white/80 backdrop-blur-sm transition-all duration-300 hover:bg-white"
                  />
                  <p className="text-sm text-gray-500 mt-2">
                    Tell recipients about your business and the types of food you typically donate.
                  </p>
                </div>
              </div>

              <div className="border-t-2 border-gray-200 pt-8 flex justify-end space-x-6">
                <button 
                  type="button" 
                  onClick={() => navigate('/donor/dashboard')}
                  className="px-8 py-4 border-2 border-gray-200 rounded-2xl text-gray-700 bg-white/80 backdrop-blur-sm hover:bg-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 shadow-lg transition-all duration-300 transform hover:scale-105 font-semibold text-lg"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="px-8 py-4 border-2 border-transparent rounded-2xl shadow-xl text-white bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-300 transform hover:scale-105 font-semibold text-lg"
                >
                  Save Changes
                </button>
              </div>
            </form>
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
    </DonorLayout>
  );
};

export default EditProfile;