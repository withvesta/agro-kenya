import React from 'react';
import { ShieldCheck, AlertTriangle, Lock, FileText } from 'lucide-react';

export function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      <div className="bg-white p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-sm space-y-6">
        <div className="flex items-center gap-3">
          <FileText className="w-8 h-8 text-[#087A4B]" />
          <h1 className="text-3xl font-black text-slate-900">Terms of Service</h1>
        </div>
        <p className="text-xs text-slate-500">Last updated: September 2026</p>

        <div className="space-y-4 text-xs text-slate-700 leading-relaxed">
          <h3 className="text-sm font-bold text-slate-900">1. Marketplace Platform Role</h3>
          <p>
            Agro Kenya is a digital marketplace platform designed to connect farmers, buyers, sellers, land owners, and service providers across Kenya. Agro Kenya acts as a venue for users to publish and discover agricultural produce, machinery, and land listings.
          </p>

          <h3 className="text-sm font-bold text-slate-900">2. Quality & Verification Disclaimer</h3>
          <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 text-amber-900 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <p>
              Agro Kenya facilitates connections between users and does not automatically guarantee the quality, ownership, legality, or authenticity of every unverified listing. Users are advised to inspect physical goods, produce, and land titles before releasing payment.
            </p>
          </div>

          <h3 className="text-sm font-bold text-slate-900">3. User Conduct & Policy Enforcement</h3>
          <p>
            Fraudulent listings, misrepresentation of crop quality, fake machinery offerings, and abusive communications are strictly prohibited. The Agro Kenya moderation team reserves the right to suspend or permanently remove offending accounts.
          </p>
        </div>
      </div>
    </div>
  );
}

export function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      <div className="bg-white p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-sm space-y-6">
        <div className="flex items-center gap-3">
          <Lock className="w-8 h-8 text-[#087A4B]" />
          <h1 className="text-3xl font-black text-slate-900">Privacy Policy</h1>
        </div>
        <p className="text-xs text-slate-500">Last updated: September 2026</p>

        <div className="space-y-4 text-xs text-slate-700 leading-relaxed">
          <p>
            Agro Kenya values your privacy. We collect personal information such as full name, phone number, county, and email address strictly to enable direct communication between agricultural buyers and sellers.
          </p>
          <h3 className="text-sm font-bold text-slate-900">Contact Information Sharing</h3>
          <p>
            By publishing a listing on Agro Kenya, you consent to displaying your contact phone number and county location to potential buyers and service seekers to facilitate direct calls and WhatsApp messaging.
          </p>
        </div>
      </div>
    </div>
  );
}

export function SafetyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      <div className="bg-white p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-sm space-y-6">
        <div className="flex items-center gap-3">
          <ShieldCheck className="w-8 h-8 text-[#087A4B]" />
          <h1 className="text-3xl font-black text-slate-900">Marketplace Safety Tips</h1>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-4 bg-[#F8FAF4] rounded-2xl border border-[#087A4B]/20">
            <h4 className="font-bold text-slate-900 text-sm mb-1">1. Inspect Goods in Person</h4>
            <p className="text-slate-600">Whenever possible, inspect tomatoes, maize, tractors, or farmland in person before sending final payment.</p>
          </div>

          <div className="p-4 bg-[#F8FAF4] rounded-2xl border border-[#087A4B]/20">
            <h4 className="font-bold text-slate-900 text-sm mb-1">2. Beware of Upfront M-Pesa Deposits</h4>
            <p className="text-slate-600">Avoid sending full M-Pesa payment to unverified sellers who refuse physical inspection or shop visits.</p>
          </div>

          <div className="p-4 bg-[#F8FAF4] rounded-2xl border border-[#087A4B]/20">
            <h4 className="font-bold text-slate-900 text-sm mb-1">3. Verify Land Title Deeds</h4>
            <p className="text-slate-600">For land leasing or sales, conduct official searches at the local County Lands registry.</p>
          </div>

          <div className="p-4 bg-[#F8FAF4] rounded-2xl border border-[#087A4B]/20">
            <h4 className="font-bold text-slate-900 text-sm mb-1">4. Look for "✓ Verified" Badges</h4>
            <p className="text-slate-600">Trade with confidence by prioritizing sellers who carry the official Agro Kenya verification badge.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
