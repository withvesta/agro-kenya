import React, { useState } from 'react';
import { X, MapPin, Phone, MessageSquare, Heart, Shield, Share2, Check, AlertTriangle, ChevronLeft, ChevronRight } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';
import VerificationBadge from '../common/VerificationBadge';
import RatingStars from '../common/RatingStars';

export default function ListingDetailModal({ listing, onClose }) {
  const { favorites, toggleFavorite, reportListing, setActiveChatListing } = useData();
  const { currentUser } = useAuth();

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [quantityCount, setQuantityCount] = useState(1);
  const [showReportForm, setShowReportForm] = useState(false);
  const [reportReason, setReportReason] = useState('Scam/fraud');
  const [reportDesc, setReportDesc] = useState('');

  if (!listing) return null;

  const isFavorite = favorites.includes(listing.id);
  const whatsappNumber = listing.whatsapp || "254700123456";
  const whatsappUrl = `https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}?text=Habari%20${encodeURIComponent(listing.sellerName)},%20I%20am%20interested%20in%20your%20listing%20"${encodeURIComponent(listing.title)}"%20on%20Agro%20Kenya.`;

  const handleReportSubmit = (e) => {
    e.preventDefault();
    reportListing(listing.id, reportReason, reportDesc);
    setShowReportForm(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/70 backdrop-blur-sm overflow-y-auto animate-fade-in">
      <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-slate-100 relative flex flex-col my-auto">

        {/* CLOSE BUTTON */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-slate-900/60 hover:bg-slate-900 text-white flex items-center justify-center transition shadow"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 sm:p-8">

          {/* LEFT: IMAGE GALLERY */}
          <div>
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-slate-100 shadow-md">
              <img
                src={listing.images[activeImageIndex] || listing.images[0]}
                alt={listing.title}
                className="w-full h-full object-cover"
              />

              <span className="absolute top-3 left-3 bg-[#064E3B] text-white text-xs font-bold px-3 py-1 rounded-full">
                {listing.category}
              </span>

              {listing.images.length > 1 && (
                <>
                  <button
                    onClick={() => setActiveImageIndex((prev) => (prev > 0 ? prev - 1 : listing.images.length - 1))}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 text-white flex items-center justify-center hover:bg-black/70"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setActiveImageIndex((prev) => (prev < listing.images.length - 1 ? prev + 1 : 0))}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 text-white flex items-center justify-center hover:bg-black/70"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}
            </div>

            {/* THUMBNAILS */}
            {listing.images.length > 1 && (
              <div className="flex items-center gap-2 mt-3 overflow-x-auto pb-1">
                {listing.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition ${
                      activeImageIndex === idx ? 'border-[#087A4B] ring-2 ring-[#087A4B]/30' : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="thumb" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* SELLER CARD */}
            <div className="mt-6 p-4 rounded-2xl bg-[#F8FAF4] border border-[#087A4B]/20 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={listing.sellerImage}
                  alt={listing.sellerName}
                  className="w-12 h-12 rounded-full object-cover border-2 border-[#087A4B]"
                />
                <div>
                  <div className="flex items-center gap-1.5">
                    <h4 className="font-bold text-slate-900 text-sm">{listing.sellerName}</h4>
                    {listing.sellerVerified && <VerificationBadge text="Verified" className="py-0.5 text-[10px]" />}
                  </div>
                  <RatingStars rating={4.8} reviewCount={14} />
                  <p className="text-[11px] text-slate-500 mt-0.5">Location: {listing.location}</p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: DETAILS & ACTIONS */}
          <div className="flex flex-col justify-between">
            <div>
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 leading-tight">{listing.title}</h2>
                  <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
                    <MapPin className="w-4 h-4 text-[#0B9A5B]" />
                    <span>{listing.location}</span>
                    <span>•</span>
                    <span>Posted {listing.createdAt}</span>
                  </div>
                </div>

                <button
                  onClick={() => toggleFavorite(listing.id)}
                  className={`p-2.5 rounded-full border transition ${
                    isFavorite ? 'bg-red-50 text-red-500 border-red-200' : 'border-slate-200 text-slate-400 hover:text-red-500'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
                </button>
              </div>

              {/* PRICE BANNER */}
              <div className="mt-4 p-4 rounded-2xl bg-gradient-to-r from-[#E8F6EE] to-white border border-[#087A4B]/20 flex items-baseline justify-between">
                <div>
                  <span className="text-2xl font-black text-[#087A4B]">
                    KSh {listing.price.toLocaleString()}
                  </span>
                  <span className="text-xs text-slate-600 font-medium ml-1">
                    / {listing.priceUnit}
                  </span>
                </div>
                <span className="text-xs font-semibold text-[#064E3B] bg-[#0B9A5B]/20 px-3 py-1 rounded-full">
                  {listing.quantity}
                </span>
              </div>

              {/* DESCRIPTION */}
              <div className="mt-5">
                <h4 className="text-xs uppercase font-bold text-slate-400 tracking-wider mb-1">Description</h4>
                <p className="text-sm text-slate-700 leading-relaxed">
                  {listing.description}
                </p>
              </div>

              {/* SPECIFICATIONS GRID */}
              {listing.specs && Object.keys(listing.specs).length > 0 && (
                <div className="mt-5 pt-4 border-t border-slate-100">
                  <h4 className="text-xs uppercase font-bold text-slate-400 tracking-wider mb-2">Specifications</h4>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    {Object.entries(listing.specs).map(([key, value]) => (
                      <div key={key} className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                        <span className="text-slate-400 block text-[10px] uppercase font-semibold">{key}</span>
                        <span className="font-semibold text-slate-800">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* ACTION BUTTONS (CALL, MESSAGE, WHATSAPP) */}
            <div className="mt-8 pt-4 border-t border-slate-100 flex flex-col gap-3">
              <div className="grid grid-cols-2 gap-3">
                <a
                  href={`tel:${listing.phone || '+254712345678'}`}
                  className="w-full bg-[#064E3B] hover:bg-[#033527] text-white font-bold py-3 rounded-2xl flex items-center justify-center gap-2 text-sm shadow-md transition"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call Seller</span>
                </a>

                <button
                  onClick={() => {
                    setActiveChatListing(listing);
                    onClose();
                  }}
                  className="w-full bg-[#087A4B] hover:bg-[#064E3B] text-white font-bold py-3 rounded-2xl flex items-center justify-center gap-2 text-sm shadow-md transition"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Message</span>
                </button>
              </div>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-2xl flex items-center justify-center gap-2 text-sm shadow-md transition"
              >
                <span>💬 Chat on WhatsApp (+254)</span>
              </a>

              {/* REPORT LINK */}
              <div className="flex justify-between items-center text-xs text-slate-400 pt-2">
                <span>Ref: #{listing.id}</span>
                <button
                  onClick={() => setShowReportForm(!showReportForm)}
                  className="hover:text-red-500 flex items-center gap-1 transition"
                >
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
                  <span>Report fake listing or scam</span>
                </button>
              </div>

              {/* REPORT FORM SLIDE DOWN */}
              {showReportForm && (
                <form onSubmit={handleReportSubmit} className="bg-red-50 p-4 rounded-2xl border border-red-200 mt-2 text-xs">
                  <h5 className="font-bold text-red-800 mb-2">Report Listing to Moderation Team</h5>
                  <select
                    value={reportReason}
                    onChange={(e) => setReportReason(e.target.value)}
                    className="w-full p-2 rounded-lg bg-white border border-red-200 mb-2 font-medium"
                  >
                    <option>Scam/fraud</option>
                    <option>Fake product or wrong price</option>
                    <option>Abusive behaviour</option>
                    <option>Duplicate listing</option>
                  </select>
                  <textarea
                    value={reportDesc}
                    onChange={(e) => setReportDesc(e.target.value)}
                    placeholder="Provide details about why this listing violates policies..."
                    className="w-full p-2 rounded-lg bg-white border border-red-200 mb-2"
                    rows={2}
                    required
                  />
                  <button type="submit" className="bg-red-600 text-white font-bold px-4 py-2 rounded-lg w-full">
                    Submit Report
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
