import React, { useState } from 'react';
import { Leaf, Phone, Lock, ArrowRight, ShieldCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function LoginPage({ setActivePage }) {
  const { login } = useAuth();
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const res = login(emailOrPhone, password);
    if (res.success) {
      if (res.user.accountType === 'Manager') {
        setActivePage('admin');
      } else {
        setActivePage('dashboard');
      }
    }
  };

  return (
    <div className="min-h-[80vh] max-w-6xl mx-auto my-8 bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden grid grid-cols-1 md:grid-cols-2">

      {/* LEFT SIDE: LOGIN FORM MATCHING MOCKUP 5 */}
      <div className="p-8 sm:p-12 flex flex-col justify-between">
        <div>
          {/* LOGO */}
          <div className="flex items-center gap-2 mb-8 cursor-pointer" onClick={() => setActivePage('home')}>
            <div className="w-9 h-9 rounded-xl bg-[#087A4B] text-white flex items-center justify-center font-bold">
              <Leaf className="w-5 h-5" />
            </div>
            <div>
              <span className="font-extrabold text-lg text-[#064E3B]">Agro Kenya</span>
              <span className="text-[9px] uppercase font-bold tracking-widest text-[#0B9A5B] block -mt-1">Connect • Trade • Grow</span>
            </div>
          </div>

          <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-2">Welcome Back!</h2>
          <p className="text-xs text-slate-500 mb-8">
            Login to your Agro Kenya account to manage listings or contact sellers.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4" autoComplete="off">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Phone Number or Email</label>
              <div className="relative">
                <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                <input
                  type="text"
                  required
                  autoComplete="off"
                  value={emailOrPhone}
                  onChange={(e) => setEmailOrPhone(e.target.value)}
                  placeholder="Enter your phone number or email"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 text-xs outline-none focus:border-[#087A4B] focus:ring-2 focus:ring-[#087A4B]/20"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-bold text-slate-700">Password</label>
                <button
                  type="button"
                  onClick={() => alert("Password reset instructions will be sent to your registered email.")}
                  className="text-[11px] text-[#087A4B] font-bold hover:underline"
                >
                  Forgot Password?
                </button>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                <input
                  type="password"
                  required
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 text-xs outline-none focus:border-[#087A4B] focus:ring-2 focus:ring-[#087A4B]/20"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-[#087A4B] hover:bg-[#064E3B] text-white font-bold py-3.5 rounded-xl text-sm shadow-lg shadow-[#087A4B]/20 transition"
            >
              Login
            </button>
          </form>

        </div>

        <div className="mt-8 pt-4 border-t border-slate-100 flex flex-col gap-2 text-center text-xs text-slate-500">
          <div>
            Don't have an account yet?{' '}
            <button
              onClick={() => setActivePage('register')}
              className="text-[#087A4B] font-bold hover:underline"
            >
              Create Account
            </button>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE: FARMLAND GRAPHIC & OVERLAY MATCHING MOCKUP 5 */}
      <div className="hidden md:block relative bg-[#064E3B] p-12 text-white flex flex-col justify-end overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=1000"
          alt="Kenyan Farmland"
          className="absolute inset-0 w-full h-full object-cover opacity-50 mix-blend-overlay"
        />
        <div className="relative z-10 space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-[#0B9A5B] flex items-center justify-center shadow-lg mb-4">
            <ShieldCheck className="w-7 h-7" />
          </div>
          <h3 className="text-3xl font-black tracking-tight leading-tight">
            Better Connections<br />Greater Opportunities
          </h3>
          <p className="text-emerald-100 text-xs leading-relaxed max-w-sm">
            Farmers, buyers, machinery providers and land owners — all in one trusted agricultural marketplace across Kenya.
          </p>
        </div>
      </div>

    </div>
  );
}
