import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Landing from './pages/Landing';
import Signup from './pages/Signup';
import Login from './pages/Login';
import DonorDashboard from './pages/Donor/DonorDashboard';
import EditProfile from './pages/Donor/EditProfile';
import NewListing from './pages/Donor/NewListing';
import EditListing from './pages/Donor/EditListing';
import RecipientDashboard from './pages/Recipient/RecipientDashboard';
import RecipientProfile from './pages/Recipient/RecipientProfile';
import RecipientReservations from './pages/Recipient/RecipientReservations';


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
          <Route path="/editlistings/:id" element={<EditListing />} />
          <Route path="/recipient/dashboard" element={<RecipientDashboard />} />
          <Route path="/recipient/profile" element={<RecipientProfile />} />
          <Route path="/recipient/reservations" element={<RecipientReservations />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
