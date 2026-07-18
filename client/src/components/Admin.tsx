import React, { useState, useEffect } from 'react';

export default function Admin() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [messages, setMessages] = useState<any[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Check if we are already logged in (token exists)
  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      setIsLoggedIn(true);
      fetchMessages(token);
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('adminToken', data.session.access_token); 
        setIsLoggedIn(true);
        fetchMessages(data.session.access_token);
      } else {
        setError(data.error || 'Invalid credentials');
      }
    } catch (err) {
      setError('Cannot connect to server.');
    } finally {
      setLoading(false);
    }
  };

  const fetchMessages = async (token: string) => {
    try {
      const response = await fetch('http://localhost:5000/api/admin/contacts', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      console.log("Fetch messages response status:", response.status);
      const data = await response.json();
      
      if (response.ok) {
        setMessages(data);
      } else if (response.status === 401 || response.status === 403) {
        console.warn("Auth failed, logging out due to status:", response.status);
        handleLogout();
      } else {
        console.error("Fetch failed with data:", data);
      }
    } catch (err) {
      console.error('Failed to fetch messages', err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    setIsLoggedIn(false);
    setMessages([]);
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900 px-4">
        <form onSubmit={handleLogin} className="bg-slate-800 p-8 rounded-lg border border-slate-700 w-full max-w-md shadow-2xl">
          <h2 className="text-2xl font-bold text-slate-100 mb-6 text-center">Admin Access</h2>
          {error && <div className="mb-4 p-3 bg-rose-500/10 border border-rose-500/20 text-rose-400 text-sm rounded">{error}</div>}
          
          <div className="mb-4">
            <label className="block text-xs font-mono text-slate-400 mb-1">Email</label>
            <input 
              type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded px-4 py-2 text-slate-200 focus:outline-none focus:border-cyan-400"
            />
          </div>
          <div className="mb-6">
            <label className="block text-xs font-mono text-slate-400 mb-1">Password</label>
            <input 
              type="password" required value={password} onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded px-4 py-2 text-slate-200 focus:outline-none focus:border-cyan-400"
            />
          </div>
          <button type="submit" disabled={loading} className="w-full py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-bold rounded transition">
            {loading ? 'Authenticating...' : 'Login'}
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8 border-b border-slate-800 pb-4">
          <h1 className="text-3xl font-bold">Inbox Dashboard</h1>
          <button onClick={handleLogout} className="px-4 py-2 border border-slate-700 hover:border-rose-400 hover:text-rose-400 rounded transition text-sm">
            Logout
          </button>
        </div>

        <div className="bg-slate-800/50 rounded-lg border border-slate-700 overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-800 text-slate-400 text-sm uppercase tracking-wider">
                <th className="p-4 border-b border-slate-700">Date</th>
                <th className="p-4 border-b border-slate-700">Name</th>
                <th className="p-4 border-b border-slate-700">Email</th>
                <th className="p-4 border-b border-slate-700">Subject</th>
                <th className="p-4 border-b border-slate-700">Message</th>
              </tr>
            </thead>
            <tbody>
              {messages.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-slate-500">No messages yet.</td>
                </tr>
              ) : (
                messages.map((msg, idx) => (
                  <tr key={idx} className="hover:bg-slate-800/80 transition border-b border-slate-700/50">
                    <td className="p-4 text-sm text-slate-400">{new Date(msg.createdAt).toLocaleDateString()}</td>
                    <td className="p-4 font-medium text-slate-200">{msg.name}</td>
                    <td className="p-4 text-cyan-400 text-sm">{msg.email}</td>
                    <td className="p-4 text-slate-300">{msg.subject}</td>
                    <td className="p-4 text-sm text-slate-400 max-w-xs truncate">{msg.message}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}