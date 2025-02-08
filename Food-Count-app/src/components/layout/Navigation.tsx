import { Link } from 'react-router-dom';

const Navigation = () => {
  return (
    <header className="bg-white shadow-sm">
      <nav className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">
          FoodConnect
        </Link>
        <div className="space-x-4">
          <Link to="/signup" className="text-gray-600 hover:text-blue-600">
            Sign Up
          </Link>
          <Link to="/login" className="text-gray-600 hover:text-blue-600">
            Login
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Navigation;
