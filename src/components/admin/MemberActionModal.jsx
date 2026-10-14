import React from 'react';
import { X, ShieldCheck, MapPin, Phone, Mail, Calendar, CheckCircle2, AlertTriangle } from 'lucide-react';
import VerificationBadge from '../common/VerificationBadge';
import { useData } from '../../context/DataContext';

export default function MemberActionModal({ member, onClose, onConfirmDelete }) {
  const { verifyMember, suspendMember } = useData();

  if (!member) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-100 relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600">
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-4 mb-6">
          <img
            src={member.profileImage}
            alt={member.fullName}
            className="w-16 h-16 rounded-full object-cover border-2 border-[#087A4B] shadow"
          />
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-bold text-slate-900">{member.fullName}</h3>
              {member.verified && <VerificationBadge text="Verified" className="py-0.5 text-[10px]" />}
            </div>
            <p className="text-xs font-bold text-[#0B9A5B]">{member.accountType}</p>
            <p className="text-xs text-slate-500">{member.businessName}</p>
          </div>
        </div>

        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-2 text-xs mb-6">
          <div className="flex items-center gap-2 text-slate-700">
            <Mail className="w-4 h-4 text-slate-400" />
            <span className="font-medium">{member.email}</span>
          </div>
          <div className="flex items-center gap-2 text-slate-700">
            <Phone className="w-4 h-4 text-slate-400" />
            <span className="font-mono">{member.phone}</span>
          </div>
          <div className="flex items-center gap-2 text-slate-700">
            <MapPin className="w-4 h-4 text-slate-400" />
            <span>{member.county}, Kenya ({member.town})</span>
          </div>
          <div className="flex items-center gap-2 text-slate-700">
            <Calendar className="w-4 h-4 text-slate-400" />
            <span>Joined: {member.joinedDate}</span>
          </div>
        </div>

        {/* MODERATOR CONTROL BUTTONS */}
        <div className="space-y-3">
          <button
            onClick={() => {
              verifyMember(member.id);
            }}
            className={`w-full py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition ${
              member.verified
                ? 'bg-amber-100 text-amber-800 hover:bg-amber-200'
                : 'bg-[#087A4B] text-white hover:bg-[#064E3B] shadow'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>{member.verified ? 'Remove Verification Status' : 'Grant Verified Badge (✓ Verified)'}</span>
          </button>

          <button
            onClick={() => {
              suspendMember(member.id);
            }}
            className={`w-full py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition ${
              member.status === 'Suspended'
                ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                : 'bg-amber-500 text-white hover:bg-amber-600'
            }`}
          >
            <AlertTriangle className="w-4 h-4" />
            <span>{member.status === 'Suspended' ? 'Unsuspend Account' : 'Suspend Account'}</span>
          </button>

          <button
            onClick={() => {
              onClose();
              onConfirmDelete(member);
            }}
            className="w-full py-2.5 rounded-xl font-bold text-xs bg-red-600 hover:bg-red-700 text-white transition shadow"
          >
            Delete Member Account...
          </button>
        </div>
      </div>
    </div>
  );
}
