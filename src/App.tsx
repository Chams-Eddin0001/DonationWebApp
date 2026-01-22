import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Causes } from './pages/Causes';
import { Donate } from './pages/Donate';
import { Volunteer } from './pages/Volunteer';
import { Contact } from './pages/Contact';
import { AdminLogin } from './pages/AdminLogin';
import { AdminDashboard } from './pages/AdminDashboard';

type Page = 'home' | 'about' | 'causes' | 'donate' | 'volunteer' | 'contact' | 'admin-login' | 'admin-dashboard';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  useEffect(() => {
    // Check for secret admin portal hash
    if (window.location.hash === '#portal-admin-secure') {
      setCurrentPage('admin-login');
      // Clear hash to keep it secret-ish
      history.replaceState(null, '', ' ');
    }

    // Check for existing token
    const token = localStorage.getItem('adminToken');
    if (token) {
      setIsAdminLoggedIn(true);
    }
  }, []);

  const handleNavigate = (page: string) => {
    setCurrentPage(page as Page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAdminLogin = (token: string) => {
    localStorage.setItem('adminToken', token);
    setIsAdminLoggedIn(true);
    setCurrentPage('admin-dashboard');
  };

  const handleAdminLogout = () => {
    localStorage.removeItem('adminToken');
    setIsAdminLoggedIn(false);
    setCurrentPage('home');
  };

  useEffect(() => {
    document.title = getPageTitle(currentPage);
  }, [currentPage]);

  const getPageTitle = (page: Page): string => {
    const titles: Record<Page, string> = {
      home: 'CharityImpact - Building Better Futures Together',
      about: 'About Us - CharityImpact',
      causes: 'Our Causes - CharityImpact',
      donate: 'Donate - CharityImpact',
      volunteer: 'Volunteer - CharityImpact',
      contact: 'Contact Us - CharityImpact',
      'admin-login': 'Admin Login - CharityImpact',
      'admin-dashboard': 'Admin Dashboard - CharityImpact'
    };
    return titles[page];
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home onNavigate={handleNavigate} />;
      case 'about':
        return <About onNavigate={handleNavigate} />;
      case 'causes':
        return <Causes onNavigate={handleNavigate} />;
      case 'donate':
        return <Donate onNavigate={handleNavigate} />;
      case 'volunteer':
        return <Volunteer onNavigate={handleNavigate} />;
      case 'contact':
        return <Contact onNavigate={handleNavigate} />;
      case 'admin-login':
        return <AdminLogin onLoginSuccess={handleAdminLogin} />;
      case 'admin-dashboard':
        return isAdminLoggedIn ? (
          <AdminDashboard onLogout={handleAdminLogout} />
        ) : (
          <AdminLogin onLoginSuccess={handleAdminLogin} />
        );
      default:
        return <Home onNavigate={handleNavigate} />;
    }
  };

  if (currentPage === 'admin-login' || currentPage === 'admin-dashboard') {
    return (
      <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
        {renderPage()}
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header currentPage={currentPage} onNavigate={handleNavigate} />
      <main className="flex-grow">
        {renderPage()}
      </main>
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}

export default App;
