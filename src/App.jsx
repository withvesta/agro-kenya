import React, { useState, useEffect } from 'react';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import MarketplacePage from './pages/MarketplacePage';
import MembersPage from './pages/MembersPage';
import MemberProfilePage from './pages/MemberProfilePage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import UserDashboardPage from './pages/UserDashboardPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import ManagerLoginPage from './pages/ManagerLoginPage';
import { TermsPage, PrivacyPage, SafetyPage } from './pages/PolicyPages';

import ListingDetailModal from './components/marketplace/ListingDetailModal';
import AddListingModal from './components/user/AddListingModal';
import MessagingModal from './components/user/MessagingModal';
import CartDrawer from './components/cart/CartDrawer';
import CheckoutModal from './components/cart/CheckoutModal';

import { useData } from './context/DataContext';
import { useAuth } from './context/AuthContext';

function getInitialPage() {
  const path = window.location.pathname.toLowerCase();
  const hash = window.location.hash.toLowerCase();
  if (path.startsWith('/admin') || path === '/manager-login' || hash === '#admin') {
    return 'manager-login';
  }
  return 'home';
}

export default function App() {
  const [activePage, setActivePage] = useState(getInitialPage);

  useEffect(() => {
    const handleLocationChange = () => {
      const path = window.location.pathname.toLowerCase();
      const hash = window.location.hash.toLowerCase();
      if (path.startsWith('/admin') || path === '/manager-login' || hash === '#admin') {
        setActivePage('manager-login');
      }
    };
    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, []);

  const {
    activeListingModal,
    setActiveListingModal,
    activeMemberModal,
    setActiveMemberModal,
    isAddListingOpen,
    setIsAddListingOpen,
    activeChatListing,
    setActiveChatListing
  } = useData();

  const { isAdmin } = useAuth();

  // Separate Manager / Admin Application Area
  if (activePage === 'manager-login') {
    return (
      <div className="min-h-screen flex flex-col bg-[#F8FAF4] text-slate-800 font-sans antialiased">
        <main className="flex-1 pt-4">
          <ManagerLoginPage setActivePage={(page) => {
            if (page === 'home') {
              window.history.pushState({}, '', '/');
            }
            setActivePage(page);
          }} />
        </main>
        <Footer setActivePage={setActivePage} />
      </div>
    );
  }

  if (activePage === 'manager-dashboard' || activePage === 'admin') {
    return (
      <AdminDashboardPage
        onExitAdmin={() => {
          window.history.pushState({}, '', '/');
          setActivePage('home');
        }}
      />
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAF4] text-slate-800 font-sans antialiased">
      {/* GLOBAL NAVBAR */}
      <Navbar activePage={activePage} setActivePage={setActivePage} />

      {/* MAIN ROUTED CONTENT */}
      <main className="flex-1 pt-6">
        {activeMemberModal ? (
          <MemberProfilePage
            member={activeMemberModal}
            onBack={() => setActiveMemberModal(null)}
          />
        ) : (
          <>
            {activePage === 'home' && <HomePage setActivePage={setActivePage} />}
            {activePage === 'marketplace' && <MarketplacePage />}
            {activePage === 'services' && <MarketplacePage />}
            {activePage === 'members' && <MembersPage setActivePage={setActivePage} />}
            {activePage === 'about' && <AboutPage setActivePage={setActivePage} />}
            {activePage === 'contact' && <ContactPage />}
            {activePage === 'login' && <LoginPage setActivePage={setActivePage} />}
            {activePage === 'register' && <RegisterPage setActivePage={setActivePage} />}
            {activePage === 'dashboard' && <UserDashboardPage setActivePage={setActivePage} />}
            {activePage === 'favorites' && <UserDashboardPage setActivePage={setActivePage} />}
            {activePage === 'terms' && <TermsPage />}
            {activePage === 'privacy' && <PrivacyPage />}
            {activePage === 'safety' && <SafetyPage />}
          </>
        )}
      </main>

      {/* GLOBAL MODALS */}
      {activeListingModal && (
        <ListingDetailModal
          listing={activeListingModal}
          onClose={() => setActiveListingModal(null)}
        />
      )}

      {isAddListingOpen && (
        <AddListingModal
          isOpen={isAddListingOpen}
          onClose={() => setIsAddListingOpen(false)}
        />
      )}

      {activeChatListing && (
        <MessagingModal
          listing={activeChatListing}
          onClose={() => setActiveChatListing(null)}
        />
      )}

      {/* SHOPPING CART & CHECKOUT MODALS */}
      <CartDrawer />
      <CheckoutModal onOrderSuccess={() => setActivePage('dashboard')} />

      {/* GLOBAL FOOTER */}
      <Footer setActivePage={setActivePage} />
    </div>
  );
}
