import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const VALID_CREDENTIALS = [
  { email: 'flyolaadmin@gmail.com', password: 'flyola@123' },
  { email: 'admin@gmail.com', password: 'admin@123' }
];

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const match = VALID_CREDENTIALS.find(
      (cred) => cred.email === email && cred.password === password
    );
    if (match) {
      localStorage.setItem('isAuthenticated', 'true');
      navigate('/dashboard', { replace: true });
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100">
      <div className="max-w-md w-full mx-4 p-8 bg-white rounded-xl shadow-2xl transform transition-all hover:scale-[1.02]">
        <h2 className="text-3xl font-extrabold mb-6 text-center text-gray-800 bg-gradient-to-r from-blue-600 to-blue-600 bg-clip-text text-transparent">
          Admin Login
        </h2>
        
        {error && (
          <p className="text-red-500 mb-6 p-3 bg-red-50 rounded-lg text-center animate-pulse">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
              className="w-full p-3 pl-10 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 hover:border-indigo-300"
            />
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">✉️</span>
          </div>

          <div className="relative">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
              className="w-full p-3 pl-10 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 hover:border-indigo-300"
            />
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">🔒</span>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-blue-600 to-blue-600 text-white rounded-lg font-semibold hover:from-indigo-700 hover:to-purple-700 transform transition-all duration-300 hover:scale-[1.03] focus:ring-4 focus:ring-indigo-200"
          >
            Login
          </button>
        </form>

      
      </div>
    </div>
  );
};

export default Login;