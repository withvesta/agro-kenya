import React, { useState } from 'react';
import { Search, Users, Filter, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import MemberCard from '../components/members/MemberCard';

export default function MembersPage({ setActivePage }) {
  const { users } = useAuth();
  const { setActiveMemberModal } = useData();

  const [roleFilter, setRoleFilter] = useState('All');
  const [memberSearch, setMemberSearch] = useState('');

  const roles = [
    { id: 'All', label: 'All Members' },
    { id: 'Farmer', label: 'Farmers' },
    { id: 'Buyer', label: 'Buyers' },
    { id: 'Seller', label: 'Sellers' },
    { id: 'Service Provider', label: 'Service Providers' },
    { id: 'Land Owner', label: 'Land Owners' },
    { id: 'Machinery Owner', label: 'Machinery Providers' },
  ];

  const filteredMembers = users.filter((u) => {
    if (u.accountType === 'Manager') return false; // Hide system admin from directory
    if (roleFilter !== 'All' && u.accountType !== roleFilter) return false;
    if (memberSearch.trim()) {
      const q = memberSearch.toLowerCase();
      const matchName = u.fullName.toLowerCase().includes(q);
      const matchBusiness = u.businessName.toLowerCase().includes(q);
      const matchCounty = u.county.toLowerCase().includes(q);
      const matchPhone = u.phone.includes(q);
      if (!matchName && !matchBusiness && !matchCounty && !matchPhone) return false;
    }
    return true;
  });

  return (
    <div className="space-y-10 pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

      {/* HEADER MATCHING MOCKUP 6 */}
      <section className="bg-gradient-to-br from-[#064E3B] to-[#087A4B] text-white py-12 px-6 sm:px-12 rounded-3xl shadow-xl text-center space-y-4">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
          Our Members
        </h1>
        <p className="text-emerald-100 text-sm sm:text-base font-medium max-w-xl mx-auto">
          Connect directly with verified Kenyan farmers, grain buyers, suppliers, and agricultural service providers.
        </p>

        {/* SEARCH BAR FOR MEMBERS */}
        <div className="pt-2 max-w-xl mx-auto flex items-center bg-white rounded-full p-2 pl-5 shadow-lg border border-white/30">
          <Search className="w-5 h-5 text-slate-400 mr-2 flex-shrink-0" />
          <input
            type="text"
            value={memberSearch}
            onChange={(e) => setMemberSearch(e.target.value)}
            placeholder="Search by name, phone, location or category..."
            className="w-full text-slate-800 placeholder-slate-400 text-xs sm:text-sm bg-transparent outline-none py-1.5"
          />
          <button className="bg-[#087A4B] text-white px-6 py-2.5 rounded-full text-xs font-bold shadow">
            Search
          </button>
        </div>
      </section>

      {/* ROLE FILTER TABS MATCHING MOCKUP 6 */}
      <section className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {roles.map((role) => (
          <button
            key={role.id}
            onClick={() => setRoleFilter(role.id)}
            className={`px-5 py-2.5 rounded-full text-xs font-bold whitespace-nowrap transition shadow-sm ${
              roleFilter === role.id
                ? 'bg-[#087A4B] text-white shadow-md shadow-[#087A4B]/20'
                : 'bg-white text-slate-700 hover:bg-[#E8F6EE] hover:text-[#087A4B] border border-slate-200'
            }`}
          >
            {role.label}
          </button>
        ))}
      </section>

      {/* MEMBERS DIRECTORY GRID */}
      <section>
        {filteredMembers.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 max-w-md mx-auto">
            <Users className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-slate-800">No members match your search</h3>
            <p className="text-xs text-slate-500 mt-1">Try clearing search filters or selecting another member role.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMembers.map((member) => (
              <MemberCard
                key={member.id}
                member={member}
                onSelect={(m) => {
                  setActiveMemberModal(m);
                }}
              />
            ))}
          </div>
        )}
      </section>

    </div>
  );
}
