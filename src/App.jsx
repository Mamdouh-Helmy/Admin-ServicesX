import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext.jsx';

// Auth Components
import Login from './components/auth/Login.jsx';
import Register from './components/auth/Register.jsx';
import ForgotPassword from './components/auth/ForgotPassword.jsx';
import VerifyOTP from './components/auth/VerifyOTP.jsx';
import ResetPassword from './components/auth/ResetPassword.jsx';

// Dashboard Components
import ProtectedRoute from './components/ProtectedRoute.jsx';
import DashboardLayout from './components/dashboard/DashboardLayout.jsx';
import Home from './components/dashboard/Home.jsx';
import AddService from './components/dashboard/AddService.jsx';
import Services from './components/dashboard/Services.jsx';
import CreateCode from './components/dashboard/CreateCode.jsx';
import Codes from './components/dashboard/Codes.jsx';
import PrivacyPolicy from './components/dashboard/PrivacyPolicy.jsx';
import FAQ from './components/dashboard/FAQ.jsx';
import Support from './components/dashboard/Support.jsx';

// Loading Spinner
import LoadingSpinner from './components/common/LoadingSpinner.jsx';

function App() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="xl" />
      </div>
    );
  }

  return (
    <Routes>
      {/* Redirect root to appropriate page */}
      <Route 
        path="/" 
        element={
          <Navigate to={user ? "/dashboard" : "/login"} replace />
        } 
      />

      {/* Auth Routes */}
      <Route path="/login" element={user ? <Navigate to="/dashboard" replace /> : <Login />} />
      <Route path="/register" element={user ? <Navigate to="/dashboard" replace /> : <Register />} />
      <Route path="/forgot-password" element={user ? <Navigate to="/dashboard" replace /> : <ForgotPassword />} />
      <Route path="/verify-otp" element={user ? <Navigate to="/dashboard" replace /> : <VerifyOTP />} />
      <Route path="/reset-password" element={user ? <Navigate to="/dashboard" replace /> : <ResetPassword />} />

      {/* Dashboard Routes */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Home />} />
        <Route path="add-service" element={<AddService />} />
        <Route path="services" element={<Services />} />
        <Route path="create-code" element={<CreateCode />} />
        <Route path="codes" element={<Codes />} />
        <Route path="privacy-policy" element={<PrivacyPolicy />} />
        <Route path="faq" element={<FAQ />} />
        <Route path="support" element={<Support />} />
      </Route>

      {/* Catch all route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;