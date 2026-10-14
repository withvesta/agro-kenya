import React from 'react';
import { Leaf, Target, Shield, Users, Award, MapPin } from 'lucide-react';

export default function AboutPage({ setActivePage }) {
  return (
    <div className="space-y-16 pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

      {/* HERO BANNER */}
      <section className="bg-gradient-to-br from-[#064E3B] to-[#087A4B] text-white py-16 px-6 sm:px-12 rounded-3xl shadow-xl text-center space-y-4">
        <div className="w-14 h-14 rounded-2xl bg-[#0B9A5B] flex items-center justify-center text-white mx-auto shadow-lg mb-2">
          <Leaf className="w-8 h-8" />
        </div>
        <h1 className="text-3xl sm:text-5xl font-black tracking-tight">About Agro Kenya</h1>
        <p className="text-emerald-100 text-sm sm:text-base font-medium max-w-2xl mx-auto leading-relaxed">
          Empowering Kenya's agricultural community by bridging the gap between smallholder farmers, large scale producers, buyers, land owners, machinery providers, and service experts.
        </p>
      </section>

      {/* MISSION, VISION & VALUES */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm text-center space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-[#E8F6EE] text-[#087A4B] flex items-center justify-center mx-auto font-bold">
            <Target className="w-6 h-6" />
          </div>
          <h3 className="font-extrabold text-slate-900 text-lg">Our Mission</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            To create a transparent, efficient digital marketplace that eliminates exploitation, provides fair agricultural prices, and connects all 47 counties of Kenya.
          </p>
        </div>

        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm text-center space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-[#E8F6EE] text-[#087A4B] flex items-center justify-center mx-auto font-bold">
            <Shield className="w-6 h-6" />
          </div>
          <h3 className="font-extrabold text-slate-900 text-lg">What We Do</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Provide direct communication channels (calls, messages, WhatsApp) between verified sellers and buyers for produce, land leasing, certified inputs, and machinery hire.
          </p>
        </div>

        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm text-center space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-[#E8F6EE] text-[#087A4B] flex items-center justify-center mx-auto font-bold">
            <Users className="w-6 h-6" />
          </div>
          <h3 className="font-extrabold text-slate-900 text-lg">Who We Serve</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Individual smallholder farmers, commercial growers, grain traders, machinery contractors, agricultural leasing companies, and food processors.
          </p>
        </div>
      </section>

      {/* WHY AGRO KENYA */}
      <section className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-md">
        <h2 className="text-2xl font-black text-slate-900 mb-6 text-center">Why Choose Agro Kenya?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs text-slate-700">
          <div className="flex gap-3">
            <span className="w-6 h-6 rounded-full bg-[#087A4B] text-white flex items-center justify-center font-bold flex-shrink-0">✓</span>
            <div>
              <h4 className="font-bold text-slate-900 text-sm mb-1">Direct Seller Access</h4>
              <p className="text-slate-500">No middleman price inflation. Deal directly with farm owners and verified equipment contractors.</p>
            </div>
          </div>
          <div className="flex gap-3">
            <span className="w-6 h-6 rounded-full bg-[#087A4B] text-white flex items-center justify-center font-bold flex-shrink-0">✓</span>
            <div>
              <h4 className="font-bold text-slate-900 text-sm mb-1">Kenyan County Tailored</h4>
              <p className="text-slate-500">Filter listings specifically by Nakuru, Trans Nzoia, Uasin Gishu, Kiambu, Meru and all 47 counties.</p>
            </div>
          </div>
          <div className="flex gap-3">
            <span className="w-6 h-6 rounded-full bg-[#087A4B] text-white flex items-center justify-center font-bold flex-shrink-0">✓</span>
            <div>
              <h4 className="font-bold text-slate-900 text-sm mb-1">Verified Member Badges</h4>
              <p className="text-slate-500">Official moderation team checks business documentation to issue "✓ Verified" badges for safe trading.</p>
            </div>
          </div>
          <div className="flex gap-3">
            <span className="w-6 h-6 rounded-full bg-[#087A4B] text-white flex items-center justify-center font-bold flex-shrink-0">✓</span>
            <div>
              <h4 className="font-bold text-slate-900 text-sm mb-1">Instant WhatsApp Communication</h4>
              <p className="text-slate-500">Initiate direct WhatsApp discussions for rapid negotiation and delivery scheduling.</p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
