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

    
    <div className="bg-gray-50 min-h-screen">
     

      <div className="max-w-3xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="bg-green-600 px-6 py-4">
            <h1 className="text-2xl font-bold text-white">Edit Your Profile</h1>
            <p className="text-green-100 mt-1">Update your business information and preferences</p>
          </div>
          
          <form onSubmit={handleSubmit} className="p-6">

          <h2 className="text-sm font-medium text-gray-900 mb-2">Profile Image</h2>
            <div className="mt-2 flex items-center">
              {profileImage ? (
                <img
                  src={URL.createObjectURL(profileImage)}
                  alt="Profile"
                  className="h-20 w-20 rounded-full object-cover"
                />
              ) : (
                <div className="h-20 w-20 rounded-full bg-gray-100 flex items-center justify-center text-xl text-gray-600">
                  {profile.name.charAt(0)}
                </div>
              )}
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Upload Image
              </label>
              <div
                className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed border-gray-300 rounded-md"
              >
                <div className="space-y-1 text-center">
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400"
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
                  <div className="flex text-sm text-gray-600 justify-center">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer bg-white rounded-md font-medium text-green-600 hover:text-green-500 focus-within:outline-none"
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
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                </div>
              </div>
            </div>


            <div className="mb-8">
              <h2 className="text-lg font-semibold mb-4 pb-2 border-b border-gray-200 text-green-700">
                Business Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Business Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={profile.name}
                    onChange={handleChange}
                    required
                    placeholder="Your organization or business name"
                    className="text-black w-full border-gray-300 rounded-lg shadow-sm focus:ring-green-500 focus:border-green-500"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={profile.address}
                    onChange={handleChange}
                    required
                    placeholder="What is your main address?"
                    className="text-black w-full border-gray-300 rounded-lg shadow-sm focus:ring-green-500 focus:border-green-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    City
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={profile.city}
                    onChange={handleChange}
                    required
                    placeholder="Ex: Vancouver"
                    className="text-black w-full border-gray-300 rounded-lg shadow-sm focus:ring-green-500 focus:border-green-500"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      State/Province
                    </label>
                    <input
                      type="text"
                      name="state"
                      value={profile.state}
                      onChange={handleChange}
                      required
                      placeholder="Ex: BC"
                      className="text-black w-full border-gray-300 rounded-lg shadow-sm focus:ring-green-500 focus:border-green-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      ZIP/Postal Code
                    </label>
                    <input
                      type="text"
                      name="zip"
                      value={profile.zip}
                      onChange={handleChange}
                      required
                      className="text-black w-full border-gray-300 rounded-lg shadow-sm focus:ring-green-500 focus:border-green-500"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-lg font-semibold mb-4 pb-2 border-b border-gray-200 text-green-700">
                Contact Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={profile.phone}
                    onChange={handleChange}
                    required
                    placeholder="Ex: xxx-xxx-xxxx"
                    className="text-black w-full border-gray-300 rounded-lg shadow-sm focus:ring-green-500 focus:border-green-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={profile.email}
                    onChange={handleChange}
                    required
                    placeholder="youremail@example.com"
                    className="text-black w-full border-gray-300 rounded-lg shadow-sm focus:ring-green-500 focus:border-green-500"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Website (Optional)
                  </label>
                  <div className="flex rounded-md shadow-sm">
                    <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                      https://
                    </span>
                    <input
                      type="text"
                      name="website"
                      value={profile.website}
                      onChange={handleChange}
                      placeholder="www.yourwebsite.com"
                      className="text-black flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md border-gray-300 focus:ring-green-500 focus:border-green-500"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-lg font-semibold mb-4 pb-2 border-b border-gray-200 text-green-700">
                About Your Business
              </h2>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  name="description"
                  value={profile.description}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Describe who you are, about you, what you offer etc."
                  className="text-black w-full border-gray-300 rounded-lg shadow-sm focus:ring-green-500 focus:border-green-500"
                />
                <p className="text-sm text-gray-500 mt-1">
                  Tell recipients about your business and the types of food you typically donate.
                </p>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-6 flex justify-end space-x-4">
              <button 
                type="button" 
                onClick={() => navigate('/donor/dashboard')}
                className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 shadow-sm transition duration-150"
              >
                Cancel
              </button>
              <button 
                type="submit"
                className="px-6 py-2 border border-transparent rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-150"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
    </DonorLayout>
  );
};

export default EditProfile;