import React from 'react';
import { MapPin, Heart, Eye, CheckCircle2 } from 'lucide-react';
import { useData } from '../../context/DataContext';
import VerificationBadge from '../common/VerificationBadge';

export default function ListingCard({ listing, onSelect }) {
  const { favorites, toggleFavorite } = useData();
  const isFavorite = favorites.includes(listing.id);

  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-[#087A4B]/15 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col group relative">

      {/* IMAGE CONTAINER */}
      <div className="relative aspect-[4/3] bg-slate-100 overflow-hidden">
        <img
          src={listing.images[0]}
          alt={listing.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* CATEGORY BADGE */}
        <span className="absolute top-3 left-3 bg-[#064E3B]/85 backdrop-blur-md text-white text-[11px] font-bold px-3 py-1 rounded-full border border-white/20">
          {listing.category}
        </span>

        {/* FAVORITE HEART BUTTON */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleFavorite(listing.id);
          }}
          className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all ${
            isFavorite
              ? 'bg-red-500 text-white shadow-md'
              : 'bg-white/80 backdrop-blur-md text-slate-600 hover:bg-white hover:text-red-500'
          }`}
        >
          <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
        </button>

        {/* FEATURED RIBBON */}
        {listing.featured && (
          <span className="absolute bottom-3 left-3 bg-amber-500 text-white text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-md shadow">
            Featured
          </span>
        )}
      </div>

      {/* CARD CONTENT */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* TITLE */}
          <h3 className="font-bold text-slate-900 text-base line-clamp-1 group-hover:text-[#087A4B] transition-colors">
            {listing.title}
          </h3>

          {/* PRICE */}
          <div className="mt-1 flex items-baseline gap-1">
            <span className="text-lg font-black text-[#087A4B]">
              KSh {listing.price.toLocaleString()}
            </span>
            <span className="text-xs text-slate-500 font-medium">
              / {listing.priceUnit}
            </span>
          </div>

          {/* LOCATION */}
          <div className="mt-2 flex items-center gap-1 text-xs text-slate-500">
            <MapPin className="w-3.5 h-3.5 text-[#0B9A5B] flex-shrink-0" />
            <span className="truncate">{listing.location}</span>
          </div>

          {/* SELLER METADATA */}
          <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
            <div className="flex items-center gap-1.5 truncate">
              <span className="text-slate-600 font-medium truncate">Seller: {listing.sellerName}</span>
              {listing.sellerVerified && <VerificationBadge text="" className="py-0 px-1" />}
            </div>
          </div>
        </div>

        {/* VIEW DETAILS BUTTON */}
        <button
          onClick={() => onSelect(listing)}
          className="mt-4 w-full bg-[#087A4B] hover:bg-[#064E3B] text-white py-2.5 px-4 rounded-xl text-xs font-bold shadow transition-all flex items-center justify-center gap-1.5 group-hover:shadow-md"
        >
          <span>View Details</span>
        </button>
      </div>
    </div>
  );
}
