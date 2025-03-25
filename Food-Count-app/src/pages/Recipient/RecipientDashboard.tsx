import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// import useAuthStore from '../../store/authStore';
// import MapView from '../../components/Map/MapView';

interface FoodListing {
  id: string;
  title: string;
  location: string;
  distance: string;
  availableFor: string;
  tags: string[];
  provider: string;
  image: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

const RecipientDashboard = () => {
  // const { user } = useAuthStore();
  const [foodListings, setFoodListings] = useState<FoodListing[]>([]);
  // const [distance, setDistance] = useState<string>("5 miles");
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  // const [selectedListing, setSelectedListing] = useState<FoodListing | null>(null);

  // Mock data for demonstration
  useEffect(() => {
    // In a real app, this would be an API call
    const mockListings: FoodListing[] = [
      {
        id: '1',
        title: 'Fresh Bread and Pastries',
        provider: 'City Bakery',
        location: '123 Main St',
        distance: '0.8 miles',
        availableFor: '2 hours',
        tags: ['Croissants', 'Baguettes', 'Danish Pastries'],
        image: '/images/bread.jpg',
        coordinates: {
          lat: 40.7128,
          lng: -74.0060
        }
      },
      {
        id: '2',
        title: 'Surplus Produce',
        provider: 'Green Market',
        location: '456 Oak Ave',
        distance: '1.2 miles',
        availableFor: '3 hours',
        tags: ['Tomatoes', 'Lettuce', 'Carrots', 'Apples'],
        image: '/images/produce.jpg',
        coordinates: {
          lat: 40.7312,
          lng: -73.9890
        }
      },
      {
        id: '3',
        title: 'Prepared Meals',
        provider: 'Community Kitchen',
        location: '789 Pine St',
        distance: '2.4 miles',
        availableFor: '4 hours',
        tags: ['Soups', 'Sandwiches', 'Salads'],
        image: '/images/meals.jpg',
        coordinates: {
          lat: 40.7415,
          lng: -73.9987
        }
      }
    ];

    setTimeout(() => {
      setFoodListings(mockListings);
      setIsLoading(false);
    }, 1000); // Simulate network delay
  }, []);

  // const handleListingSelect = (listing: FoodListing) => {
  //   setSelectedListing(listing);
  //   // On mobile, we might want to scroll to the selection or show a modal
  // };

  return (
    <div className="min-h-screen bg-green-50 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <header className="flex justify-between items-center mb-6 border-b border-gray-200 pb-4">
          <div className="flex items-center">
            {/* <svg className="h-8 w-8 text-green-500" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9v-2h2v2zm0-4H9V8h2v4z"/>
            </svg> */}
            {/* <h1 className="ml-2 text-2xl font-bold text-gray-900">FoodConnect</h1> */}
          </div>
          <div className="flex items-center space-x-4">
            {/* <button className="p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none">
              <span className="sr-only">Notifications</span>
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </button> */}
            <Link to="/recipient/profile" className="flex items-center">
              {/* <img className="h-8 w-8 rounded-full" src="/images/profile.jpg" alt={user?.name || "User"} /> */}
              {/* <span className="ml-2 text-gray-700">{user?.name || "John Doe"}</span> */}
            </Link>
          </div>
        </header>

        <nav className="mb-6">
          <div className="border-b border-gray-200">
            <div className="-mb-px flex space-x-8">
              <button className="py-4 px-1 border-b-2 border-green-500 font-medium text-sm text-green-600">
                Available Now
              </button>
              <Link to="/recipient/reservations" className="py-4 px-1 border-b-2 border-transparent font-medium text-sm text-gray-500 hover:text-gray-700 hover:border-gray-300">
                My Reservations
              </Link>
            </div>
          </div>
        </nav>

        <div className="mb-6 flex flex-wrap items-center justify-between">
          <div className="flex space-x-2 mb-2 sm:mb-0">
            <button className="flex items-center px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
              <svg className="h-4 w-4 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
              Filter
            </button>
            <button className="flex items-center px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
              <svg className="h-4 w-4 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {/* Within {distance} */}
            </button>
            
            {/* View mode toggle */}
            <div className="bg-white border border-gray-300 rounded-md shadow-sm">
              <div className="flex divide-x divide-gray-300">
                <button
                  onClick={() => setViewMode('list')}
                  className={`px-3 py-2 text-sm font-medium ${
                    viewMode === 'list'
                      ? 'bg-green-50 text-green-700'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                  </svg>
                </button>
                <button
                  onClick={() => setViewMode('map')}
                  className={`px-3 py-2 text-sm font-medium ${
                    viewMode === 'map'
                      ? 'bg-green-50 text-green-700'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
          <div className="text-gray-500 text-sm">
            Showing {foodListings.length} results
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <svg className="animate-spin h-10 w-10 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
        ) : viewMode === 'map' ? (
          <div className="rounded-lg overflow-hidden shadow-md mb-6">
            {/* <MapView 
              listings={foodListings} 
              onSelectListing={handleListingSelect} 
            /> */}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {foodListings.map((listing) => (
              <div 
                key={listing.id} 
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <div className="h-48 w-full bg-gray-200">
                  <img 
                    src={listing.image} 
                    alt={listing.title}
                    className="h-full w-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = 'https://via.placeholder.com/400x200?text=Food+Image';
                    }}
                  />
                </div>
                <div className="p-4">
                  <div className="flex justify-between">
                    <h3 className="text-lg font-bold text-gray-900">{listing.title}</h3>
                    <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">Available</span>
                  </div>
                  <p className="mt-1 text-gray-600">{listing.provider}</p>
                  <div className="mt-4 flex items-center text-sm text-gray-500">
                    <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <p>{listing.location} • {listing.distance}</p>
                  </div>
                  <div className="mt-2 flex items-center text-sm text-gray-500">
                    <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p>Available for {listing.availableFor}</p>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {listing.tags.map((tag, index) => (
                      <span key={index} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="mt-4 flex space-x-2">
                    <a 
                      href={`https://www.google.com/maps/search/?api=1&query=${listing.coordinates.lat},${listing.coordinates.lng}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex justify-center items-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                    >
                      <svg className="mr-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      Directions
                    </a>
                    <button className="flex-1 flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                      Reserve
                      <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default RecipientDashboard; 