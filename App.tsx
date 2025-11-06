
import React, { useState, useCallback } from 'react';
import LoginPage from './components/LoginPage';
import DashboardPage from './components/DashboardPage';
import AccessDeniedPage from './components/AccessDeniedPage';

type View = 'login' | 'dashboard' | 'denied';

const App: React.FC = () => {
  const [view, setView] = useState<View>('login');
  const [username, setUsername] = useState<string>('');

  const handleLoginSuccess = useCallback((user: string) => {
    setUsername(user);
    setView('dashboard');
  }, []);

  const handleLoginFailure = useCallback(() => {
    setView('denied');
  }, []);

  const handleLogout = useCallback(() => {
    setUsername('');
    setView('login');
  }, []);

  const handleTryAgain = useCallback(() => {
    setView('login');
  }, []);

  const renderView = () => {
    switch (view) {
      case 'dashboard':
        return <DashboardPage username={username} onLogout={handleLogout} />;
      case 'denied':
        return <AccessDeniedPage onTryAgain={handleTryAgain} />;
      case 'login':
      default:
        return <LoginPage onLoginSuccess={handleLoginSuccess} onLoginFailure={handleLoginFailure} />;
    }
  };

  return (
    <main className="min-h-screen w-full bg-gradient-to-br from-blue-50 via-gray-50 to-white font-sans text-gray-800 flex items-center justify-center p-4">
      <div className="w-full transition-all duration-500">
        {renderView()}
      </div>
    </main>
  );
};

export default App;
