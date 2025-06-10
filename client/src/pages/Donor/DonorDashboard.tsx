import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DonorLayout from '../../components/layout/DonorLayout';

const DonorDashboard = () => {
  const [listings, setListings] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Load listings from localStorage on component mount
  useEffect(() => {
    const savedListings = localStorage.getItem('foodConnectListings');
    if (savedListings) {
      setListings(JSON.parse(savedListings));
    }
  }, []);

  // Filter listings based on search query
  const filteredListings = listings.filter(listing => 
    listing.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    listing.organization.toLowerCase().includes(searchQuery.toLowerCase()) ||
    listing.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleDelete = (id) => {
    const updatedListings = listings.filter(listing => listing.id !== id);
    setListings(updatedListings);
    localStorage.setItem('foodConnectListings', JSON.stringify(updatedListings));
  };

  return (
    <DonorLayout>
      <div className="scale-95 min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-32 w-80 h-80 bg-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
          <div className="absolute -bottom-40 -left-32 w-80 h-80 bg-emerald-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
        </div>

        <div className="relative z-10">
          <div className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20">
            {/* Enhanced page header */}
            <div className="bg-gradient-to-r from-green-500 to-emerald-600 px-8 py-6 rounded-t-3xl">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
                <div>
                  <h1 className="text-3xl font-bold text-white">My Listings</h1>
                  <p className="text-green-100 mt-1 text-lg">Manage and track your food donations</p>
                </div>
                
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full sm:w-auto">
                  {/* Enhanced Search Bar */}
                  <div className="relative w-full sm:w-72">
                    <input
                      type="text"
                      placeholder="Search your listings..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="block w-full pl-12 pr-4 py-3 border-2 border-white/20 rounded-2xl leading-5 bg-white/10 backdrop-blur-sm text-white placeholder-green-100 focus:outline-none focus:ring-2 focus:ring-white focus:border-white transition-all duration-300 hover:bg-white/20"
                    />
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <svg className="h-5 w-5 text-green-100" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </div>
                  </div>

                  {/* Enhanced New Listing Button */}
                  <Link
                    to="/donor/newlisting"
                    className="inline-flex items-center px-6 py-3 border-2 border-white/20 text-sm font-semibold rounded-2xl shadow-lg text-white bg-white/10 backdrop-blur-sm hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white whitespace-nowrap transition-all duration-300 transform hover:scale-105"
                  >
                    <svg className="mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    New Listing
                  </Link>
                </div>
              </div>
            </div>

            {/* Enhanced listings grid */}
            <div className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {filteredListings.length > 0 ? (
                  filteredListings.map((listing) => (
                    <div key={listing.id} className="bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg border border-white/20 transition-all duration-300 hover:shadow-2xl transform hover:-translate-y-2">
                      <div className="h-56 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                        {listing.image ? (
                          <img
                            src={listing.image}
                            alt={listing.title}
                            className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                          />
                        ) : (
                          <div className="text-gray-400 flex flex-col items-center justify-center">
                            <svg className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <p className="text-sm mt-2 font-medium">No image available</p>
                          </div>
                        )}
                      </div>
                      <div className="p-6">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h2 className="text-xl font-bold text-gray-900">{listing.title}</h2>
                            <p className="text-sm text-gray-600 font-medium">{listing.organization}</p>
                          </div>
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border border-green-200">
                            {listing.status}
                          </span>
                        </div>
                        
                        <div className="mt-4 space-y-3">
                          <div className="flex items-center text-sm text-gray-500">
                            <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            {listing.location}
                          </div>
                          <div className="flex items-center text-sm text-gray-500">
                            <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Available for {listing.duration} hours
                          </div>
                          <div className="flex items-center text-sm text-gray-500">
                            <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                            {listing.reservations || 0} Reservations
                          </div>
                        </div>
                        
                        <div className="mt-4 flex flex-wrap gap-2">
                          {listing.tags && listing.tags.map((tag) => (
                            <span key={tag} className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800 border border-gray-200">
                              {tag}
                            </span>
                          ))}
                        </div>
                        
                        <div className="mt-6 grid grid-cols-2 gap-4">
                          <Link
                            to={`/editlistings/${listing.id}`}
                            className="text-center py-3 px-4 border-2 border-gray-200 rounded-2xl shadow-lg text-sm font-semibold text-gray-700 bg-white/80 backdrop-blur-sm hover:bg-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-300 transform hover:scale-105"
                          >
                            Edit
                          </Link>
                          <button
                            onClick={() => handleDelete(listing.id)}
                            className="py-3 px-4 border-2 border-transparent rounded-2xl shadow-lg text-sm font-semibold text-red-700 bg-gradient-to-r from-red-50 to-red-100 hover:from-red-100 hover:to-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all duration-300 transform hover:scale-105"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="md:col-span-2 bg-white/80 backdrop-blur-sm rounded-3xl p-12 text-center border border-white/20 shadow-lg">
                    <div className="bg-gradient-to-br from-green-100 to-emerald-100 rounded-3xl w-24 h-24 flex items-center justify-center mx-auto mb-6">
                      <svg className="h-12 w-12 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                      </svg>
                    </div>
                    <h3 className="mt-2 text-2xl font-bold text-gray-900">No listings yet</h3>
                    <p className="mt-2 text-lg text-gray-500">Get started by creating a new listing.</p>
                    <div className="mt-8">
                      <Link
                        to="/donor/newlisting"
                        className="inline-flex items-center px-8 py-4 border-2 border-transparent text-lg font-semibold rounded-2xl shadow-xl text-white bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-300 transform hover:scale-105"
                      >
                        <svg className="mr-2 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                        New Listing
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </div>
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

export default DonorDashboard;