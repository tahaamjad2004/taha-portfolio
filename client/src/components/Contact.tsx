import React, { useState, useRef } from 'react';
import ReCAPTCHA from 'react-google-recaptcha'; // 1. Import library

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState<{ type: 'success' | 'error' | null, message: string }>({ type: null, message: '' });
  const [loading, setLoading] = useState(false);
  const recaptchaRef = useRef<any>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: null, message: '' });

    // 3. Get the token from reCAPTCHA
    const token = recaptchaRef.current?.getValue();
    if (!token) {
      setStatus({ type: 'error', message: 'Please complete the reCAPTCHA.' });
      setLoading(false);
      return;
    }

    try {
      // 4. Send token to your backend
      const response = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, token }), 
      });

      const data = await response.json();

      if (response.ok) {
        setStatus({ type: 'success', message: 'Message sent successfully!' });
        setFormData({ name: '', email: '', subject: '', message: '' });
        recaptchaRef.current?.reset(); // Reset widget after success
      } else {
        setStatus({ type: 'error', message: data.error || 'Submission failed.' });
      }
    } catch (err) {
      setStatus({ type: 'error', message: 'Cannot connect to server.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-20 px-6 max-w-2xl mx-auto border-t border-slate-800 text-center">
      {/* ... (Keep your header elements as they were) ... */}
      <h2 className="text-4xl font-extrabold text-slate-100 mb-4">Get In Touch</h2>
      
      <form onSubmit={handleSubmit} className="text-left space-y-4">
        {/* ... (Keep your name, email, subject, and message inputs as they were) ... */}
        <div>
          <label className="block text-xs font-mono text-slate-400 mb-1">Name</label>
          <input type="text" required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full bg-slate-800 border border-slate-700 rounded px-4 py-2.5 text-slate-200 focus:outline-none focus:border-cyan-400 text-sm" />
        </div>
        <div>
          <label className="block text-xs font-mono text-slate-400 mb-1">Email</label>
          <input type="email" required value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full bg-slate-800 border border-slate-700 rounded px-4 py-2.5 text-slate-200 focus:outline-none focus:border-cyan-400 text-sm" />
        </div>
        <div>
          <label className="block text-xs font-mono text-slate-400 mb-1">Subject</label>
          <input type="text" required value={formData.subject} onChange={(e) => setFormData({...formData, subject: e.target.value})} className="w-full bg-slate-800 border border-slate-700 rounded px-4 py-2.5 text-slate-200 focus:outline-none focus:border-cyan-400 text-sm" />
        </div>
        <div>
          <label className="block text-xs font-mono text-slate-400 mb-1">Message</label>
          <textarea rows={5} required value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} className="w-full bg-slate-800 border border-slate-700 rounded px-4 py-2.5 text-slate-200 focus:outline-none focus:border-cyan-400 text-sm resize-none" />
        </div>

        {/* 5. Add reCAPTCHA widget here */}
        <div className="flex justify-center py-2">
          <ReCAPTCHA
            ref={recaptchaRef}
            sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
            theme="dark"
          />
        </div>

        {status.type && (
          <div className={`p-3 rounded text-sm font-medium ${status.type === 'success' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'}`}>
            {status.message}
          </div>
        )}

        <button type="submit" disabled={loading} className="w-full py-3 bg-slate-900 border border-cyan-400 text-cyan-400 rounded font-semibold text-sm hover:bg-cyan-400/10 transition disabled:opacity-50">
          {loading ? 'Sending...' : 'Send Message'}
        </button>
      </form>
    </section>
  );
}