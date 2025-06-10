import { Link, useLocation } from 'react-router-dom';
import { ReactNode } from 'react';

interface DonorLayoutProps {
  children: ReactNode;
}

const DonorLayout = ({ children }: DonorLayoutProps) => {
  const location = useLocation();

  const isActivePath = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <section className="flex justify-between items-center mb-6 border-b border-gray-200 pb-4">
          <nav className="flex space-x-4">
            <Link 
              to="/donor/dashboard" 
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                isActivePath('/donor/dashboard')
                  ? 'bg-green-100 text-green-700'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              My Listings
            </Link>
            <Link 
              to="/donor/newlisting" 
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                isActivePath('/donor/newlisting')
                  ? 'bg-green-100 text-green-700'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              Create Listing
            </Link>
            <Link 
              to="/donor/profile" 
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                isActivePath('/donor/profile')
                  ? 'bg-green-100 text-green-700'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              Profile
            </Link>
          </nav>
        </section>
        <main>{children}</main>
      </div>
    </div>
  );
};

export default DonorLayout;