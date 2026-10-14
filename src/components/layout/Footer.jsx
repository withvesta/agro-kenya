import React from 'react';
import { Leaf, Phone, Mail, MapPin, ShieldCheck, Heart } from 'lucide-react';

export default function Footer({ setActivePage }) {
  return (
    <footer className="bg-[#064E3B] text-white pt-16 pb-8 border-t border-emerald-900 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-emerald-800/60">

          {/* BRAND COLUMN */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-[#0B9A5B] flex items-center justify-center text-white shadow-md">
                <Leaf className="w-6 h-6" />
              </div>
              <span className="text-2xl font-black tracking-tight text-white">Agro Kenya</span>
            </div>
            <p className="text-emerald-100 text-sm mb-6 max-w-sm leading-relaxed">
              Together for a Thriving Agriculture. Connecting farmers, buyers, land owners, and machinery providers across all 47 counties of Kenya.
            </p>
            <div className="flex flex-col gap-2.5 text-xs text-emerald-200">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#0B9A5B]" />
                <span>+254 700 123 456 / +254 712 345 678</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#0B9A5B]" />
                <span>info@agrokenya.co.ke</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#0B9A5B]" />
                <span>Agri-Innovation Hub, Westlands, Nairobi, Kenya</span>
              </div>
            </div>
          </div>

          {/* MARKETPLACE LINKS */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-emerald-300 mb-4">Marketplace</h4>
            <ul className="space-y-2 text-xs text-emerald-100">
              <li><button onClick={() => { setActivePage('marketplace'); window.scrollTo(0,0); }} className="hover:text-emerald-300 transition">Farm Produce</button></li>
              <li><button onClick={() => { setActivePage('marketplace'); window.scrollTo(0,0); }} className="hover:text-emerald-300 transition">Machinery & Tractors</button></li>
              <li><button onClick={() => { setActivePage('marketplace'); window.scrollTo(0,0); }} className="hover:text-emerald-300 transition">Land Leasing & Plots</button></li>
              <li><button onClick={() => { setActivePage('marketplace'); window.scrollTo(0,0); }} className="hover:text-emerald-300 transition">Agricultural Inputs & Seeds</button></li>
              <li><button onClick={() => { setActivePage('marketplace'); window.scrollTo(0,0); }} className="hover:text-emerald-300 transition">Farm Services & Transport</button></li>
              <li><button onClick={() => { setActivePage('marketplace'); window.scrollTo(0,0); }} className="hover:text-emerald-300 transition">Livestock & Feed</button></li>
            </ul>
          </div>

          {/* COMPANY & MEMBERS */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-emerald-300 mb-4">Company</h4>
            <ul className="space-y-2 text-xs text-emerald-100">
              <li><button onClick={() => { setActivePage('about'); window.scrollTo(0,0); }} className="hover:text-emerald-300 transition">About Agro Kenya</button></li>
              <li><button onClick={() => { setActivePage('members'); window.scrollTo(0,0); }} className="hover:text-emerald-300 transition">Our Members</button></li>
              <li><button onClick={() => { setActivePage('contact'); window.scrollTo(0,0); }} className="hover:text-emerald-300 transition">Contact Us</button></li>
              <li><button onClick={() => { setActivePage('register'); window.scrollTo(0,0); }} className="hover:text-emerald-300 transition">Become a Verified Seller</button></li>
            </ul>
          </div>

          {/* SUPPORT & SAFETY */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-emerald-300 mb-4">Safety & Legal</h4>
            <ul className="space-y-2 text-xs text-emerald-100">
              <li><button onClick={() => { setActivePage('terms'); window.scrollTo(0,0); }} className="hover:text-emerald-300 transition">Terms of Service</button></li>
              <li><button onClick={() => { setActivePage('privacy'); window.scrollTo(0,0); }} className="hover:text-emerald-300 transition">Privacy Policy</button></li>
              <li><button onClick={() => { setActivePage('safety'); window.scrollTo(0,0); }} className="hover:text-emerald-300 transition">Marketplace Safety Tips</button></li>
              <li><button onClick={() => { setActivePage('contact'); window.scrollTo(0,0); }} className="hover:text-emerald-300 transition">Report a Problem</button></li>
              <li><button onClick={() => { setActivePage('contact'); window.scrollTo(0,0); }} className="hover:text-emerald-300 transition">Help Center</button></li>
              <li><button onClick={() => { setActivePage('manager-login'); window.scrollTo(0,0); }} className="hover:text-emerald-300 transition font-medium text-emerald-300/80 hover:text-emerald-200">🔒 Staff / Manager Portal</button></li>
            </ul>
          </div>

        </div>

        {/* BOTTOM BAR */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-emerald-300/80 gap-4">
          <p>© 2026 Agro Kenya. All rights reserved. Built for Kenyan Farmers & Agri-Businesses.</p>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1"><ShieldCheck className="w-4 h-4 text-[#0B9A5B]" /> Verified Marketplace</span>
            <span className="flex items-center gap-1">Smart Farming • Better Markets • A Greener Future</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
