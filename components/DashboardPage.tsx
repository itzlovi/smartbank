
import React from 'react';
import { LogoutIcon } from './icons';

interface DashboardPageProps {
  username: string;
  onLogout: () => void;
}

const transactions = [
  { id: 1, date: '2023-10-27', description: 'Online Shopping - TechStore', amount: -250.00, type: 'debit' },
  { id: 2, date: '2023-10-26', description: 'Salary Deposit - Acme Corp', amount: 3500.00, type: 'credit' },
  { id: 3, date: '2023-10-25', description: 'Coffee Shop - The Daily Grind', amount: -5.75, type: 'debit' },
  { id: 4, date: '2023-10-24', description: 'ATM Withdrawal', amount: -100.00, type: 'debit' },
];

const DashboardPage: React.FC<DashboardPageProps> = ({ username, onLogout }) => {
  return (
    <div className="mx-auto max-w-4xl w-full">
      <div className="bg-white rounded-xl shadow-2xl p-6 sm:p-8">
        <header className="flex justify-between items-center mb-8 border-b pb-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Welcome, {username}</h1>
            <p className="text-gray-500">Your financial dashboard</p>
          </div>
          <button
            onClick={onLogout}
            className="flex items-center gap-2 bg-gray-200 text-gray-700 font-semibold px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors"
          >
            <LogoutIcon className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </header>

        <section className="mb-8">
            <div className="bg-blue-600 text-white p-6 rounded-lg shadow-lg">
                <h2 className="text-lg font-semibold text-blue-200">Account Balance</h2>
                <p className="text-4xl font-bold mt-2">₹1,25,600.75</p>
                <p className="text-sm text-blue-100 mt-1">Available as of today</p>
            </div>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-4">Recent Transactions</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Amount (₹)</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {transactions.map(tx => (
                  <tr key={tx.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{tx.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{tx.description}</td>
                    <td className={`px-6 py-4 whitespace-nowrap text-sm text-right font-semibold ${tx.type === 'credit' ? 'text-green-600' : 'text-red-600'}`}>
                      {tx.amount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
};

export default DashboardPage;
