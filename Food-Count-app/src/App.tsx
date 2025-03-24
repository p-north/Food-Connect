import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Landing from './pages/Landing';
import Signup from './pages/Signup';
import Login from './pages/Login';
import DonorDashboard from './pages/Donor/DonorDashboard';
import EditProfile from './pages/Donor/EditProfile';
import NewListing from './pages/Donor/NewListing';

// import RecipientProfile from './pages/Recipient/RecipientProfile'; for prianish when hes done his page


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Landing />} />
          <Route path="signup" element={<Signup />} />
          <Route path="login" element={<Login />} />
          <Route path="/donor/dashboard" element={<DonorDashboard />} />
          <Route path="/donor/profile" element={<EditProfile />} />
          <Route path="/donor/newlisting" element={<NewListing />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
