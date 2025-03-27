import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Layout from "./components/layout/Layout";
import Landing from "./pages/Landing";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import DonorDashboard from "./pages/Donor/DonorDashboard";
import EditProfile from "./pages/Donor/EditProfile";
import NewListing from "./pages/Donor/NewListing";
import RecipientDashboard from "./pages/Recipient/RecipientDashboard";
import RecipientProfile from "./pages/Recipient/RecipientProfile";
import RecipientReservations from "./pages/Recipient/RecipientReservations";
import Message from "./pages/Message";
import useAuthStore from "./store/authStore";
import LoadingSpinner from "./components/shared/LoadingSpinner";
import { Children, useEffect } from "react";

// import RecipientProfile from './pages/Recipient/RecipientProfile'; for prianish when hes done his page

// Protected routes
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="login" replace />;
  }

  return children;
};

const App = () => {
  const { isCheckingAuth, checkAuth } = useAuthStore();

  useEffect(()=>{
    checkAuth();
  }, [checkAuth])

  if(isCheckingAuth) return <LoadingSpinner/>;

  return (
    <Router>
      <Routes>
        <Route path="/" element={
         
            <Layout />
         
          }>
          <Route index element={<Landing />} />
          <Route path="signup" element={<Signup />} />
          <Route path="login" element={<Login />} />
          <Route path="/donor/dashboard" element={<DonorDashboard />} />
          <Route path="/donor/profile" element={<EditProfile />} />
          <Route path="/donor/newlisting" element={<NewListing />} />
          <Route path="/recipient/dashboard" element={<RecipientDashboard />} />
          <Route path="/recipient/profile" element={<RecipientProfile />} />
          <Route
            path="/recipient/reservations"
            element={<RecipientReservations />}
          />
          <Route path="/message/:receiverId" element={<Message />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
