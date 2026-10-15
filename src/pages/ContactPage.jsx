import React, { useState } from 'react';
import { Mail, Send, CheckCircle2, MessageSquare } from 'lucide-react';
import { useToast } from '../context/ToastContext';

export default function ContactPage() {
  const { addToast } = useToast();

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Enquiry',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    addToast("Thank you! Your message has been sent to Agro Kenya support team.", "success");
    setForm({ name: '', email: '', phone: '', subject: 'General Enquiry', message: '' });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 pb-16">

      {/* HEADER */}
      <section className="bg-gradient-to-br from-[#064E3B] to-[#087A4B] text-white py-12 px-6 sm:px-12 rounded-3xl shadow-xl text-center space-y-3">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Contact Agro Kenya</h1>
        <p className="text-emerald-100 text-sm max-w-lg mx-auto">
          Have a question about marketplace listings, account verification, or partnership opportunities? Get in touch with our team.
        </p>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

        {/* CONTACT INFORMATION */}
        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-6">
          <div>
            <h2 className="text-xl font-bold text-slate-900 mb-1">Get In Touch</h2>
            <p className="text-xs text-slate-500">Our support staff is available Monday to Saturday, 8:00 AM – 6:00 PM EAT.</p>
          </div>

          <div className="space-y-4 text-xs">
            <div className="flex items-start gap-4 p-6 rounded-2xl bg-[#F8FAF4] border border-[#087A4B]/20">
              <Mail className="w-6 h-6 text-[#087A4B] flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-slate-900 text-sm">Official Email Support</h4>
                <p className="text-slate-600 font-medium mt-1 text-xs">info@agrokenya.co.ke</p>
                <p className="text-slate-600 font-medium text-xs">support@agrokenya.co.ke</p>
                <p className="text-slate-400 text-[11px] mt-2">
                  All platform inquiries, seller verifications, and disputes are securely handled via official email.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CONTACT FORM MATCHING REQUIREMENT 32 */}
        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900 mb-6">Send Us a Message</h2>

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <label className="font-bold text-slate-700 block mb-1">Your Full Name *</label>
              <input
                type="text"
                required
                placeholder="e.g. John Mwangi"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full p-3 rounded-xl border border-slate-200 text-xs outline-none focus:border-[#087A4B]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Email Address *</label>
                <input
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full p-3 rounded-xl border border-slate-200 text-xs outline-none focus:border-[#087A4B]"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Phone Number *</label>
                <input
                  type="tel"
                  required
                  placeholder="+254 712 345 678"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full p-3 rounded-xl border border-slate-200 text-xs outline-none focus:border-[#087A4B]"
                />
              </div>
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Subject</label>
              <select
                value={form.subject}
                onChange={(e) => setForm({ ...form, subject: e.target.value })}
                className="w-full p-3 rounded-xl border border-slate-200 text-xs bg-white outline-none focus:border-[#087A4B]"
              >
                <option>General Enquiry</option>
                <option>Account Verification Request</option>
                <option>Report Fraudulent Listing</option>
                <option>Machinery & Land Listing Support</option>
                <option>Corporate Partnership</option>
              </select>
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Message *</label>
              <textarea
                rows={5}
                required
                placeholder="How can we assist you today?"
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full p-3 rounded-xl border border-slate-200 text-xs outline-none focus:border-[#087A4B]"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#087A4B] hover:bg-[#064E3B] text-white font-bold py-3.5 rounded-xl text-sm shadow-lg shadow-[#087A4B]/20 transition flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>Send Message</span>
            </button>
          </form>
        </div>

      </div>

    </div>
  );
}
