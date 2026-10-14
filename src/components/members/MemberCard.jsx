import React from 'react';
import { MapPin, Phone, MessageSquare, ExternalLink } from 'lucide-react';
import VerificationBadge from '../common/VerificationBadge';
import RatingStars from '../common/RatingStars';
import { useData } from '../../context/DataContext';

export default function MemberCard({ member, onSelect }) {
  return (
    <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between group">
      <div>
        <div className="flex items-start gap-4">
          <img
            src={member.profileImage}
            alt={member.fullName}
            className="w-16 h-16 rounded-full object-cover border-2 border-[#087A4B] shadow-sm flex-shrink-0"
          />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="font-bold text-slate-900 text-base truncate group-hover:text-[#087A4B] transition-colors">
                {member.fullName}
              </h3>
              {member.verified && <VerificationBadge text="Verified" className="py-0.5 text-[10px]" />}
            </div>

            <p className="text-xs font-semibold text-[#0B9A5B] mt-0.5">{member.accountType}</p>
            <p className="text-xs text-slate-500 font-medium">{member.businessName}</p>

            <div className="flex items-center gap-1 text-xs text-slate-500 mt-2">
              <MapPin className="w-3.5 h-3.5 text-[#0B9A5B] flex-shrink-0" />
              <span>{member.county}, Kenya</span>
            </div>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
          <div className="flex items-center gap-1">
            <Phone className="w-3.5 h-3.5 text-[#087A4B]" />
            <span className="font-mono">{member.phone}</span>
          </div>
          <RatingStars rating={member.rating || 4.8} showCount={false} />
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-slate-100 grid grid-cols-2 gap-2">
        <a
          href={`tel:${member.phone}`}
          className="w-full bg-[#E8F6EE] hover:bg-[#087A4B] text-[#087A4B] hover:text-white py-2 rounded-xl text-xs font-bold transition text-center flex items-center justify-center gap-1"
        >
          <Phone className="w-3.5 h-3.5" />
          <span>Call</span>
        </a>

        <button
          onClick={() => onSelect(member)}
          className="w-full bg-[#087A4B] hover:bg-[#064E3B] text-white py-2 rounded-xl text-xs font-bold shadow transition flex items-center justify-center gap-1"
        >
          <span>View Profile</span>
        </button>
      </div>
    </div>
  );
}
