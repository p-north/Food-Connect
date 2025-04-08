import { Link } from 'react-router-dom';
import { LogOut, Search, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import useAuthStore from '../../store/authStore';
import NotificationDropdown from "../shared/notificationDropdown/NotificationDropdownMenu.tsx";
import './Navigation.css'; // Add CSS for transitions

const Navigation = () => {
  const { logout, user } = useAuthStore();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Determine dashboard and profile paths based on account type
  const dashboardPath = user?.accountType === 'donor' ? '/donor/dashboard' : '/recipient/dashboard';
  const profilePath = user?.accountType === 'donor' ? '/donor/profile' : '/recipient/profile';

  const toggleDropdown = () => setDropdownOpen((prev) => !prev);

  return (
    <header className="bg-white shadow-sm fixed py-3 px-4 top-0 left-0 right-0 z-50 border-b border-gray-200">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <Link to={dashboardPath} className="flex items-center hover:opacity-80 transition-opacity duration-150">
            <img className="w-6 h-6 text-green-500" src='/foodconnect_logo.png'/>
            <span className="ml-2 text-xl font-semibold text-black ">FoodConnect</span>
          </Link>
        </div>
        
        <div className="flex-1 max-w-2xl mx-8 hidden md:block">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="w-5 h-5 text-gray-400" />
            </div>
            <input 
              type="search" 
              className="block w-full p-2 pl-10 pr-4 rounded-md border border-gray-300 focus:ring-green-500 focus:border-green-500" 
              placeholder="Search for available food..." 
            />
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="relative">
            <NotificationDropdown/>
          </div>
          
          <div className="relative flex items-center gap-2">
            <div onClick={toggleDropdown} className="cursor-pointer flex items-center">
              <img 
                src={user?.avatarUrl || "https://ui-avatars.com/api/?name=User&background=random"} 
                alt={user?.name || "User"} 
                className="w-8 h-8 rounded-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "https://ui-avatars.com/api/?name=User&background=random";
                }}
              />
              <ChevronDown className="w-4 h-4 text-gray-500 ml-1" />
            </div>
            {dropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg border border-gray-200"
              >
                <Link 
                  to={profilePath} 
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => setDropdownOpen(false)}
                >
                  Profile
                </Link>
                <button 
                  onClick={() => {
                    logout();
                    setDropdownOpen(false);
                  }}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Logout
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navigation;