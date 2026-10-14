import React, { useState } from 'react';
import SearchBar from '../components/common/SearchBar';
import CategoryFilterPills from '../components/marketplace/CategoryFilterPills';
import ListingCard from '../components/marketplace/ListingCard';
import { useData } from '../context/DataContext';
import { KENYA_COUNTIES } from '../data/kenyaCounties';
import { Filter, SlidersHorizontal, Package, RefreshCw } from 'lucide-react';

export default function MarketplacePage() {
  const {
    filteredListings,
    selectedCounty,
    setSelectedCounty,
    selectedType,
    setSelectedType,
    sortBy,
    setSortBy,
    setActiveListingModal,
    setSearchQuery,
    setSelectedCategory
  } = useData();

  const [activeTab, setActiveTab] = useState('All'); // 'All' | 'Products' | 'Services'

  const displayedListings = filteredListings.filter(l => {
    if (activeTab === 'Products') {
      return l.category === 'Farm Produce' || l.category === 'Machinery' || l.category === 'Agricultural Inputs';
    }
    if (activeTab === 'Services') {
      return l.category === 'Agricultural Services' || l.category === 'Transport & Logistics' || l.category === 'Land Leasing';
    }
    return true;
  });

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSelectedCounty('All');
    setSelectedType('All');
    setSortBy('Newest');
    setActiveTab('All');
  };

  return (
    <div className="space-y-10 pb-16">

      {/* BANNER HEADER MATCHING MOCKUP 3 */}
      <section className="bg-gradient-to-br from-[#064E3B] to-[#087A4B] text-white py-12 px-4 sm:px-8 rounded-3xl max-w-7xl mx-auto shadow-xl relative overflow-hidden text-center">
        <div className="relative z-10 max-w-3xl mx-auto space-y-4">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Products & Services
          </h1>
          <p className="text-emerald-100 text-sm sm:text-base font-medium">
            Find what you need for a successful farming journey in Kenya.
          </p>

          {/* SEARCH BAR */}
          <div className="pt-2 flex justify-center">
            <SearchBar placeholder="Search products, machinery, land or location..." />
          </div>
        </div>
      </section>

      {/* CATEGORY PILLS & FILTERS MATCHING MOCKUP 3 */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">

        <CategoryFilterPills />

        {/* PRODUCTS VS SERVICES TOGGLE TABS + FILTERS BAR */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">

          {/* TABS: Products vs Services */}
          <div className="flex bg-[#F8FAF4] p-1 rounded-xl border border-slate-200 w-full md:w-auto">
            <button
              onClick={() => setActiveTab('All')}
              className={`flex-1 md:flex-initial px-5 py-2 rounded-lg text-xs font-bold transition ${
                activeTab === 'All' ? 'bg-[#087A4B] text-white shadow-sm' : 'text-slate-600 hover:text-[#087A4B]'
              }`}
            >
              All Listings
            </button>
            <button
              onClick={() => setActiveTab('Products')}
              className={`flex-1 md:flex-initial px-5 py-2 rounded-lg text-xs font-bold transition ${
                activeTab === 'Products' ? 'bg-[#087A4B] text-white shadow-sm' : 'text-slate-600 hover:text-[#087A4B]'
              }`}
            >
              Products
            </button>
            <button
              onClick={() => setActiveTab('Services')}
              className={`flex-1 md:flex-initial px-5 py-2 rounded-lg text-xs font-bold transition ${
                activeTab === 'Services' ? 'bg-[#087A4B] text-white shadow-sm' : 'text-slate-600 hover:text-[#087A4B]'
              }`}
            >
              Services & Land
            </button>
          </div>

          {/* FILTER DROPDOWNS */}
          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">

            {/* COUNTY SELECT */}
            <select
              value={selectedCounty}
              onChange={(e) => setSelectedCounty(e.target.value)}
              className="bg-[#F8FAF4] border border-slate-200 text-slate-700 text-xs font-semibold px-3 py-2 rounded-xl outline-none focus:border-[#087A4B]"
            >
              <option value="All">All Counties (Kenya)</option>
              {KENYA_COUNTIES.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>

            {/* PURPOSE SELECT */}
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="bg-[#F8FAF4] border border-slate-200 text-slate-700 text-xs font-semibold px-3 py-2 rounded-xl outline-none focus:border-[#087A4B]"
            >
              <option value="All">All Types</option>
              <option value="For Sale">For Sale</option>
              <option value="For Lease">For Lease</option>
              <option value="For Rent">For Rent</option>
              <option value="Service">Service</option>
            </select>

            {/* SORT BY SELECT */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-[#F8FAF4] border border-slate-200 text-slate-700 text-xs font-semibold px-3 py-2 rounded-xl outline-none focus:border-[#087A4B]"
            >
              <option value="Newest">Newest First</option>
              <option value="Price: Low to High">Price: Low to High</option>
              <option value="Price: High to Low">Price: High to Low</option>
              <option value="Most Relevant">Most Relevant</option>
            </select>

            <button
              onClick={resetFilters}
              className="p-2 rounded-xl border border-slate-200 text-slate-500 hover:text-[#087A4B] hover:bg-[#E8F6EE] transition"
              title="Reset Filters"
            >
              <RefreshCw className="w-4 h-4" />
            </button>

          </div>

        </div>

      </section>

      {/* LISTINGS GRID & EMPTY STATE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {displayedListings.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 max-w-md mx-auto">
            <Package className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-slate-800 mb-1">No products found</h3>
            <p className="text-xs text-slate-500 mb-4">
              Try adjusting your search terms or county filter to find available agricultural listings.
            </p>
            <button
              onClick={resetFilters}
              className="bg-[#087A4B] text-white font-bold text-xs px-5 py-2.5 rounded-full shadow"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {displayedListings.map((listing) => (
              <ListingCard
                key={listing.id}
                listing={listing}
                onSelect={(item) => setActiveListingModal(item)}
              />
            ))}
          </div>
        )}
      </section>

    </div>
  );
}
