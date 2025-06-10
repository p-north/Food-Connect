import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import DonorLayout from '../../components/layout/DonorLayout';

const NewListing = () => {
  const navigate = useNavigate();
  const [listing, setListing] = useState({
    title: '',
    organization: '',
    location: '',
    duration: 2,
    tags: [],
    status: 'Available',
    description: '',
    image: '',
    reservations: 0
  });

  const [tagInput, setTagInput] = useState('');
  const [previewImage, setPreviewImage] = useState(null);

  // Get organization name from profile if available
  useEffect(() => {
    const savedProfile = localStorage.getItem('foodConnectProfile');
    if (savedProfile) {
      const profile = JSON.parse(savedProfile);
      setListing(prev => ({
        ...prev,
        organization: profile.name || '',
        location: profile.address || ''
      }));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setListing(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setListing(prev => ({
        ...prev,
        image: URL.createObjectURL(file)
      }));
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const addTag = () => {
    if (tagInput.trim() && !listing.tags.includes(tagInput.trim())) {
      setListing(prev => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()]
      }));
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove) => {
    setListing(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTag();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Generate a unique ID
    const newId = Date.now();
    const newListing = {
      ...listing,
      id: newId
    };
    
    // Get existing listings from localStorage or initialize empty array
    const existingListings = JSON.parse(localStorage.getItem('foodConnectListings') || '[]');
    
    // Add new listing and save back to localStorage
    const updatedListings = [...existingListings, newListing];
    localStorage.setItem('foodConnectListings', JSON.stringify(updatedListings));
    
    // Navigate back to dashboard
    navigate('/donor/dashboard');
  };

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
              <h1 className="text-3xl font-bold text-white">Create New Listing</h1>
              <p className="text-green-100 mt-2 text-lg">Share your available food with those in need</p>
            </div>
            
            <form onSubmit={handleSubmit} className="p-8">
              <div className="grid grid-cols-1 gap-8">
                <div className="transform transition-all duration-300 hover:scale-105 focus-within:scale-105">
                  <label htmlFor="title" className="block text-sm font-semibold text-gray-700 mb-3">
                    Listing Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={listing.title}
                    onChange={handleChange}
                    required
                    placeholder="E.g. Fresh Bread and Pastries"
                    className="text-black block w-full rounded-2xl border-2 border-gray-200 shadow-sm py-4 px-5 focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white/80 backdrop-blur-sm transition-all duration-300 hover:bg-white"
                  />
                </div>

                <div className="transform transition-all duration-300 hover:scale-105 focus-within:scale-105">
                  <label htmlFor="organization" className="block text-sm font-semibold text-gray-700 mb-3">
                    Organization Name
                  </label>
                  <input
                    type="text"
                    id="organization"
                    name="organization"
                    value={listing.organization}
                    onChange={handleChange}
                    required
                    placeholder="Your organization or business name"
                    className="text-black block w-full rounded-2xl border-2 border-gray-200 shadow-sm py-4 px-5 focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white/80 backdrop-blur-sm transition-all duration-300 hover:bg-white"
                  />
                </div>

                <div className="transform transition-all duration-300 hover:scale-105 focus-within:scale-105">
                  <label htmlFor="location" className="block text-sm font-semibold text-gray-700 mb-3">
                    Pickup Location
                  </label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={listing.location}
                    onChange={handleChange}
                    required
                    placeholder="Street address for pickup"
                    className="text-black block w-full rounded-2xl border-2 border-gray-200 shadow-sm py-4 px-5 focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white/80 backdrop-blur-sm transition-all duration-300 hover:bg-white"
                  />
                </div>

                <div className="transform transition-all duration-300 hover:scale-105 focus-within:scale-105">
                  <label htmlFor="duration" className="block text-sm font-semibold text-gray-700 mb-3">
                    Available For (hours)
                  </label>
                  <input
                    type="number"
                    id="duration"
                    name="duration"
                    value={listing.duration}
                    onChange={handleChange}
                    min="1"
                    max="24"
                    required
                    placeholder="Example: 36"
                    className="text-black block w-full rounded-2xl border-2 border-gray-200 shadow-sm py-4 px-5 focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white/80 backdrop-blur-sm transition-all duration-300 hover:bg-white"
                  />
                </div>

                <div className="transform transition-all duration-300 hover:scale-105 focus-within:scale-105">
                  <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-3">
                    Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={listing.description}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Describe what you're offering, quantity, etc."
                    className="text-black block w-full rounded-2xl border-2 border-gray-200 shadow-sm py-4 px-5 focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white/80 backdrop-blur-sm transition-all duration-300 hover:bg-white"
                  ></textarea>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Tags
                  </label>
                  <div className="flex items-center gap-4">
                    <input
                      type="text"
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="Add food categories (e.g. Bread, Vegetables)"
                      className="text-black flex-1 rounded-2xl border-2 border-gray-200 shadow-sm py-4 px-5 focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white/80 backdrop-blur-sm transition-all duration-300 hover:bg-white"
                    />
                    <button
                      type="button"
                      onClick={addTag}
                      className="px-6 py-4 border-2 border-transparent text-sm font-semibold rounded-2xl shadow-lg text-white bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-300 transform hover:scale-105"
                    >
                      Add
                    </button>
                  </div>

                  {listing.tags.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-3">
                      {listing.tags.map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border border-green-200 shadow-sm"
                        >
                          {tag}
                          <button
                            type="button"
                            onClick={() => removeTag(tag)}
                            className="ml-2 h-5 w-5 rounded-full inline-flex items-center justify-center text-green-600 hover:text-green-900 focus:outline-none focus:text-green-900 transition-colors duration-300"
                          >
                            <span className="sr-only">Remove {tag}</span>
                            <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                              <path
                                fillRule="evenodd"
                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Upload Image
                  </label>
                  <div className="mt-1 flex justify-center px-8 pt-8 pb-8 border-2 border-gray-300 border-dashed rounded-3xl bg-white/60 backdrop-blur-sm hover:bg-white/80 transition-all duration-300">
                    <div className="space-y-2 text-center">
                      {previewImage ? (
                        <div className="mb-4">
                          <img src={previewImage} alt="Preview" className="mx-auto h-40 w-auto object-cover rounded-2xl shadow-lg" />
                        </div>
                      ) : (
                        <svg
                          className="mx-auto h-16 w-16 text-gray-400"
                          stroke="currentColor"
                          fill="none"
                          viewBox="0 0 48 48"
                        >
                          <path
                            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      )}
                      <div className="flex text-lg text-gray-600">
                        <label
                          htmlFor="file-upload"
                          className="relative cursor-pointer bg-white/80 backdrop-blur-sm rounded-xl font-semibold text-green-600 hover:text-green-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-green-500 px-4 py-2 shadow-lg border border-green-200 transition-all duration-300 transform hover:scale-105"
                        >
                          <span>Upload a file</span>
                          <input
                            id="file-upload"
                            name="file-upload"
                            type="file"
                            className="sr-only"
                            accept="image/*"
                            onChange={handleImageChange}
                          />
                        </label>
                        <p className="pl-3 py-2">or drag and drop</p>
                      </div>
                      <p className="text-sm text-gray-500">PNG, JPG, GIF up to 10MB</p>
                    </div>
                  </div>
                </div>

                <div className="pt-6 flex justify-end space-x-6">
                  <Link
                    to="/donor/dashboard"
                    className="inline-flex items-center justify-center py-4 px-8 border-2 border-gray-200 shadow-lg text-lg font-semibold rounded-2xl text-gray-700 bg-white/80 backdrop-blur-sm hover:bg-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-300 transform hover:scale-105"
                  >
                    Cancel
                  </Link>
                  <button
                    type="submit"
                    className="inline-flex justify-center py-4 px-8 border-2 border-transparent shadow-xl text-lg font-semibold rounded-2xl text-white bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-300 transform hover:scale-105"
                  >
                    Create Listing
                  </button>
                </div>
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

export default NewListing;