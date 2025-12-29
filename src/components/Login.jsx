import React, { useState } from 'react';
import { useRouter } from '@tanstack/react-router';

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();

    // Static check (you can change these to whatever you like)
    if (email === 'admin@todo.com' && password === 'password123') {
      // 1. Save a flag in localStorage so the app "remembers" you
      localStorage.setItem('isAuthenticated', 'true');
      
      // 2. Navigate to Dashboard using TanStack Router
      router.navigate({ to: '/dashboard' });
    } else {
      alert("Invalid credentials! Try admin@todo.com / password123");
    }
  };

  return (
    <div className="bg-gradient-to-br from-violet-500 to-indigo-400 flex items-center justify-center min-h-screen text-gray-800 font-sans">
      <div className="bg-white/20 backdrop-blur-md shadow-2xl rounded-2xl p-8 w-full max-w-sm border border-white/30">
        <h1 className="text-4xl font-bold mb-8 text-center text-white tracking-tight">
          Todo App
        </h1>

        <form onSubmit={handleLogin} className="space-y-5">
          <input
            type="email"
            placeholder="Email (admin@todo.com)"
            className="w-full bg-white/90 border-none px-4 py-3 text-base rounded-xl focus:ring-2 focus:ring-indigo-300 outline-none transition-all"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password (password123)"
            className="w-full bg-white/90 border-none px-4 py-3 text-base rounded-xl focus:ring-2 focus:ring-indigo-300 outline-none transition-all"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-xl text-lg font-bold hover:bg-indigo-700 transition-all shadow-lg active:scale-95"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;