import React, { useState } from 'react';
import { MapPin, Phone, Mail, MessageSquare, Star, ArrowLeft } from 'lucide-react';
import VerificationBadge from '../components/common/VerificationBadge';
import RatingStars from '../components/common/RatingStars';
import ListingCard from '../components/marketplace/ListingCard';
import { useData } from '../context/DataContext';

export default function MemberProfilePage({ member, onBack }) {
  const { listings, setActiveListingModal, setActiveChatListing, reviews } = useData();
  const [activeTab, setActiveTab] = useState('listings'); // 'listings' | 'about' | 'reviews'

  if (!member) return null;

  const memberListings = listings.filter(l => l.userId === member.id || l.sellerName === member.fullName);
  const memberReviews = reviews.filter(r => r.reviewedUserId === member.id);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 pb-16">

      {/* BACK BUTTON */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-xs font-bold text-[#087A4B] hover:text-[#064E3B] transition"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Members Directory</span>
      </button>

      {/* MEMBER HEADER CARD MATCHING MOCKUP 4 */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md relative overflow-hidden">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">

          {/* AVATAR */}
          <img
            src={member.profileImage}
            alt={member.fullName}
            className="w-28 h-28 sm:w-32 sm:h-32 rounded-full object-cover border-4 border-[#087A4B] shadow-lg flex-shrink-0"
          />

          {/* MEMBER METADATA */}
          <div className="flex-1 text-center sm:text-left">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-1">
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900">{member.fullName}</h1>
              {member.verified && <VerificationBadge text="Verified" />}
            </div>

            <p className="text-sm font-bold text-[#0B9A5B] mb-1">{member.accountType}</p>
            <p className="text-xs text-slate-500 font-medium mb-3">{member.businessName}</p>

            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs text-slate-600 mb-4">
              <span className="flex items-center gap-1">
                <MapPin className="w-4 h-4 text-[#0B9A5B]" />
                {member.county}, Kenya ({member.town || 'County Hub'})
              </span>
              <span className="flex items-center gap-1 font-mono">
                <Phone className="w-4 h-4 text-[#087A4B]" />
                {member.phone}
              </span>
              <span className="flex items-center gap-1">
                <Mail className="w-4 h-4 text-[#087A4B]" />
                {member.email}
              </span>
            </div>

            <RatingStars rating={member.rating || 5.0} reviewCount={member.reviewCount || memberReviews.length || 0} />
          </div>

          {/* ACTION BUTTONS (MESSAGE & CALL) MATCHING MOCKUP 4 */}
          <div className="flex flex-row sm:flex-col gap-3 w-full sm:w-auto">
            <button
              onClick={() => {
                if (memberListings.length > 0) {
                  setActiveChatListing(memberListings[0]);
                }
              }}
              className="flex-1 sm:flex-initial bg-[#087A4B] hover:bg-[#064E3B] text-white px-8 py-3 rounded-2xl font-bold text-sm shadow-md transition flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Message</span>
            </button>

            <a
              href={`tel:${member.phone}`}
              className="flex-1 sm:flex-initial border-2 border-[#087A4B] text-[#087A4B] hover:bg-[#E8F6EE] px-8 py-3 rounded-2xl font-bold text-sm transition flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4" />
              <span>Call</span>
            </a>
          </div>

        </div>
      </div>

      {/* TABS MATCHING MOCKUP 4: Products & Services | About | Reviews */}
      <div className="border-b border-slate-200 flex items-center gap-6">
        <button
          onClick={() => setActiveTab('listings')}
          className={`pb-3 text-sm font-bold transition border-b-2 ${
            activeTab === 'listings'
              ? 'border-[#087A4B] text-[#087A4B]'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          Products & Services ({memberListings.length})
        </button>

        <button
          onClick={() => setActiveTab('about')}
          className={`pb-3 text-sm font-bold transition border-b-2 ${
            activeTab === 'about'
              ? 'border-[#087A4B] text-[#087A4B]'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          About Member
        </button>

        <button
          onClick={() => setActiveTab('reviews')}
          className={`pb-3 text-sm font-bold transition border-b-2 ${
            activeTab === 'reviews'
              ? 'border-[#087A4B] text-[#087A4B]'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          Reviews ({memberReviews.length})
        </button>
      </div>

      {/* TAB CONTENT */}
      <div>
        {activeTab === 'listings' && (
          <div>
            {memberListings.length === 0 ? (
              <div className="bg-white rounded-3xl p-8 text-center text-slate-500 text-sm border border-slate-200">
                This member has no active products or services listed at the moment.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {memberListings.map(listing => (
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

        {activeTab === 'about' && (
          <div className="bg-white rounded-3xl p-8 border border-slate-200 max-w-3xl space-y-4">
            <h3 className="font-bold text-slate-900 text-lg">About {member.fullName}</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              {member.about || "Verified agricultural member operating in Kenya. Dedicated to providing top-quality crops, livestock, or machinery services to local and national markets."}
            </p>
            <div className="pt-4 border-t border-slate-100 grid grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-slate-400 block font-semibold uppercase text-[10px]">Business Name</span>
                <span className="font-bold text-slate-800">{member.businessName}</span>
              </div>
              <div>
                <span className="text-slate-400 block font-semibold uppercase text-[10px]">Joined Agro Kenya</span>
                <span className="font-bold text-slate-800">{member.joinedDate || "2024-01-15"}</span>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'reviews' && (
          <div className="space-y-4 max-w-2xl">
            {memberReviews.length === 0 ? (
              <div className="bg-white rounded-3xl p-8 text-center text-slate-500 text-sm border border-slate-200">
                No customer reviews yet.
              </div>
            ) : (
              memberReviews.map((rev) => (
                <div key={rev.id} className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-800 text-sm">{rev.reviewerName}</span>
                    <RatingStars rating={rev.rating} showCount={false} />
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">{rev.comment}</p>
                  <span className="text-[10px] text-slate-400 block">{rev.createdAt}</span>
                </div>
              ))
            )}
          </div>
        )}
      </div>

    </div>
  );
}
