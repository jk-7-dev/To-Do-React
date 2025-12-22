import React, { useState } from 'react';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Logging in with:", email, password);
    onLogin();
  };

  return (
    <div className="bg-gradient-to-br from-pink-400 to-indigo-200 flex items-center justify-center min-h-screen text-gray-800">
      <div className="bg-gradient-to-br from-violet-200 to-pink-200 shadow-xl rounded-lg p-6 w-80">
        <h1 className="text-4xl font-display mb-6 text-center text-indigo-600 ">
          Todo App
        </h1>

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full border border-gray-300 px-3 py-2 text-sm rounded-md 
                       focus:outline-none focus:ring-2 focus:ring-indigo-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full border border-gray-300 px-3 py-2 text-sm rounded-md 
                       focus:outline-none focus:ring-2 focus:ring-indigo-400"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            className="w-full bg-indigo-500 text-white py-2 rounded-md text-sm 
                       hover:bg-indigo-600 transition-colors"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
