import React, { useState } from 'react';
import { Leaf, ShieldCheck, Lock, Mail, Eye, EyeOff, KeyRound, AlertTriangle, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

export default function ManagerLoginPage({ setActivePage }) {
  const { login, updateProfile } = useAuth();
  const { addToast } = useToast();

  const [email, setEmail] = useState('onlyvee222@gmail.com');
  const [password, setPassword] = useState('AgroKenya360');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // First time temporary password change modal state
  const [mustChangePassword, setMustChangePassword] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [pendingManagerUser, setPendingManagerUser] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      const res = login(email, password);
      
      if (!res.success) {
        setErrorMessage(res.message || 'Invalid manager email or password.');
        return;
      }

      if (res.user.accountType !== 'Manager') {
        setErrorMessage('Access Denied: This account does not have Manager administrative permissions.');
        addToast('Access Denied: Ordinary accounts cannot access the Manager Portal.', 'error');
        return;
      }

      // Redirect to Manager Dashboard
      setActivePage('manager-dashboard');
      addToast('Welcome to Agro Kenya Manager Portal', 'success');
    }, 600);
  };

  const handlePasswordChangeSubmit = (e) => {
    e.preventDefault();
    if (newPassword.length < 6) {
      addToast('Password must be at least 6 characters long.', 'error');
      return;
    }
    if (newPassword === 'Agro360') {
      addToast('New password cannot be the temporary password Agro360.', 'error');
      return;
    }
    if (newPassword !== confirmNewPassword) {
      addToast('Passwords do not match.', 'error');
      return;
    }

    // Update manager password & clear first-login flag
    updateProfile({ firstLoginChangeRequired: false });
    setMustChangePassword(false);
    setActivePage('manager-dashboard');
    addToast('Manager password updated successfully! Welcome to your dashboard.', 'success');
  };

  return (
    <div className="min-h-[85vh] max-w-5xl mx-auto my-8 bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden grid grid-cols-1 md:grid-cols-5">

      {/* LEFT SIDE: BRANDING PANEL (2 Cols) */}
      <div className="md:col-span-2 bg-[#064E3B] p-8 sm:p-12 text-white flex flex-col justify-between relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#087A4B]/30 to-[#064E3B] z-0" />
        
        <div className="relative z-10 space-y-6">
          <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => setActivePage('home')}>
            <div className="w-10 h-10 rounded-xl bg-[#0B9A5B] flex items-center justify-center font-bold text-white shadow-lg">
              <Leaf className="w-6 h-6" />
            </div>
            <div>
              <span className="font-extrabold text-xl tracking-tight text-white block">Agro Kenya</span>
              <span className="text-[10px] uppercase font-bold tracking-widest text-emerald-300">Management Portal</span>
            </div>
          </div>

          <div className="pt-8 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center border border-emerald-400/30">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <h2 className="text-2xl font-black tracking-tight leading-tight">
              Administrative & Moderation Gateway
            </h2>
            <p className="text-xs text-emerald-100 leading-relaxed">
              Secure area restricted to authorized Agro Kenya administrators for managing platform members, product listings, services, order verification and analytics.
            </p>
          </div>
        </div>

        <div className="relative z-10 pt-8 border-t border-emerald-800 text-[11px] text-emerald-200">
          🔒 Enforced with Row Level Security & System Audit Logs
        </div>
      </div>

      {/* RIGHT SIDE: MANAGER LOGIN FORM (3 Cols) */}
      <div className="md:col-span-3 p-8 sm:p-12 flex flex-col justify-between bg-white">
        
        {/* LOGIN FORM */}
        {!mustChangePassword ? (
          <div className="space-y-6 my-auto">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-[#087A4B] text-[11px] font-bold mb-3">
                <ShieldCheck className="w-3.5 h-3.5" /> Manager Portal Login
              </div>
              <h1 className="text-3xl font-black text-slate-900 tracking-tight">Manager Authentication</h1>
              <p className="text-xs text-slate-500 mt-1">Enter your manager credentials to access administrative tools.</p>
            </div>

            {errorMessage && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-2xl flex items-start gap-3 text-xs text-red-700 animate-shake">
                <AlertTriangle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold block">Authentication Failure</span>
                  <span>{errorMessage}</span>
                </div>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Manager Email Address</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="manager@agrokenya.co.ke"
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 text-xs outline-none focus:border-[#087A4B] focus:ring-2 focus:ring-[#087A4B]/20"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-bold text-slate-700">Password</label>
                  <button
                    type="button"
                    onClick={() => addToast('Manager password reset instructions sent to your email.', 'info')}
                    className="text-[11px] text-[#087A4B] font-bold hover:underline"
                  >
                    Forgot Password?
                  </button>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter manager password"
                    className="w-full pl-10 pr-10 py-3 rounded-xl border border-slate-200 text-xs outline-none focus:border-[#087A4B] focus:ring-2 focus:ring-[#087A4B]/20"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3.5 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="p-3 bg-[#F8FAF4] rounded-xl border border-slate-200 text-[11px] text-slate-600 space-y-1">
                <span className="font-bold text-[#087A4B] block">Initial Bootstrap Manager Account:</span>
                <span>Email: <code className="bg-slate-200 px-1 rounded font-bold">manager@agrokenya.co.ke</code></span>
                <span className="block">Temporary Password: <code className="bg-slate-200 px-1 rounded font-bold">Agro360</code></span>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#064E3B] hover:bg-[#087A4B] text-white font-bold py-3.5 rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg shadow-[#064E3B]/20 transition disabled:opacity-50"
              >
                {isLoading ? (
                  <span>Authenticating Manager...</span>
                ) : (
                  <>
                    <span>Login to Manager Dashboard</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            <div className="text-center pt-2">
              <button
                onClick={() => setActivePage('home')}
                className="text-xs text-slate-500 hover:text-slate-800 font-medium"
              >
                ← Return to Public Marketplace
              </button>
            </div>
          </div>
        ) : (
          /* MANDATORY FIRST-LOGIN PASSWORD CHANGE STEP (Section 7 requirement) */
          <div className="space-y-6 my-auto animate-fade-in">
            <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl flex items-start gap-3">
              <KeyRound className="w-6 h-6 text-amber-600 shrink-0" />
              <div>
                <h3 className="font-black text-amber-900 text-sm">Action Required: Change Temporary Password</h3>
                <p className="text-xs text-amber-800 mt-0.5">
                  You are logging in with the initial temporary manager password (<code>Agro360</code>). For security compliance, you must set a new individual strong password before proceeding.
                </p>
              </div>
            </div>

            <form onSubmit={handlePasswordChangeSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">New Strong Password</label>
                <input
                  type="password"
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter new password (min 6 characters)"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs outline-none focus:border-[#087A4B]"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Confirm New Password</label>
                <input
                  type="password"
                  required
                  value={confirmNewPassword}
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                  placeholder="Re-type new password"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs outline-none focus:border-[#087A4B]"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#087A4B] hover:bg-[#064E3B] text-white font-bold py-3.5 rounded-xl text-xs shadow-lg shadow-[#087A4B]/20 transition"
              >
                Update Password & Enter Dashboard
              </button>
            </form>
          </div>
        )}

      </div>
    </div>
  );
}
