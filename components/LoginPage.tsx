
import React, { useState, useRef, FormEvent } from 'react';
import { LockIcon, UserIcon } from './icons';

interface LoginPageProps {
  onLoginSuccess: (username: string) => void;
  onLoginFailure: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLoginSuccess, onLoginFailure }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const startTimeRef = useRef<number | null>(null);

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (startTimeRef.current === null && e.target.value.length > 0) {
      const now = Date.now();
      startTimeRef.current = now;
      console.log(`Password typing started at: ${new Date(now).toLocaleTimeString()}`);
    }
    setPassword(e.target.value);

    if (e.target.value.length === 0) {
      startTimeRef.current = null;
      console.log('Password cleared, timer reset.');
    }
  };
  
  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    if (!startTimeRef.current || !password) {
      alert("Please enter a password to start the timing mechanism.");
      return;
    }

    const endTime = Date.now();
    const totalTime = (endTime - startTimeRef.current) / 1000;

    console.log(`Login button clicked at: ${new Date(endTime).toLocaleTimeString()}`);
    console.log(`Total duration: ${totalTime.toFixed(2)} seconds`);

    // Reset for next attempt
    startTimeRef.current = null;
    setPassword('');
    
    if (totalTime >= 4 && totalTime <= 5) {
      console.log("Access Granted: Timing is correct.");
      onLoginSuccess(username || 'Valued Customer');
    } else {
      console.log("Access Denied: Timing mismatch.");
      onLoginFailure();
    }
  };

  return (
    <div className="mx-auto max-w-md w-full">
      <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
        <div className="p-8 sm:p-10">
          <h1 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-2">SmartBank Secure Login</h1>
          <p className="text-center text-gray-500 mb-8">Welcome back. Please login to your account.</p>
          
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <UserIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              />
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <LockIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="password"
                value={password}
                onChange={handlePasswordChange}
                placeholder="Password"
                className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Login
            </button>
          </form>

          <p className="text-center text-xs text-gray-400 mt-6">
            Access time sensitivity enabled.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
