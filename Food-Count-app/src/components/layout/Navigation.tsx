import { Link } from 'react-router-dom';
import { LogOut, Search } from 'lucide-react';
import useAuthStore from '../../store/authStore';
import NotificationDropdown from "../shared/notificationDropdown/NotificationDropdownMenu.tsx";
import { generateDynamicColor, getUserInitials } from '../../lib/helpers.ts';
import { Avatar, AvatarFallback } from '../ui/avatar.tsx';

const Navigation = () => {
  const { logout, user } = useAuthStore();
  const initials = getUserInitials(user?.name || 'John Doe');
  // Determine dashboard path based on account type
  const dashboardPath = user?.accountType === 'donor' ? '/donor/dashboard' : '/recipient/dashboard';

  return (
    <header className="bg-white shadow-sm fixed py-3 px-4 top-0 left-0 right-0 z-50 border-b border-gray-200">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <Link to={dashboardPath} className="flex items-center hover:opacity-80 transition-opacity duration-150">
            <img className="w-6 h-6 text-green-500" src='/foodconnect_logo.png' />
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
            <NotificationDropdown />
          </div>

          <div
            className="h-8 w-8 rounded-full overflow-hidden"
            style={{ backgroundColor: generateDynamicColor(initials) }} // Dynamic background color
          >
            <Avatar className="h-full w-full">
              <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>
          </div>

          <button
            onClick={logout}
            className="p-1 rounded-full text-gray-500 hover:text-gray-700 hover:bg-gray-100 hidden md:block"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navigation;