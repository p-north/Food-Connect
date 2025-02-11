import { Outlet } from 'react-router-dom';
import Navigation from './Navigation';

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen w-screen">
      {/* Full-width navigation */}
      <Navigation />

      {/* Main content area */}
      <main className="flex-grow w-full bg-gray-50 flex justify-center items-center">
        <Outlet />
      </main>

      {/* Footer at the bottom */}
      <footer className="bg-gray-100 p-4 text-center w-full">
        <p>© 2024 Food Connect</p>
      </footer>
    </div>
  );
};

export default Layout;
