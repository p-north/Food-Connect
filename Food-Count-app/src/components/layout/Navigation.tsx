import { Link, useLocation } from 'react-router-dom';
import { LogOut, Search, ChevronDown } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import useAuthStore from '../../store/authStore';
import NotificationDropdown from "../shared/notificationDropdown/NotificationDropdownMenu.tsx";
import './Navigation.css'; // Add CSS for transitions

const Navigation = () => {
  const { logout, user } = useAuthStore();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const location = useLocation(); // Get the current location

  // Determine dashboard and profile paths based on account type
  const dashboardPath = user?.accountType === 'donor' ? '/donor/dashboard' : '/recipient/dashboard';
  const profilePath = user?.accountType === 'donor' ? '/donor/profile' : '/recipient/profile';

  const toggleDropdown = () => setDropdownOpen((prev) => !prev);

  const handleLogout = () => {
    logout();
    setShowLogoutModal(false);
  };

  return (
    <>
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
                  src={user?.avatarUrl || `https://ui-avatars.com/api/?name=${user?.name}&background=0D8ABC&color=fff`} 
                  alt={user?.name || "User"} 
                  className="w-8 h-8 rounded-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src =  `https://ui-avatars.com/api/?name=${user?.name}&background=grey`;
                  }}
                />
                <ChevronDown className="w-4 h-4 text-gray-500 ml-1" />
              </div>
              {dropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute right-0 top-full mt-2 w-40 bg-white rounded-md shadow-lg border border-gray-200"
                >
                  <Link 
                    to={{
                      pathname: profilePath,
                      state: { from: location }, // Pass the current location as state
                    }}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setDropdownOpen(false)}
                  >
                    Profile
                  </Link>
                  <Link 
                    onClick={() => {
                      setShowLogoutModal(true);
                      setDropdownOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Logout
                  </Link>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </header>

      {showLogoutModal && (
        <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96">
            <h2 className="text-lg font-semibold text-gray-800">Are you sure you want to log out?</h2>
            <div className="mt-4 flex justify-end gap-4">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-green-400 text-white rounded-md hover:bg-green-500"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navigation;