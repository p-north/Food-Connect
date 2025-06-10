import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/shared/Button';
import Container from '../../components/shared/Container';
import InputField from '../../components/shared/InputField';
import useAuthStore from '../../store/authStore';
import { API_URL } from '../../config/api';

type SignupType = 'donor' | 'recipient';

const Signup = () => {
  const [signupType, setSignupType] = useState<SignupType>('donor');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    organization: '',
    agreeToTerms: false
  });
  const [verificationCode, setVerificationCode] = useState('');
  
  const navigate = useNavigate();
  
  // Get state and actions from the auth store
  const { 
    signup, 
    verifyEmail, 
    error, 
    isLoading, 
    verificationPending, 
    emailToVerify,
    clearError 
  } = useAuthStore();
  
  // Clear errors when component mounts
  useEffect(() => {
    clearError();
  }, [clearError]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      // We can't use the store's error state for this validation
      // So we'll handle it locally
      alert('Passwords do not match');
      return;
    }
    
    if (!formData.agreeToTerms) {
      alert('Please agree to the terms of service');
      return;
    }
    
    try {
      await signup({
        firstName: formData.firstName,
        email: formData.email,
        password: formData.password,
        accountType: signupType
      });
      // No need to set verification pending, the store handles it
    } catch (err) {
      console.error('Signup error:', err);
    }
  };
  
  const handleVerifyEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!verificationCode) {
      alert('Please enter the verification code');
      return;
    }
    
    try {
      await verifyEmail(verificationCode);
      navigate('/login', { state: { verified: true } });
    } catch (err) {
      console.error('Verification error:', err);
    }
  };
  
  const handleSignupTypeChange = (type: SignupType) => {
    if (type === signupType) return;
    
    setIsTransitioning(true);
    
    // Wait for fade out, then change type
    setTimeout(() => {
      setSignupType(type);
    }, 150);
    
    // Complete transition
    setTimeout(() => {
      setIsTransitioning(false);
    }, 300);
  };

  // If verification is needed, show the verification form
  if (verificationPending) {
    return (
      <div className="min-h-screen w-full bg-green-50 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Verify Your Email</h1>
            <p className="text-gray-600">
              We've sent a verification code to {emailToVerify}. Please enter it below.
            </p>
          </div>
          
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}
          
          <form onSubmit={handleVerifyEmail} className="space-y-6">
            <InputField
              label="Verification Code"
              name="verificationCode"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              required
              placeholder="Enter the 6-digit code"
            />
            
            <Button type="submit" disabled={isLoading} fullWidth>
              {isLoading ? 'Verifying...' : 'Verify Email'}
            </Button>
          </form>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-32 w-80 h-80 bg-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-32 w-80 h-80 bg-emerald-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-teal-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-500"></div>
      </div>

      <div className="scale-90 w-full max-w-lg bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 p-8 transition-all duration-500 hover:shadow-3xl relative z-10" style={{ minHeight: '600px' }}>
        <div className="text-center mb-8 relative">
          {/* Logo/Icon */}
          <div className="mx-auto mb-4 w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg transform rotate-3 hover:rotate-0 transition-transform duration-300">
            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
          </div>
          
          <h1 className="text-black text-3xl font-bold mb-2 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
            Join FoodConnect
          </h1>
          <p className="text-gray-600 text-sm leading-relaxed">
            Help reduce food waste and support your local community
          </p>
          
          {/* Decorative line */}
          <div className="mt-4 w-16 h-1 bg-gradient-to-r from-green-400 to-emerald-500 mx-auto rounded-full"></div>
        </div>
        
        {error && (
          <div className="bg-red-50 border-l-4 border-red-400 text-red-700 px-4 py-3 rounded-r-lg mb-4 animate-shake">
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              {error}
            </div>
          </div>
        )}
        
        <div className="relative mb-8">
          <div className="flex bg-gray-50 rounded-xl p-1 border-2 border-gray-100 shadow-inner">
            <button
              type="button"
              className={`flex-1 py-3 px-4 text-center transition-all duration-300 transform rounded-lg font-semibold relative overflow-hidden ${
                signupType === 'donor' 
                  ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg transform scale-105' 
                  : 'text-gray-600 hover:text-gray-800 hover:bg-white/50'
              }`}
              onClick={() => handleSignupTypeChange('donor')}
              style={{ outline: 'none' }}
            >
              <span className="relative z-10 flex items-center justify-center">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4zM18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z"/>
                </svg>
                Donor
              </span>
              {signupType === 'donor' && (
                <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-500 opacity-20 rounded-lg animate-pulse"></div>
              )}
            </button>
            <button
              type="button"
              className={`flex-1 py-3 px-4 text-center transition-all duration-300 transform rounded-lg font-semibold relative overflow-hidden ${
                signupType === 'recipient' 
                  ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg transform scale-105' 
                  : 'text-gray-600 hover:text-gray-800 hover:bg-white/50'
              }`}
              onClick={() => handleSignupTypeChange('recipient')}
              style={{ outline: 'none' }}
            >
              <span className="relative z-10 flex items-center justify-center">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                Recipient
              </span>
              {signupType === 'recipient' && (
                <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-500 opacity-20 rounded-lg animate-pulse"></div>
              )}
            </button>
          </div>
        </div>
        
        <div className="relative" style={{ minHeight: '400px' }}>
          <div 
            className={`transition-all duration-500 ease-out ${
              isTransitioning 
                ? 'opacity-0 transform translate-y-8 scale-95' 
                : 'opacity-100 transform translate-y-0 scale-100'
            }`}
          >
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="transform transition-all duration-300 hover:scale-105 focus-within:scale-105">
                  <InputField
                    label="First Name"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    placeholder="Enter your first name"
                  />
                </div>
                <div className="transform transition-all duration-300 hover:scale-105 focus-within:scale-105">
                  <InputField
                    label="Last Name"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Enter your last name"
                  />
                </div>
              </div>
              
              <div className="transform transition-all duration-300 hover:scale-105 focus-within:scale-105">
                <InputField
                  label="Email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="Enter your email address"
                  icon={
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  }
                />
              </div>
              
              {/* Organization field with enhanced animation */}
              <div 
                className={`transform transition-all duration-700 ease-in-out overflow-hidden ${
                  signupType === 'recipient' 
                    ? 'max-h-0 opacity-0 -translate-y-4 scale-95' 
                    : 'max-h-32 opacity-100 translate-y-0 scale-100 hover:scale-105 focus-within:scale-105'
                }`}
              >
                <InputField
                  label="Organization Name (Optional)"
                  name="organization"
                  value={formData.organization}
                  onChange={handleChange}
                  placeholder="Restaurant, grocery store, farm, etc."
                  disabled={signupType === 'recipient'}
                  icon={
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  }
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="transform transition-all duration-300 hover:scale-105 focus-within:scale-105">
                  <InputField
                    label="Password"
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    placeholder="Create a password"
                    icon={
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    }
                  />
                </div>
                <div className="transform transition-all duration-300 hover:scale-105 focus-within:scale-105">
                  <InputField
                    label="Confirm Password"
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    placeholder="Confirm your password"
                    icon={
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    }
                  />
                </div>
              </div>
              
              <div className="mt-6 mb-8">
                <label className="flex items-center group cursor-pointer">
                  <input
                    type="checkbox"
                    name="agreeToTerms"
                    checked={formData.agreeToTerms}
                    onChange={handleChange}
                    className="peer h-5 w-5 appearance-none bg-white border-2 border-gray-300 rounded-lg 
                              checked:bg-gradient-to-r checked:from-green-500 checked:to-emerald-600 
                              focus:ring-2 focus:ring-green-300 focus:ring-offset-2 relative
                              transition-all duration-300 hover:border-green-400
                              checked:after:content-['✔'] checked:after:text-white checked:after:font-bold
                              checked:after:absolute checked:after:inset-0 checked:after:flex 
                              checked:after:items-center checked:after:justify-center checked:after:text-sm"
                  />
                  <span className="ml-3 text-sm text-gray-600 group-hover:text-gray-800 transition-colors">
                    I agree to the <a href="#" className="text-green-600 hover:text-green-700 underline font-medium">Terms of Service</a> and <a href="#" className="text-green-600 hover:text-green-700 underline font-medium">Privacy Policy</a>
                  </span>
                </label>
              </div>
              
              <div className="relative">
                <Button 
                  type="submit" 
                  fullWidth 
                  disabled={isLoading} 
                  className="relative overflow-hidden bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="relative z-10">
                    {isLoading ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Creating Account...
                      </span>
                    ) : (
                      'Create Account'
                    )}
                  </span>
                  {!isLoading && (
                    <div className="absolute inset-0 bg-white opacity-0 hover:opacity-10 transition-opacity duration-300 rounded-xl"></div>
                  )}
                </Button>
              </div>
              
              <div className="text-center mt-8 pt-6 border-t border-gray-100">
                <p className="text-gray-600 text-sm">
                  Already have an account?{' '}
                  <Link to="/login" className="text-green-600 hover:text-green-700 font-semibold underline transition-colors duration-300">
                    Sign in here
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
      
      {/* Enhanced CSS animations */}
      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
        
        .shadow-3xl {
          box-shadow: 0 35px 60px -12px rgba(0, 0, 0, 0.25);
        }
        
        .backdrop-blur-lg {
          backdrop-filter: blur(16px);
        }
        
        .bg-clip-text {
          -webkit-background-clip: text;
          background-clip: text;
        }
        
        button:focus {
          outline: none !important;
          box-shadow: none !important;
        }
      `}</style>
    </div>
  );
};

export default Signup;
