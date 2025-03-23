import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Landing from './pages/Landing';
import Signup from './pages/Signup';
import Login from './pages/Login';
import DonorProfile from './pages/Donor/DonorProfile';


// import RecipientProfile from './pages/Recipient/RecipientProfile'; for prianish when hes done his page


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Landing />} />
          <Route path="signup" element={<Signup />} />
          <Route path="login" element={<Login />} />
          <Route path="/donor/profile" element={<DonorProfile />} />

        </Route>
      </Routes>
    </Router>
  );
};

export default App;
