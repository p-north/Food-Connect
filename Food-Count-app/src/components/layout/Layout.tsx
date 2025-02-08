import { Outlet } from 'react-router-dom';
import Navigation from './Navigation';

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-grow">
        <Outlet />
      </main>
      <footer className="bg-gray-100 p-4 text-center">
        <p>© 2024 Food Connect</p>
      </footer>
    </div>
  );
};

export default Layout;
