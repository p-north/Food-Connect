import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

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
            <h1 className="text-2xl font-bold text-white">Create New Listing</h1>
            <p className="text-green-100 mt-1">Share your available food with those in need</p>
          </div>
          
          <form onSubmit={handleSubmit} className="p-6">
            <div className="grid grid-cols-1 gap-6">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
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
                  className="text-black block w-full rounded-md border-gray-300 shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
                />
              </div>

              <div>
                <label htmlFor="organization" className="block text-sm font-medium text-gray-700 mb-1">
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
                  className="text-black block w-full rounded-md border-gray-300 shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
                />
              </div>

              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
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
                  className="text-black block w-full rounded-md border-gray-300 shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
                />
              </div>

              <div>
                <label htmlFor="duration" className="block text-sm font-medium text-gray-700 mb-1">
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
                  className="text-black block w-full rounded-md border-gray-300 shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
                />
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={listing.description}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Describe what you're offering, quantity, etc."
                  className="text-black block w-full rounded-md border-gray-300 shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tags
                </label>
                <div className="flex items-center">
                  <input
                    type="text"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Add food categories (e.g. Bread, Vegetables)"
                    className="text-black block w-full rounded-md border-gray-300 shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
                  />
                  <button
                    type="button"
                    onClick={addTag}
                    className="ml-2 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  >
                    Add
                  </button>
                </div>

                {listing.tags.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {listing.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-green-100 text-green-800"
                      >
                        {tag}
                        <button
                          type="button"
                          onClick={() => removeTag(tag)}
                          className="ml-1.5 h-4 w-4 rounded-full inline-flex items-center justify-center text-green-600 hover:text-green-900 focus:outline-none focus:text-green-900"
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
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Upload Image
                </label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                  <div className="space-y-1 text-center">
                    {previewImage ? (
                      <div className="mb-3">
                        <img src={previewImage} alt="Preview" className="mx-auto h-32 w-auto object-cover rounded" />
                      </div>
                    ) : (
                      <svg
                        className="mx-auto h-12 w-12 text-gray-400"
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
                    <div className="flex text-sm text-gray-600">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer bg-white rounded-md font-medium text-green-600 hover:text-green-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-green-500"
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
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                  </div>
                </div>
              </div>

              <div className="pt-4 flex justify-end space-x-3">
                <Link
                  to="/donor/dashboard"
                  className="inline-flex items-center justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  Cancel
                </Link>
                <button
                  type="submit"
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  Create Listing
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewListing;