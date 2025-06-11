import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import RecipientLayout from '../../components/layout/RecipientLayout';
// import useAuthStore from '../../store/authStore';

interface Reservation {
  id: number;
  recipient_id: number;
  donor_id: number;
  food_post_id: number;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  created_at: string;
  updated_at: string;
  // Populated data from related tables
  food_post?: {
    id: number;
    user_id: number;
    title: string;
    quantity: number;
    description: string;
    image_url: string[];
    dietary_restrictions: string;
    location: string;
    latitude: number;
    longitude: number;
    availability_status: string;
    expiration_date: string;
    tags: string[];
    available_for: string;
    created_at: string;
  };
  donor?: {
    id: number;
    email: string;
    name: string;
    type_of_account: string;
    is_verified: boolean;
    created_at: string;
  };
}

const RecipientReservations = () => {
  // const { user } = useAuthStore();
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');

  // Mock data following the database model
  useEffect(() => {
    // In a real app, this would be an API call that joins reservations with food_posts and users
    const mockReservations: Reservation[] = [
      {
        id: 1,
        recipient_id: 1, // Current user's ID
        donor_id: 2,
        food_post_id: 1,
        status: 'confirmed',
        created_at: '2025-06-10T14:30:00Z',
        updated_at: '2025-06-10T15:00:00Z',
        food_post: {
          id: 1,
          user_id: 2,
          title: 'Fresh Bread and Pastries',
          quantity: 5,
          description: 'Surplus baked goods from today including croissants, baguettes, and danish pastries',
          image_url: ['/images/bread.jpg'],
          dietary_restrictions: 'Contains gluten, dairy',
          location: '123 Main St, Downtown',
          latitude: 40.7128,
          longitude: -74.0060,
          availability_status: 'available',
          expiration_date: '2025-06-11T18:00:00Z',
          tags: ['baked goods', 'pastries', 'bread'],
          available_for: 'pickup',
          created_at: '2025-06-10T08:00:00Z'
        },
        donor: {
          id: 2,
          email: 'citybakery@example.com',
          name: 'City Bakery',
          type_of_account: 'donor',
          is_verified: true,
          created_at: '2025-05-01T10:00:00Z'
        }
      },
      {
        id: 2,
        recipient_id: 1,
        donor_id: 3,
        food_post_id: 2,
        status: 'pending',
        created_at: '2025-06-10T16:15:00Z',
        updated_at: '2025-06-10T16:15:00Z',
        food_post: {
          id: 2,
          user_id: 3,
          title: 'Surplus Produce',
          quantity: 10,
          description: 'Fresh vegetables and fruits that need to be picked up today',
          image_url: ['/images/produce.jpg'],
          dietary_restrictions: 'Vegan, gluten-free',
          location: '456 Oak Ave, Market District',
          latitude: 40.7589,
          longitude: -73.9851,
          availability_status: 'available',
          expiration_date: '2025-06-11T20:00:00Z',
          tags: ['vegetables', 'fruits', 'organic'],
          available_for: 'pickup',
          created_at: '2025-06-10T12:00:00Z'
        },
        donor: {
          id: 3,
          email: 'greenmarket@example.com',
          name: 'Green Market',
          type_of_account: 'donor',
          is_verified: true,
          created_at: '2025-04-15T09:00:00Z'
        }
      },
      {
        id: 3,
        recipient_id: 1,
        donor_id: 4,
        food_post_id: 3,
        status: 'completed',
        created_at: '2025-06-09T10:00:00Z',
        updated_at: '2025-06-09T13:30:00Z',
        food_post: {
          id: 3,
          user_id: 4,
          title: 'Prepared Meals',
          quantity: 3,
          description: 'Hot meals ready for pickup including soup, sandwiches, and salad',
          image_url: ['/images/meals.jpg'],
          dietary_restrictions: 'Vegetarian options available',
          location: '789 Pine St, Community Center',
          latitude: 40.7505,
          longitude: -73.9934,
          availability_status: 'reserved',
          expiration_date: '2025-06-09T15:00:00Z',
          tags: ['prepared meals', 'hot food', 'ready to eat'],
          available_for: 'pickup',
          created_at: '2025-06-09T09:00:00Z'
        },
        donor: {
          id: 4,
          email: 'communitykitchen@example.com',
          name: 'Community Kitchen',
          type_of_account: 'donor',
          is_verified: true,
          created_at: '2025-03-20T11:00:00Z'
        }
      },
      {
        id: 4,
        recipient_id: 1,
        donor_id: 5,
        food_post_id: 4,
        status: 'cancelled',
        created_at: '2025-06-03T11:20:00Z',
        updated_at: '2025-06-03T14:45:00Z',
        food_post: {
          id: 4,
          user_id: 5,
          title: 'Bakery Goods',
          quantity: 11,
          description: 'End of day bakery items including muffins, cookies, and brownies',
          image_url: ['/images/bakery.jpg'],
          dietary_restrictions: 'Contains gluten, eggs, dairy',
          location: '567 Cherry Lane, Bakery Row',
          latitude: 40.7282,
          longitude: -74.0776,
          availability_status: 'expired',
          expiration_date: '2025-06-03T18:00:00Z',
          tags: ['baked goods', 'desserts', 'sweet treats'],
          available_for: 'pickup',
          created_at: '2025-06-03T08:30:00Z'
        },
        donor: {
          id: 5,
          email: 'sweettreats@example.com',
          name: 'Sweet Treats',
          type_of_account: 'donor',
          is_verified: true,
          created_at: '2025-02-10T14:00:00Z'
        }
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

  const handleCancelReservation = (id: number) => {
    // In a real app, this would be an API call
    setIsLoading(true);
    setTimeout(() => {
      setReservations(
        reservations.map(res =>
          res.id === id ? { ...res, status: 'cancelled', updated_at: new Date().toISOString() } : res
        )
      );
      setIsLoading(false);
    }, 500);
  };

  return (
    <RecipientLayout>
      <div className="mb-6">
        <div className="border-b border-gray-200">
          <div className="-mb-px flex">
            <button
              onClick={() => setActiveTab('upcoming')}
              className={`mr-8 py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'upcoming'
                ? 'border-green-500 text-green-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
            >
              Upcoming ({upcomingReservations.length})
            </button>
            <button
              onClick={() => setActiveTab('past')}
              className={`mr-8 py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'past'
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
                  <div className="md:flex-shrink-0 w-full md:w-48 bg-gray-200 overflow-hidden">
                    <img
                      src={reservation.food_post?.image_url?.[0]}
                      alt={reservation.food_post?.title}
                      className="h-full w-full object-cover object-center transition-opacity duration-300 hover:scale-105"
                      loading="lazy"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = 'https://via.placeholder.com/400x400?text=Food+Image';
                      }}
                    />
                  </div>
                  <div className="p-6 flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-bold text-gray-900">{reservation.food_post?.title}</h3>
                        <p className="mt-1 text-gray-600">{reservation.donor?.name}</p>
                      </div>
                      {getStatusBadge(reservation.status)}
                    </div>

                    <div className="mt-4 flex items-center text-sm text-gray-500">
                      <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <p>{reservation.food_post?.location}</p>
                    </div>

                    <div className="mt-2 flex items-center text-sm text-gray-500">
                      <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <p>Expires: {new Date(reservation.food_post?.expiration_date || '').toLocaleDateString()}</p>
                    </div>

                    <div className="mt-4">
                      <h4 className="text-sm font-medium text-gray-900">Quantity: {reservation.food_post?.quantity} items</h4>
                      <p className="mt-2 text-sm text-gray-600">{reservation.food_post?.description}</p>
                      {reservation.food_post?.dietary_restrictions && (
                        <p className="mt-2 text-sm text-gray-500">
                          <span className="font-medium">Dietary info:</span> {reservation.food_post.dietary_restrictions}
                        </p>
                      )}
                      {reservation.food_post?.tags && reservation.food_post.tags.length > 0 && (
                        <div className="mt-2 flex flex-wrap gap-1">
                          {reservation.food_post.tags.map((tag, idx) => (
                            <span key={idx} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {reservation.status === 'confirmed' && (
                      <div className="mt-6 flex space-x-3">
                        <a
                          href={`https://maps.google.com/?q=${encodeURIComponent(reservation.food_post?.location || '')}`}
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
    </RecipientLayout>
  );
};

export default RecipientReservations;