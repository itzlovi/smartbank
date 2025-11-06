
import React from 'react';
import { WarningIcon } from './icons';

interface AccessDeniedPageProps {
  onTryAgain: () => void;
}

const AccessDeniedPage: React.FC<AccessDeniedPageProps> = ({ onTryAgain }) => {
  return (
    <div className="mx-auto max-w-md w-full">
      <div className="bg-white rounded-xl shadow-2xl p-8 sm:p-10 text-center">
        <div className="flex justify-center mb-4">
          <WarningIcon className="w-16 h-16 text-red-500" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-red-600 mb-2">Access Denied</h1>
        <p className="text-gray-600 mb-8">Timing mismatch! For security, your login attempt was blocked.</p>
        <button
          onClick={onTryAgain}
          className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Try Again
        </button>
      </div>
    </div>
  );
};

export default AccessDeniedPage;
