import React from 'react';
import { ArrowRight, Wheat, Tractor, MapPin, Briefcase, ShieldCheck, Lock, Headphones, Users } from 'lucide-react';
import { useData } from '../context/DataContext';
import ListingCard from '../components/marketplace/ListingCard';

export default function HomePage({ setActivePage }) {
  const { listings, setActiveListingModal, setSelectedCategory } = useData();

  const featuredListings = listings.filter(l => l.featured || l.status === 'Active').slice(0, 4);

  const categoryCards = [
    {
      id: 'produce',
      name: 'Farm Produce',
      icon: Wheat,
      desc: 'Fresh & quality produce direct from trusted Kenyan farmers.',
      catFilter: 'Farm Produce'
    },
    {
      id: 'machinery',
      name: 'Machinery',
      icon: Tractor,
      desc: 'Modern equipment for better farming & high yield.',
      catFilter: 'Machinery'
    },
    {
      id: 'land',
      name: 'Land Leasing',
      icon: MapPin,
      desc: 'Find or lease suitable fertile agricultural land.',
      catFilter: 'Land Leasing'
    },
    {
      id: 'services',
      name: 'Agricultural Services',
      icon: Briefcase,
      desc: 'Inputs, transport, consultancy, irrigation & labour.',
      catFilter: 'Agricultural Services'
    }
  ];

  return (
    <div className="space-y-16 pb-16">

      {/* 1. HERO SECTION MATCHING MOCKUP 1 */}
      <section className="relative min-h-[520px] lg:min-h-[580px] flex items-center justify-center bg-slate-900 overflow-hidden">
        {/* HERO BACKGROUND IMAGE */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=1920"
            alt="Kenyan Farmland Hero"
            className="w-full h-full object-cover object-center scale-105 animate-pulse-glow"
          />
          <div className="absolute inset-0 hero-gradient-overlay" />
        </div>

        {/* HERO CONTENT */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white py-16">
          <span className="inline-flex items-center gap-2 bg-[#0B9A5B]/30 backdrop-blur-md text-emerald-200 text-xs font-bold px-4 py-1.5 rounded-full border border-emerald-400/30 mb-6">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            Kenya's Premier Agricultural Marketplace
          </span>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight text-white mb-4 drop-shadow-md">
            Together for a<br className="hidden sm:inline" /> Thriving Agriculture
          </h1>

          <p className="text-xl sm:text-2xl font-extrabold text-emerald-300 mb-4 tracking-wide">
            Buy • Sell • Lease • Grow
          </p>

          <p className="text-sm sm:text-base text-emerald-100 max-w-2xl mx-auto mb-8 font-normal leading-relaxed opacity-95">
            Connect farmers, buyers, sellers and service providers across all 47 counties of Kenya in one trusted digital agricultural marketplace.
          </p>

          {/* CTA BUTTONS */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => setActivePage('register')}
              className="bg-[#087A4B] hover:bg-[#064E3B] text-white font-extrabold px-8 py-4 rounded-full shadow-xl shadow-[#087A4B]/40 hover:scale-105 transition-all flex items-center gap-2 text-base"
            >
              <span>Join Now</span>
              <ArrowRight className="w-5 h-5" />
            </button>

            <button
              onClick={() => setActivePage('marketplace')}
              className="bg-white/20 hover:bg-white/30 backdrop-blur-md text-white border border-white/40 font-extrabold px-8 py-4 rounded-full shadow-lg hover:scale-105 transition-all text-base"
            >
              Explore Marketplace
            </button>
          </div>
        </div>
      </section>

      {/* 2. CATEGORY CARDS MATCHING MOCKUP 1 */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categoryCards.map((cat) => {
            const Icon = cat.icon;
            return (
              <div
                key={cat.id}
                onClick={() => {
                  setSelectedCategory(cat.catFilter);
                  setActivePage('marketplace');
                  window.scrollTo(0, 0);
                }}
                className="glass-card glass-card-hover rounded-3xl p-6 cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-[#E8F6EE] text-[#087A4B] flex items-center justify-center mb-4 group-hover:bg-[#087A4B] group-hover:text-white transition-colors duration-300 shadow-sm">
                    <Icon className="w-7 h-7" />
                  </div>
                  <h3 className="font-bold text-slate-900 text-lg mb-1 group-hover:text-[#087A4B] transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {cat.desc}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#087A4B]">
                  <span>Browse Category</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. FEATURED LISTINGS GRID MATCHING MOCKUP 1 */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Featured Listings
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Top-rated agricultural produce, equipment, and farmland across Kenya.
            </p>
          </div>

          <button
            onClick={() => setActivePage('marketplace')}
            className="text-sm font-bold text-[#087A4B] hover:text-[#064E3B] flex items-center gap-1.5 transition"
          >
            <span>View All</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredListings.map((listing) => (
            <ListingCard
              key={listing.id}
              listing={listing}
              onSelect={(item) => setActiveListingModal(item)}
            />
          ))}
        </div>
      </section>

      {/* 4. TRUST & SAFETY SECTION MATCHING MOCKUP 1 */}
      <section className="bg-[#064E3B] text-white py-12 rounded-3xl max-w-7xl mx-auto px-6 sm:px-12 shadow-2xl relative overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center relative z-10">

          <div className="flex flex-col items-center">
            <div className="w-14 h-14 rounded-2xl bg-[#0B9A5B] flex items-center justify-center text-white mb-4 shadow-lg">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <h3 className="font-bold text-lg text-white mb-1">Trusted Community</h3>
            <p className="text-xs text-emerald-100 max-w-xs leading-relaxed">
              Verified Kenyan farmers, suppliers, and agricultural service providers.
            </p>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-14 h-14 rounded-2xl bg-[#0B9A5B] flex items-center justify-center text-white mb-4 shadow-lg">
              <Lock className="w-7 h-7" />
            </div>
            <h3 className="font-bold text-lg text-white mb-1">Secure Transactions</h3>
            <p className="text-xs text-emerald-100 max-w-xs leading-relaxed">
              Safe & transparent dealings designed specifically for agri-business.
            </p>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-14 h-14 rounded-2xl bg-[#0B9A5B] flex items-center justify-center text-white mb-4 shadow-lg">
              <Headphones className="w-7 h-7" />
            </div>
            <h3 className="font-bold text-lg text-white mb-1">24/7 Support</h3>
            <p className="text-xs text-emerald-100 max-w-xs leading-relaxed">
              We're here to help you trade, lease land, or hire farm equipment seamlessly.
            </p>
          </div>

        </div>
      </section>

    </div>
  );
}
