
import React, { useState, useEffect } from 'react';
import { UserProfile, UserRole } from './types';
import Layout from './components/Layout';
import Login from './pages/Login';
import CustomerHome from './pages/CustomerHome';
import SupermarketDashboard from './pages/SupermarketDashboard';
import Profile from './pages/Profile';

const App: React.FC = () => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [currentPage, setCurrentPage] = useState('home');

  // Check if there's a user in local storage (basic persistence)
  useEffect(() => {
    const savedUser = localStorage.getItem('market_catalog_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogin = (userData: UserProfile) => {
    setUser(userData);
    localStorage.setItem('market_catalog_user', JSON.stringify(userData));
    setCurrentPage(userData.role === UserRole.CUSTOMER ? 'home' : 'dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('market_catalog_user');
    setCurrentPage('login');
  };

  const handleUpdateUser = (updatedUser: UserProfile) => {
    setUser(updatedUser);
    localStorage.setItem('market_catalog_user', JSON.stringify(updatedUser));
  };

  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return user.role === UserRole.CUSTOMER ? (
          <CustomerHome user={user} onUpdateUser={handleUpdateUser} />
        ) : (
          <SupermarketDashboard user={user} />
        );
      case 'dashboard':
        return <SupermarketDashboard user={user} />;
      case 'profile':
        return <Profile user={user} onUpdateUser={handleUpdateUser} />;
      case 'favorites':
        return (
          <div className="py-12 text-center text-gray-500">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Seus Favoritos</h2>
            <p>Em breve você verá aqui apenas os mercados que segue.</p>
          </div>
        );
      default:
        return <CustomerHome user={user} onUpdateUser={handleUpdateUser} />;
    }
  };

  return (
    <Layout 
      user={user} 
      onLogout={handleLogout} 
      onNavigate={setCurrentPage} 
      currentPage={currentPage}
    >
      {renderPage()}
    </Layout>
  );
};

export default App;
