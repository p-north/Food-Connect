import { Link } from 'react-router-dom';
import { ReactNode } from 'react';

interface RecipientLayoutProps {
  children: ReactNode;
}

const RecipientLayout = ({ children }: RecipientLayoutProps) => {
  return (
    <div className="min-h-screen bg-green-50 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <section className="flex justify-between items-center mb-6 border-b border-gray-200 pb-4">
          <nav className="flex space-x-4">
            <Link 
              to="/recipient/dashboard" 
              className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100"
            >
              Dashboard
            </Link>
            <Link 
              to="/recipient/reservations" 
              className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100"
            >
              My Reservations
            </Link>
            <Link 
              to="/recipient/profile" 
              className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100"
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

export default RecipientLayout;