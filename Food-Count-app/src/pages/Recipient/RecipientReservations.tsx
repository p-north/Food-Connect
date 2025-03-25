import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// import useAuthStore from '../../store/authStore';

interface Reservation {
  id: string;
  title: string;
  provider: string;
  location: string;
  pickupTime: string;
  status: 'confirmed' | 'pending' | 'completed' | 'cancelled';
  items: string[];
  image: string;
}

const RecipientReservations = () => {
  // const { user } = useAuthStore();
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');

  // Mock data for demonstration
  useEffect(() => {
    // In a real app, this would be an API call
    const mockReservations: Reservation[] = [
      {
        id: '1',
        title: 'Fresh Bread and Pastries',
        provider: 'City Bakery',
        location: '123 Main St',
        pickupTime: 'Today, 5:00 PM - 6:00 PM',
        status: 'confirmed',
        items: ['2 Croissants', '1 Baguette', '3 Danish Pastries'],
        image: '/images/bread.jpg'
      },
      {
        id: '2',
        title: 'Surplus Produce',
        provider: 'Green Market',
        location: '456 Oak Ave',
        pickupTime: 'Tomorrow, 2:00 PM - 3:00 PM',
        status: 'pending',
        items: ['Tomatoes (2 lbs)', 'Lettuce (1 head)', 'Carrots (1 bunch)', 'Apples (4)'],
        image: '/images/produce.jpg'
      },
      {
        id: '3',
        title: 'Prepared Meals',
        provider: 'Community Kitchen',
        location: '789 Pine St',
        pickupTime: 'Yesterday, 12:00 PM - 1:00 PM',
        status: 'completed',
        items: ['Vegetable Soup (1 qt)', 'Sandwich (2)', 'Green Salad (1)'],
        image: '/images/meals.jpg'
      },
      {
        id: '4',
        title: 'Bakery Goods',
        provider: 'Sweet Treats',
        location: '567 Cherry Lane',
        pickupTime: 'Last Week, 4:00 PM - 5:00 PM',
        status: 'cancelled',
        items: ['Muffins (3)', 'Cookies (6)', 'Brownies (2)'],
        image: '/images/bakery.jpg'
      }
    ];

    setTimeout(() => {
      setReservations(mockReservations);
      setIsLoading(false);
    }, 1000); // Simulate network delay
  }, []);

  const upcomingReservations = reservations.filter(
    res => res.status === 'confirmed' || res.status === 'pending'
  );
  
  const pastReservations = reservations.filter(
    res => res.status === 'completed' || res.status === 'cancelled'
  );

  const getStatusBadge = (status: Reservation['status']) => {
    switch (status) {
      case 'confirmed':
        return (
          <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
            Confirmed
          </span>
        );
      case 'pending':
        return (
          <span className="px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">
            Pending
          </span>
        );
      case 'completed':
        return (
          <span className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
            Completed
          </span>
        );
      case 'cancelled':
        return (
          <span className="px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">
            Cancelled
          </span>
        );
    }
  };

  const handleCancelReservation = (id: string) => {
    // In a real app, this would be an API call
    setIsLoading(true);
    setTimeout(() => {
      setReservations(
        reservations.map(res => 
          res.id === id ? { ...res, status: 'cancelled' } : res
        )
      );
      setIsLoading(false);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-green-50 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <header className="flex justify-between items-center mb-6 border-b border-gray-200 pb-4">
          <div className="flex items-center">
            <svg className="h-8 w-8 text-green-500" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9v-2h2v2zm0-4H9V8h2v4z"/>
            </svg>
            <h1 className="ml-2 text-2xl font-bold text-gray-900">FoodConnect</h1>
          </div>
          <div className="flex items-center space-x-4">
            <button className="p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none">
              <span className="sr-only">Notifications</span>
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </button>
            <Link to="/recipient/profile" className="flex items-center">
              {/* <img className="h-8 w-8 rounded-full" src="/images/profile.jpg" alt={user?.name || "User"} />
              <span className="ml-2 text-gray-700">{user?.name || "John Doe"}</span> */}
            </Link>
          </div>
        </header>

        <nav className="mb-6">
          <div className="border-b border-gray-200">
            <div className="-mb-px flex space-x-8">
              <Link 
                to="/recipient/dashboard"
                className="py-4 px-1 border-b-2 border-transparent font-medium text-sm text-gray-500 hover:text-gray-700 hover:border-gray-300"
              >
                Available Now
              </Link>
              <button className="py-4 px-1 border-b-2 border-green-500 font-medium text-sm text-green-600">
                My Reservations
              </button>
            </div>
          </div>
        </nav>

        <div className="mb-6">
          <div className="border-b border-gray-200">
            <div className="-mb-px flex">
              <button
                onClick={() => setActiveTab('upcoming')}
                className={`mr-8 py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'upcoming'
                    ? 'border-green-500 text-green-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Upcoming ({upcomingReservations.length})
              </button>
              <button
                onClick={() => setActiveTab('past')}
                className={`mr-8 py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'past'
                    ? 'border-green-500 text-green-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Past ({pastReservations.length})
              </button>
            </div>
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <svg className="animate-spin h-10 w-10 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
        ) : (
          <div className="space-y-6">
            {(activeTab === 'upcoming' ? upcomingReservations : pastReservations).length === 0 ? (
              <div className="text-center py-12">
                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                <h3 className="mt-2 text-sm font-medium text-gray-900">No {activeTab} reservations</h3>
                {activeTab === 'upcoming' && (
                  <p className="mt-1 text-sm text-gray-500">Browse available food to make a reservation.</p>
                )}
                {activeTab === 'upcoming' && (
                  <div className="mt-6">
                    <Link
                      to="/recipient/dashboard"
                      className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                    >
                      Browse available food
                    </Link>
                  </div>
                )}
              </div>
            ) : (
              (activeTab === 'upcoming' ? upcomingReservations : pastReservations).map((reservation) => (
                <div key={reservation.id} className="bg-white shadow overflow-hidden sm:rounded-lg">
                  <div className="md:flex">
                    <div className="md:flex-shrink-0 h-48 w-full md:w-48 bg-gray-200">
                      <img
                        src={reservation.image}
                        alt={reservation.title}
                        className="h-full w-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = 'https://via.placeholder.com/400x200?text=Food+Image';
                        }}
                      />
                    </div>
                    <div className="p-6 flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-lg font-bold text-gray-900">{reservation.title}</h3>
                          <p className="mt-1 text-gray-600">{reservation.provider}</p>
                        </div>
                        {getStatusBadge(reservation.status)}
                      </div>
                      
                      <div className="mt-4 flex items-center text-sm text-gray-500">
                        <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <p>{reservation.location}</p>
                      </div>
                      
                      <div className="mt-2 flex items-center text-sm text-gray-500">
                        <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <p>Pickup: {reservation.pickupTime}</p>
                      </div>
                      
                      <div className="mt-4">
                        <h4 className="text-sm font-medium text-gray-900">Items:</h4>
                        <ul className="mt-2 pl-5 list-disc text-sm text-gray-600 space-y-1">
                          {reservation.items.map((item, idx) => (
                            <li key={idx}>{item}</li>
                          ))}
                        </ul>
                      </div>
                      
                      {reservation.status === 'confirmed' && (
                        <div className="mt-6 flex space-x-3">
                          <a 
                            href={`https://maps.google.com/?q=${encodeURIComponent(reservation.location)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                          >
                            <svg className="-ml-1 mr-2 h-5 w-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            Get Directions
                          </a>
                          <button
                            onClick={() => handleCancelReservation(reservation.id)}
                            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                          >
                            <svg className="-ml-1 mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                            Cancel Reservation
                          </button>
                        </div>
                      )}
                      
                      {reservation.status === 'pending' && (
                        <div className="mt-6 flex space-x-3">
                          <button
                            onClick={() => handleCancelReservation(reservation.id)}
                            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                          >
                            <svg className="-ml-1 mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                            Cancel Request
                          </button>
                        </div>
                      )}
                      
                      {reservation.status === 'completed' && (
                        <div className="mt-6">
                          <button className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                            <svg className="-ml-1 mr-2 h-5 w-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                            </svg>
                            Leave Feedback
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default RecipientReservations; 