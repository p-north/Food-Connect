import { Link, useLocation } from 'react-router-dom';

const Navigation = () => {
  const location = useLocation();
  const isLoggedIn = false; // This would normally come from auth context/state

  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="flex items-center hover:opacity-80 transition-opacity duration-150">
          <svg className="w-6 h-6 text-green-500" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
          <span className="ml-2 text-xl font-semibold text-black ">FoodConnect</span>
        </Link>
        
        {isLoggedIn ? (
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Link to="/notifications" className="text-gray-600 hover:text-gray-900">
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">1</span>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </Link>
            </div>
            <div className="flex items-center">
              <img 
                src="/api/placeholder/40/40" 
                alt="User profile" 
                className="w-8 h-8 rounded-full"
              />
              <svg className="w-4 h-4 ml-1 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <Link 
              to="/login" 
              className={`!text-black hover:text-gray-900 font-semibold ${location.pathname === '/login' ? 'text-black' : 'text-gray-800 hover:text-black transition-colors duration-150'}`}
            >
              Sign In
            </Link>
            <Link 
              to="/signup" 
              className={`bg-green-500 !text-white px-4 py-2 rounded-md hover:bg-green-600 hover:bg-opacity-90 transition-colors duration-150 ${location.pathname === '/signup' ? 'bg-green-600' : ''}`}
            >
              Register
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;