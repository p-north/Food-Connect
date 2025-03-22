import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-green-50 min-h-screen flex flex-col justify-center">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gray-800">Connecting </span>
            <span className="text-green-500">Food Donors</span>
            <br />
            <span className="text-gray-800">with Those in Need</span>
          </h1>
          
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Join our mission to reduce food waste and help your local community by 
            connecting surplus food with people who need it most.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup" className="bg-green-500 !text-white px-6 py-3 rounded-md flex items-center justify-center hover:bg-green-600 hover:bg-opacity-90 transition-colors duration-150">
              Donate Food
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
            <Link to="/signup" className="border border-gray-300 bg-white !text-green-500 px-6 py-3 rounded-md hover:bg-gray-100 hover:bg-opacity-90 transition-colors duration-150">
              Find Food
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16" id="how-it-works">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Register as a Donor</h3>
              <p className="text-gray-600">
                Restaurants, supermarkets, and individuals can sign up to donate surplus food.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">List Available Food</h3>
              <p className="text-gray-600">
                Post details about available food items, quantity, and pickup times.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Connect & Share</h3>
              <p className="text-gray-600">
                Local recipients can find and collect food donations in their area.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Donations Section */}
      <section className="py-8 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-2xl font-bold mb-6 text-black">Recent Donations</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((item) => (
              <div key={item} className="bg-white rounded-lg shadow-sm p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-black">Fresh Produce Bundle</h3>
                  <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded">Available</span>
                </div>
                <p className="text-gray-600 text-sm mb-3">Vegetables, fruits, and herbs</p>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center">
                    <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Pickup until 8 PM today
                  </div>
                  <div className="flex items-center">
                    <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    2.5 miles away
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-16 bg-green-500 text-white">
        <div className="max-w-5xl mx-auto px-6" id="impact">
          <h2 className="text-3xl font-bold text-center mb-12">Our Impact</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <p className="text-5xl font-bold mb-2">1,000+</p>
              <p className="text-lg">Active Donors</p>
            </div>
            <div>
              <p className="text-5xl font-bold mb-2">5,000+</p>
              <p className="text-lg">Meals Shared</p>
            </div>
            <div>
              <p className="text-5xl font-bold mb-2">100+</p>
              <p className="text-lg">Communities Served</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gray-50" id="testimonials">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12 text-black">What People Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <p className="text-gray-600 italic mb-4">
                "FoodConnect has made it so easy for our restaurant to donate surplus food.
                We're helping the community while reducing waste."
              </p>
              <div className="font-semibold text-black">Sarah Johnson</div>
              <div className="text-sm text-gray-500">Restaurant Owner</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <p className="text-gray-600 italic mb-4">
                "As a food bank coordinator, this platform has revolutionized how we connect
                with donors and distribute food to those in need."
              </p>
              <div className="font-semibold">Michael Chen</div>
              <div className="text-sm text-gray-500">Food Bank Coordinator</div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-12 bg-green-50">
        <div className="max-w-3xl mx-auto px-6">
          <div className="bg-green-50 p-8 rounded-lg">
            <h2 className="text-black text-2xl font-bold text-center mb-2">Stay Updated</h2>
            <p className="text-center text-gray-600 mb-6">
              Subscribe to our newsletter for updates on local food donations and community impact.
            </p>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="What's your email?"
                className="text-gray-500 flex-grow px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <button className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 flex items-center justify-center">
                Subscribe
                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;