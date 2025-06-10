import { Outlet } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Navigation from './Navigation';
import SimpleNav from './SimpleNav';
import useAuthStore from '../../store/authStore';
import { useEffect, useState } from 'react';
import LoadingSpinner from '../shared/LoadingSpinner';

const Layout = () => {
  const { isAuthenticated, isCheckingAuth, checkAuth } = useAuthStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        await checkAuth();
      } catch (error) {
        console.error('Auth check failed:', error);
      } finally {
        setIsLoading(false);
      }
    };

    // Only run the auth check if we're still checking auth
    if (isCheckingAuth) {
      initializeAuth();
    } else {
      setIsLoading(false);
    }
  }, [checkAuth, isCheckingAuth]);

  // Show loading spinner only during the initial auth check
  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-32 w-80 h-80 bg-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-32 w-80 h-80 bg-emerald-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-teal-200 rounded-full mix-blend-multiply filter blur-xl opacity-15 animate-pulse delay-500"></div>
      </div>

      {isAuthenticated ? <Navigation /> : <SimpleNav />}
      <main className="flex-grow pt-18 relative z-10">
        <Outlet />
      </main>
      
      <footer className="bg-gray-900/95 backdrop-blur-lg text-white py-8 relative z-10 border-t border-gray-800/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                </div>
                <span className="ml-3 font-semibold text-lg bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">FoodConnect</span>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed">Making a difference, one meal at a time.</p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4 text-white">Quick Links</h3>
              <ul className="space-y-3 text-sm text-gray-400">
                <li className="hover:text-green-400 transition-colors duration-300 cursor-pointer">How It Works</li>
                <li className="hover:text-green-400 transition-colors duration-300 cursor-pointer">Partners</li>
                <li className="hover:text-green-400 transition-colors duration-300 cursor-pointer">Impact</li>
                <li className="hover:text-green-400 transition-colors duration-300 cursor-pointer">Testimonials</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4 text-white">Resources</h3>
              <ul className="space-y-3 text-sm text-gray-400">
                <li className="hover:text-green-400 transition-colors duration-300 cursor-pointer">Blog</li>
                <li className="hover:text-green-400 transition-colors duration-300 cursor-pointer">FAQ</li>
                <li className="hover:text-green-400 transition-colors duration-300 cursor-pointer">Support</li>
                <li className="hover:text-green-400 transition-colors duration-300 cursor-pointer">Contact</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4 text-white">Legal</h3>
              <ul className="space-y-3 text-sm text-gray-400">
                <li className="hover:text-green-400 transition-colors duration-300 cursor-pointer">Privacy Policy</li>
                <li className="hover:text-green-400 transition-colors duration-300 cursor-pointer">Terms of Service</li>
                <li className="hover:text-green-400 transition-colors duration-300 cursor-pointer">Cookie Policy</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-gray-800/50 text-sm text-gray-400 text-center">
            <div className="flex items-center justify-center space-x-6">
              <span>© 2025 FoodConnect. All rights reserved.</span>
              <div className="flex space-x-4">
                <div className="w-6 h-6 bg-gray-700 hover:bg-green-600 rounded-full flex items-center justify-center transition-colors duration-300 cursor-pointer">
                  <span className="text-xs">f</span>
                </div>
                <div className="w-6 h-6 bg-gray-700 hover:bg-green-600 rounded-full flex items-center justify-center transition-colors duration-300 cursor-pointer">
                  <span className="text-xs">t</span>
                </div>
                <div className="w-6 h-6 bg-gray-700 hover:bg-green-600 rounded-full flex items-center justify-center transition-colors duration-300 cursor-pointer">
                  <span className="text-xs">i</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Enhanced CSS */}
      <style>{`
        .bg-clip-text {
          -webkit-background-clip: text;
          background-clip: text;
        }
      `}</style>
    </div>
  );
};

export default Layout;