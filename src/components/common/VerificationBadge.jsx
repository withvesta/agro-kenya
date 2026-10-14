import React from 'react';
import { Check } from 'lucide-react';

export default function VerificationBadge({ className = "", text = "Verified" }) {
  return (
    <span className={`inline-flex items-center gap-1 bg-[#087A4B]/15 text-[#087A4B] text-xs font-semibold px-2.5 py-0.5 rounded-full border border-[#087A4B]/30 ${className}`}>
      <span className="w-3.5 h-3.5 rounded-full bg-[#087A4B] text-white flex items-center justify-center text-[10px]">
        ✓
      </span>
      {text}
    </span>
  );
}
