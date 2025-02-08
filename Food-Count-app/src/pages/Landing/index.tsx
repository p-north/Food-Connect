import { Link } from 'react-router-dom';
import Button from '../../components/shared/Button';

const Landing = () => {
  return (
    <div className="text-center py-20">
      <h1 className="text-4xl font-bold mb-6">Welcome Food Connect</h1>
      <p className="text-xl text-gray-600 mb-8">
        Transform your experience with our innovative solution
      </p>
      <div className="space-x-4">
        <Button as={Link} to="/signup" variant="primary">
          Get Started
        </Button>
        <Button as={Link} to="/login" variant="secondary">
          Login
        </Button>
      </div>
    </div>
  );
};

export default Landing;
