import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ToastContainer } from 'react-toastify';

// clear auth states on application close
localStorage.removeItem('user');
localStorage.removeItem('isAuthenticated');
sessionStorage.clear();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
    <ToastContainer/>
  </StrictMode>,
)
