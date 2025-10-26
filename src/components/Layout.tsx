import React, { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-cream-50 via-beige-50 to-luxury-50 text-coffee-900">
      <Navbar />
      <main className={`flex-1 ${isHomePage ? '' : 'pt-20'}`}>
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;