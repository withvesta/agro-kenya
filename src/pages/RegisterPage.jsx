import React, { useState } from 'react';
import { Leaf, User, Mail, Phone, MapPin, Lock, CheckCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { ACCOUNT_TYPES } from '../data/categories';
import { KENYA_COUNTIES } from '../data/kenyaCounties';

export default function RegisterPage({ setActivePage }) {
  const { register } = useAuth();

  const [formData, setFormData] = useState({
    fullName: '',
    businessName: '',
    email: '',
    phone: '',
    county: 'Nakuru',
    accountType: 'Farmer',
    password: '',
    confirmPassword: '',
    agreeTerms: true
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    const res = register(formData);
    if (res.success) {
      setActivePage('dashboard');
    }
  };

  return (
    <div className="min-h-[85vh] py-8 max-w-xl mx-auto px-4">
      <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-2xl border border-slate-100 relative overflow-hidden">

        {/* LOGO */}
        <div className="flex justify-center mb-4">
          <div className="w-12 h-12 rounded-2xl bg-[#087A4B] text-white flex items-center justify-center font-bold shadow-lg">
            <Leaf className="w-7 h-7" />
          </div>
        </div>

        <div className="text-center mb-6">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">Create Your Account</h2>
          <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
            Join Agro Kenya and be part of a growing community of farmers, buyers and service providers.
          </p>
        </div>

        {/* ACCOUNT TYPE PILLS SELECTOR MATCHING MOCKUP 2 */}
        <div className="mb-6">
          <label className="text-xs font-bold text-slate-700 block mb-2 text-center uppercase tracking-wider">Select Account Type</label>
          <div className="flex flex-wrap gap-2 justify-center">
            {ACCOUNT_TYPES.map((type) => (
              <button
                type="button"
                key={type.id}
                onClick={() => setFormData({ ...formData, accountType: type.id })}
                className={`px-4 py-2 rounded-full text-xs font-bold transition shadow-sm ${
                  formData.accountType === type.id
                    ? 'bg-[#087A4B] text-white shadow-md scale-105'
                    : 'bg-[#F8FAF4] text-slate-700 border border-slate-200 hover:border-[#087A4B]'
                }`}
              >
                {type.label}
              </button>
            ))}
          </div>
        </div>

        {/* REGISTRATION FORM */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">

          <div>
            <label className="font-bold text-slate-700 block mb-1">Full Name *</label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
              <input
                type="text"
                required
                placeholder="Enter your full name"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 outline-none focus:border-[#087A4B]"
              />
            </div>
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">Business / Farm Name (Optional)</label>
            <input
              type="text"
              placeholder="e.g. Mwangi Fresh Produce Ltd"
              value={formData.businessName}
              onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
              className="w-full p-3 rounded-xl border border-slate-200 outline-none focus:border-[#087A4B]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="font-bold text-slate-700 block mb-1">Email Address *</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                <input
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 outline-none focus:border-[#087A4B]"
                />
              </div>
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Phone Number *</label>
              <div className="relative">
                <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                <input
                  type="tel"
                  required
                  placeholder="+254 712 345 678"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 outline-none focus:border-[#087A4B]"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">County (Location in Kenya)</label>
            <div className="relative">
              <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
              <select
                value={formData.county}
                onChange={(e) => setFormData({ ...formData, county: e.target.value })}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 bg-white outline-none focus:border-[#087A4B]"
              >
                {KENYA_COUNTIES.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="font-bold text-slate-700 block mb-1">Password *</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                <input
                  type="password"
                  required
                  placeholder="Create password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 outline-none focus:border-[#087A4B]"
                />
              </div>
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Confirm Password *</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                <input
                  type="password"
                  required
                  placeholder="Repeat password"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 outline-none focus:border-[#087A4B]"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 pt-2">
            <input
              type="checkbox"
              id="terms"
              checked={formData.agreeTerms}
              onChange={(e) => setFormData({ ...formData, agreeTerms: e.target.checked })}
              className="rounded text-[#087A4B] focus:ring-[#087A4B]"
              required
            />
            <label htmlFor="terms" className="text-slate-600">
              I agree to the <button type="button" onClick={() => setActivePage('terms')} className="text-[#087A4B] font-bold hover:underline">Agro Kenya Terms & Policies</button>
            </label>
          </div>

          <button
            type="submit"
            className="w-full bg-[#087A4B] hover:bg-[#064E3B] text-white font-bold py-3.5 rounded-xl text-sm shadow-lg shadow-[#087A4B]/20 transition mt-2"
          >
            Register Account
          </button>

        </form>

        <div className="mt-6 pt-4 border-t border-slate-100 text-center text-xs text-slate-500">
          Already have an account?{' '}
          <button
            onClick={() => setActivePage('login')}
            className="text-[#087A4B] font-bold hover:underline"
          >
            Login
          </button>
        </div>

      </div>
    </div>
  );
}
