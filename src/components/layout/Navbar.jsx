import React, { useState } from 'react';
import { Leaf, Search, User, Menu, X, PlusCircle, LogOut, Shield, Heart, ShoppingBag } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { useCart } from '../../context/CartContext';

export default function Navbar({ activePage, setActivePage }) {
  const { currentUser, logout, isAdmin } = useAuth();
  const { favorites, setIsAddListingOpen } = useData();
  const { cartItemCount, setIsCartOpen } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'marketplace', label: 'Products' },
    { id: 'services', label: 'Services' },
    { id: 'members', label: 'Members' },
    { id: 'about', label: 'About' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (pageId) => {
    setActivePage(pageId);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 glass-nav transition-all">
      {/* Top micro bar */}
      <div className="bg-[#064E3B] text-white text-xs py-1 px-4 flex justify-between items-center">
        <div className="flex items-center gap-2 max-w-7xl mx-auto w-full justify-between">
          <span className="flex items-center gap-1.5 opacity-90">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            Agro Kenya Digital Marketplace — Kenya's Trusted Agri-Hub
          </span>
          <div className="flex items-center gap-3 text-[11px]">
            <span className="text-emerald-200 flex items-center gap-1">🔒 SSL Encrypted • Verified Platform</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* LOGO */}
        <div
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-2.5 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0B9A5B] to-[#064E3B] flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
            <Leaf className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xl font-extrabold text-[#064E3B] tracking-tight flex items-center gap-1">
              Agro Kenya
            </span>
            <span className="text-[10px] uppercase font-bold tracking-widest text-[#0B9A5B] block -mt-1">
              Agricultural Marketplace
            </span>
          </div>
        </div>

        {/* DESKTOP NAV LINKS */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`text-sm font-medium transition-colors relative py-1 ${
                activePage === item.id
                  ? 'text-[#087A4B] font-bold'
                  : 'text-slate-600 hover:text-[#087A4B]'
              }`}
            >
              {item.label}
              {activePage === item.id && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#087A4B] rounded-full animate-fade-in" />
              )}
            </button>
          ))}
        </nav>

        {/* RIGHT SIDE ACTIONS */}
        <div className="hidden md:flex items-center gap-4">
          {/* SEARCH BUTTON */}
          <button
            onClick={() => handleNavClick('marketplace')}
            className="p-2 rounded-full text-slate-600 hover:text-[#087A4B] hover:bg-[#E8F6EE] transition"
            title="Search Products"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* SHOPPING CART BUTTON */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="p-2 rounded-full text-slate-600 hover:text-[#087A4B] hover:bg-[#E8F6EE] transition relative"
            title="Shopping Cart"
          >
            <ShoppingBag className="w-5 h-5" />
            {cartItemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#087A4B] text-white font-black text-[10px] w-5 h-5 rounded-full flex items-center justify-center border-2 border-white">
                {cartItemCount}
              </span>
            )}
          </button>

          {currentUser ? (
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsAddListingOpen(true)}
                className="bg-[#0B9A5B] hover:bg-[#087A4B] text-white px-4 py-2 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-md hover:shadow-lg transition"
              >
                <PlusCircle className="w-4 h-4" />
                <span>+ Add Listing</span>
              </button>

              <div className="relative">
                <button
                  onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                  className="flex items-center gap-2 p-1 rounded-full border-2 border-[#087A4B]/30 hover:border-[#087A4B] transition bg-white"
                >
                  <img
                    src={currentUser.profileImage}
                    alt={currentUser.fullName}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <span className="text-xs font-semibold text-slate-700 pr-2 max-w-[100px] truncate">
                    {currentUser.fullName.split(' ')[0]}
                  </span>
                </button>

                {/* PROFILE DROPDOWN */}
                {isProfileMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-2xl border border-slate-100 py-2 z-50 animate-fade-in">
                    <div className="px-4 py-3 border-b border-slate-100">
                      <p className="text-xs text-slate-400 uppercase font-semibold">Signed in as</p>
                      <p className="text-sm font-bold text-slate-800 truncate">{currentUser.fullName}</p>
                      <p className="text-xs text-[#087A4B] font-medium">{currentUser.accountType}</p>
                    </div>

                    <button
                      onClick={() => { handleNavClick('dashboard'); setIsProfileMenuOpen(false); }}
                      className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-[#E8F6EE] hover:text-[#087A4B] flex items-center gap-2"
                    >
                      <User className="w-4 h-4" />
                      <span>My Dashboard</span>
                    </button>

                    {currentUser?.accountType === 'Manager' && (
                      <button
                        onClick={() => { handleNavClick('manager-dashboard'); setIsProfileMenuOpen(false); }}
                        className="w-full text-left px-4 py-2 text-sm text-[#087A4B] font-bold hover:bg-[#E8F6EE] flex items-center gap-2"
                      >
                        <Shield className="w-4 h-4" />
                        <span>Manager Console</span>
                      </button>
                    )}

                    <button
                      onClick={() => { handleNavClick('favorites'); setIsProfileMenuOpen(false); }}
                      className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-[#E8F6EE] hover:text-[#087A4B] flex items-center gap-2"
                    >
                      <Heart className="w-4 h-4" />
                      <span>Favorites ({favorites.length})</span>
                    </button>

                    <div className="border-t border-slate-100 mt-1 pt-1">
                      <button
                        onClick={() => { logout(); setIsProfileMenuOpen(false); }}
                        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Logout</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <button
                onClick={() => handleNavClick('login')}
                className="text-slate-700 hover:text-[#087A4B] text-sm font-semibold px-4 py-2 rounded-full border border-slate-200 hover:border-[#087A4B] transition"
              >
                Login
              </button>
              <button
                onClick={() => handleNavClick('register')}
                className="bg-[#087A4B] hover:bg-[#064E3B] text-white text-sm font-semibold px-5 py-2 rounded-full shadow-md hover:shadow-lg transition"
              >
                Register
              </button>
            </div>
          )}
        </div>

        {/* MOBILE HAMBURGER BUTTON & CART */}
        <div className="md:hidden flex items-center gap-2">
          <button
            onClick={() => setIsCartOpen(true)}
            className="p-2 rounded-full text-slate-700 hover:bg-slate-100 relative"
          >
            <ShoppingBag className="w-5 h-5" />
            {cartItemCount > 0 && (
              <span className="absolute top-0 right-0 bg-[#087A4B] text-white font-black text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                {cartItemCount}
              </span>
            )}
          </button>

          {currentUser && (
            <button
              onClick={() => handleNavClick('dashboard')}
              className="p-1 rounded-full border border-[#087A4B]"
            >
              <img src={currentUser.profileImage} alt="profile" className="w-7 h-7 rounded-full object-cover" />
            </button>
          )}

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-lg text-slate-700 hover:bg-[#E8F6EE] hover:text-[#087A4B]"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU DRAWER */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-[#087A4B]/20 px-4 pt-2 pb-6 shadow-xl animate-fade-in">
          <nav className="flex flex-col gap-2 mb-4">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`text-left text-base font-semibold py-2.5 px-3 rounded-xl transition ${
                  activePage === item.id
                    ? 'bg-[#E8F6EE] text-[#087A4B]'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="pt-3 border-t border-slate-100 flex flex-col gap-3">
            {currentUser ? (
              <>
                <button
                  onClick={() => { setIsAddListingOpen(true); setIsMobileMenuOpen(false); }}
                  className="w-full bg-[#0B9A5B] text-white font-bold py-3 rounded-xl text-center shadow-md flex items-center justify-center gap-2"
                >
                  <PlusCircle className="w-5 h-5" />
                  + Create New Listing
                </button>
                <button
                  onClick={() => { logout(); setIsMobileMenuOpen(false); }}
                  className="w-full border border-red-200 text-red-600 font-semibold py-2.5 rounded-xl text-center"
                >
                  Logout ({currentUser.fullName.split(' ')[0]})
                </button>
              </>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => handleNavClick('login')}
                  className="w-full border border-[#087A4B] text-[#087A4B] font-bold py-3 rounded-xl text-center"
                >
                  Login
                </button>
                <button
                  onClick={() => handleNavClick('register')}
                  className="w-full bg-[#087A4B] text-white font-bold py-3 rounded-xl text-center shadow-md"
                >
                  Register
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

