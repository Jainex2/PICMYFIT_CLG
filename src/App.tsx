import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AuthProvider } from './context/AuthContext';
import { AppProvider } from './context/AppContext';
import ErrorBoundary from './components/ErrorBoundary';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import HomePage from './pages/HomePage';
import UploadPage from './pages/UploadPage';
import RecommendationsPage from './pages/RecommendationsPage';
import DashboardPage from './pages/DashboardPage';
import ProfilePage from './pages/ProfilePage';
import DiscoverPage from './pages/DiscoverPage';
import LoginPage from './pages/LoginPage';
import NotFoundPage from './pages/NotFoundPage';
import HelpCenterPage from './pages/HelpCenterPage';
import SizeGuidePage from './pages/SizeGuidePage';
import ReturnsPage from './pages/ReturnsPage';
import ContactPage from './pages/ContactPage';
import './index.css';

function App() {
  return (
    <ErrorBoundary>
      <HelmetProvider>
        <AuthProvider>
          <AppProvider>
            <Router>
              <Layout>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/upload" element={<UploadPage />} />
                  <Route path="/recommendations" element={<RecommendationsPage />} />
                  <Route path="/discover" element={<DiscoverPage />} />
                  <Route path="/help" element={<HelpCenterPage />} />
                  <Route path="/size-guide" element={<SizeGuidePage />} />
                  <Route path="/returns" element={<ReturnsPage />} />
                  <Route path="/contact" element={<ContactPage />} />
                  <Route 
                    path="/dashboard" 
                    element={
                      <ProtectedRoute>
                        <DashboardPage />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/profile" 
                    element={
                      <ProtectedRoute>
                        <ProfilePage />
                      </ProtectedRoute>
                    } 
                  />
                  {/* 404 Catch-all route - must be last */}
                  <Route path="*" element={<NotFoundPage />} />
                </Routes>
              </Layout>
            </Router>
          </AppProvider>
        </AuthProvider>
      </HelmetProvider>
    </ErrorBoundary>
  );
}

export default App;