import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

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

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header - matching dashboard */}
      <header className="bg-white border-b border-gray-200 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Link to="/" className="flex items-center">
                <svg className="h-7 w-7 text-green-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm1-9h2a1 1 0 0 1 0 2h-2v2a1 1 0 0 1-2 0v-2H9a1 1 0 0 1 0-2h2V9a1 1 0 0 1 2 0v2z" />
                </svg>
                <span className="ml-2 text-lg font-semibold text-gray-900">FoodConnect</span>
              </Link>
            </div>
            <div className="flex items-center">
              <Link to="/donor/dashboard" className="text-sm font-medium text-green-600 hover:text-green-800">
                Back to Dashboard
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-3xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="bg-green-600 px-6 py-4">
            <h1 className="text-2xl font-bold text-white">Edit Your Profile</h1>
            <p className="text-green-100 mt-1">Update your business information and preferences</p>
          </div>
          
          <form onSubmit={handleSubmit} className="p-6">
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
  );
};

export default EditProfile;