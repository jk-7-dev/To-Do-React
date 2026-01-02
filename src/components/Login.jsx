import React, { useState } from 'react';
import { useRouter } from '@tanstack/react-router';
import axios from 'axios';

const Auth = () => {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ userName: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Determine endpoint based on mode
    const endpoint = isLogin ? '/login' : '/register';
    
    try {
      const res = await axios.post(`http://localhost:8080/api${endpoint}`, {
        user_name: formData.userName,
        email: formData.email,
        password: formData.password
      });
      
      if (isLogin) {
        // Save token and navigate to dashboard
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('user_id', res.data.user_id);
        router.navigate({ to: '/dashboard' });
      } else {
        alert("Registration successful! Please login.");
        setIsLogin(true); // Switch to login mode
      }
    } catch (err) {
      alert(err.response?.data || "Operation failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-violet-500 to-indigo-400 flex items-center justify-center min-h-screen font-sans">
      <div className="bg-white/20 backdrop-blur-md shadow-2xl rounded-2xl p-8 w-full max-w-sm border border-white/30">
        <h1 className="text-4xl font-bold mb-6 text-center text-white">
          {isLogin ? "Login" : "Register"}
        </h1>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <input
              type="text"
              placeholder="Username"
              className="w-full bg-white/90 p-3 rounded-xl outline-none"
              value={formData.userName}
              onChange={(e) => setFormData({...formData, userName: e.target.value})}
              required
            />
          )}
          <input
            type="email"
            placeholder="Email"
            className="w-full bg-white/90 p-3 rounded-xl outline-none"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full bg-white/90 p-3 rounded-xl outline-none"
            value={formData.password}
            onChange={(e) => setFormData({...formData, password: e.target.value})}
            required
          />
          <button type="submit" disabled={loading} className="w-full bg-indigo-600 text-white py-3 rounded-xl font-bold hover:bg-indigo-700 transition-all active:scale-95 shadow-lg">
            {loading ? "Processing..." : (isLogin ? "Login" : "Create Account")}
          </button>
        </form>

        <p 
          className="mt-6 text-center text-white/80 cursor-pointer hover:text-white transition-all underline decoration-white/30" 
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin ? "Need an account? Register here" : "Already have an account? Login"}
        </p>
      </div>
    </div>
  );
};

export default Auth;