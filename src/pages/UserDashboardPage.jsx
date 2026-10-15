import React, { useState } from 'react';
import { Package, Heart, MessageSquare, ShoppingBag, PlusCircle, Trash2, CheckCircle, Clock, ShieldCheck, Truck, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import { useCart } from '../context/CartContext';
import ListingCard from '../components/marketplace/ListingCard';
import VerificationBadge from '../components/common/VerificationBadge';

export default function UserDashboardPage({ setActivePage }) {
  const { currentUser } = useAuth();
  const {
    listings,
    favorites,
    messages,
    deleteListing,
    updateListingStatus,
    setIsAddListingOpen,
    setActiveListingModal
  } = useData();
  const { orders } = useCart();

  const [activeTab, setActiveTab] = useState('listings'); // 'listings' | 'orders' | 'favorites' | 'messages'

  if (!currentUser) {
    return (
      <div className="max-w-md mx-auto my-16 text-center bg-white p-8 rounded-3xl shadow-xl space-y-4 border border-slate-100">
        <div className="w-14 h-14 bg-emerald-50 text-[#087A4B] rounded-2xl flex items-center justify-center mx-auto shadow-sm">
          <ShieldCheck className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold text-slate-800">Customer Account Protected</h2>
        <p className="text-slate-600 text-xs leading-relaxed">
          Please log in to your registered account to manage your listings, view your orders, and access private seller messages.
        </p>
        <div className="pt-2">
          <button onClick={() => setActivePage('login')} className="w-full bg-[#087A4B] text-white font-bold py-3 rounded-xl text-xs shadow hover:bg-[#064E3B] transition">
            Log In to Customer Account
          </button>
        </div>
      </div>
    );
  }

  // Filter listings belonging to this user
  const myListings = listings.filter(l => l.userId === currentUser.id || l.sellerName === currentUser.fullName);
  const activeListingsCount = myListings.filter(l => l.status === 'Active').length;

  // Filter orders where user is buyer or seller
  const myOrders = orders.filter(o => o.buyerId === currentUser.id || o.buyerPhone === currentUser.phone);
  const favoriteObjects = listings.filter(l => favorites.includes(l.id));
  const userMessages = messages.filter(m => m.receiverId === currentUser.id || m.senderId === currentUser.id);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 pb-16">

      {/* WELCOME BANNER */}
      <div className="bg-gradient-to-r from-[#064E3B] to-[#087A4B] rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <img
            src={currentUser.profileImage}
            alt={currentUser.fullName}
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover border-4 border-emerald-400 shadow-md"
          />
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-black text-white">Welcome, {currentUser.fullName}!</h1>
              {currentUser.verified && <VerificationBadge text="Verified" />}
            </div>
            <p className="text-xs text-emerald-200 mt-1">
              Account Role: <span className="font-bold text-white">{currentUser.accountType}</span> • Location: {currentUser.county}, Kenya
            </p>
          </div>
        </div>

        <button
          onClick={() => setIsAddListingOpen(true)}
          className="w-full sm:w-auto bg-[#0B9A5B] hover:bg-emerald-600 text-white font-bold px-6 py-3.5 rounded-2xl shadow-lg flex items-center justify-center gap-2 text-xs transition"
        >
          <PlusCircle className="w-5 h-5" />
          <span>+ Add New Listing</span>
        </button>
      </div>

      {/* DASHBOARD METRICS CARDS */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#E8F6EE] text-[#087A4B] flex items-center justify-center font-bold">
            <Package className="w-6 h-6" />
          </div>
          <div>
            <span className="text-2xl font-black text-slate-900">{myListings.length}</span>
            <span className="text-xs text-slate-500 block">Total Listings</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
            <ShoppingBag className="w-6 h-6" />
          </div>
          <div>
            <span className="text-2xl font-black text-slate-900">{myOrders.length}</span>
            <span className="text-xs text-slate-500 block">My Orders</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
            <MessageSquare className="w-6 h-6" />
          </div>
          <div>
            <span className="text-2xl font-black text-slate-900">{userMessages.length}</span>
            <span className="text-xs text-slate-500 block">Messages</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-red-100 text-red-600 flex items-center justify-center font-bold">
            <Heart className="w-6 h-6" />
          </div>
          <div>
            <span className="text-2xl font-black text-slate-900">{favorites.length}</span>
            <span className="text-xs text-slate-500 block">Saved Favorites</span>
          </div>
        </div>
      </div>

      {/* DASHBOARD TABS */}
      <div className="border-b border-slate-200 flex items-center gap-6">
        <button
          onClick={() => setActiveTab('listings')}
          className={`pb-3 text-xs font-bold transition border-b-2 ${
            activeTab === 'listings' ? 'border-[#087A4B] text-[#087A4B]' : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          My Listings ({myListings.length})
        </button>

        <button
          onClick={() => setActiveTab('orders')}
          className={`pb-3 text-xs font-bold transition border-b-2 ${
            activeTab === 'orders' ? 'border-[#087A4B] text-[#087A4B]' : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          My Orders ({myOrders.length})
        </button>

        <button
          onClick={() => setActiveTab('favorites')}
          className={`pb-3 text-xs font-bold transition border-b-2 ${
            activeTab === 'favorites' ? 'border-[#087A4B] text-[#087A4B]' : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          My Favorites ({favoriteObjects.length})
        </button>

        <button
          onClick={() => setActiveTab('messages')}
          className={`pb-3 text-xs font-bold transition border-b-2 ${
            activeTab === 'messages' ? 'border-[#087A4B] text-[#087A4B]' : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          My Messages ({userMessages.length})
        </button>
      </div>

      {/* TAB CONTENTS */}
      <div>
        {/* 1. MY LISTINGS */}
        {activeTab === 'listings' && (
          <div className="space-y-4">
            {myListings.length === 0 ? (
              <div className="bg-white rounded-3xl p-10 text-center border border-slate-200">
                <Package className="w-12 h-12 text-slate-300 mx-auto mb-2" />
                <h3 className="font-bold text-slate-800 text-base">You haven't posted any listings yet</h3>
                <p className="text-xs text-slate-500 mt-1 mb-4">Post your fresh produce, farm machinery, land for lease, or services.</p>
                <button
                  onClick={() => setIsAddListingOpen(true)}
                  className="bg-[#087A4B] text-white font-bold px-6 py-2.5 rounded-full text-xs shadow"
                >
                  + Create Your First Listing
                </button>
              </div>
            ) : (
              <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
                <div className="divide-y divide-slate-100">
                  {myListings.map(listing => (
                    <div key={listing.id} className="p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-[#F8FAF4] transition">
                      <div className="flex items-center gap-4">
                        <img src={listing.images[0]} alt="thumb" className="w-16 h-16 rounded-xl object-cover border" />
                        <div>
                          <h4 className="font-bold text-slate-900 text-sm">{listing.title}</h4>
                          <p className="text-xs text-slate-500">{listing.category} • {listing.location}</p>
                          <span className="text-sm font-black text-[#087A4B] block mt-1">
                            KSh {listing.price.toLocaleString()} / {listing.priceUnit}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
                        <span className={`px-3 py-1 rounded-full text-[11px] font-bold ${
                          listing.status === 'Active' ? 'bg-emerald-100 text-emerald-800' :
                          listing.status === 'Sold' ? 'bg-blue-100 text-blue-800' : 'bg-amber-100 text-amber-800'
                        }`}>
                          {listing.status}
                        </span>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateListingStatus(listing.id, listing.status === 'Active' ? 'Sold' : 'Active')}
                            className="px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-100"
                          >
                            Mark {listing.status === 'Active' ? 'Sold' : 'Active'}
                          </button>
                          <button
                            onClick={() => deleteListing(listing.id)}
                            className="p-2 rounded-xl text-red-600 hover:bg-red-50 border border-red-200"
                            title="Delete Listing"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* 2. MY ORDERS */}
        {activeTab === 'orders' && (
          <div className="space-y-4">
            {myOrders.length === 0 ? (
              <div className="bg-white rounded-3xl p-10 text-center border border-slate-200">
                <ShoppingBag className="w-12 h-12 text-slate-300 mx-auto mb-2" />
                <h3 className="font-bold text-slate-800 text-base">No orders placed yet</h3>
                <p className="text-xs text-slate-500 mt-1">Add items to your cart from our marketplace to place your first order.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {myOrders.map(ord => (
                  <div key={ord.id} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-slate-100 pb-3 gap-2">
                      <div>
                        <span className="font-mono font-bold text-sm text-slate-900 block">{ord.orderNumber}</span>
                        <span className="text-xs text-slate-500">Placed on: {new Date(ord.createdAt).toLocaleString()}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                          ord.status === 'completed' ? 'bg-emerald-100 text-emerald-800' :
                          ord.status === 'pending' ? 'bg-amber-100 text-amber-800' : 'bg-blue-100 text-blue-800'
                        }`}>
                          Status: {ord.status.toUpperCase()}
                        </span>
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                          ord.paymentStatus === 'paid' ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
                        }`}>
                          Payment: {ord.paymentStatus} ({ord.paymentMode})
                        </span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <p className="text-xs text-slate-600 font-bold">Delivery Location: {ord.deliveryLocation}</p>
                      <div className="divide-y divide-slate-100 text-xs">
                        {(ord.items || []).map(item => (
                          <div key={item.id} className="py-2 flex justify-between">
                            <span>{item.productName} (Qty: {item.quantity})</span>
                            <span className="font-bold">KSh {(item.lineTotal || 0).toLocaleString()}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex justify-between items-center text-xs">
                      <span className="text-slate-500">Subtotal + Delivery Fee (KSh {ord.deliveryFee || 350}):</span>
                      <span className="font-black text-[#087A4B] text-base">KSh {ord.totalAmount.toLocaleString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* 3. FAVORITES */}
        {activeTab === 'favorites' && (
          <div>
            {favoriteObjects.length === 0 ? (
              <div className="bg-white rounded-3xl p-10 text-center border border-slate-200">
                <Heart className="w-12 h-12 text-slate-300 mx-auto mb-2" />
                <h3 className="font-bold text-slate-800 text-base">No saved favorites yet</h3>
                <p className="text-xs text-slate-500 mt-1">Click the heart icon on any listing to save it here for quick access.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {favoriteObjects.map(listing => (
                  <ListingCard
                    key={listing.id}
                    listing={listing}
                    onSelect={(item) => setActiveListingModal(item)}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* 4. MESSAGES */}
        {activeTab === 'messages' && (
          <div className="bg-white rounded-3xl border border-slate-200 p-6 space-y-4 shadow-sm">
            <h3 className="font-bold text-slate-900 text-base">Recent Conversations</h3>
            {userMessages.length === 0 ? (
              <p className="text-xs text-slate-500">No active messages.</p>
            ) : (
              <div className="divide-y divide-slate-100">
                {userMessages.map(msg => (
                  <div key={msg.id} className="py-3 flex items-center justify-between gap-4">
                    <div>
                      <span className="font-bold text-xs text-slate-800 block">{msg.listingTitle}</span>
                      <p className="text-xs text-slate-600 truncate max-w-md">{msg.message}</p>
                      <span className="text-[10px] text-slate-400">{new Date(msg.timestamp).toLocaleString()}</span>
                    </div>
                    <span className="text-xs font-bold text-[#087A4B] bg-[#E8F6EE] px-3 py-1 rounded-full">
                      Active Thread
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

    </div>
  );
}
