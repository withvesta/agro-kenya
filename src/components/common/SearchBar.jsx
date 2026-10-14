import React from 'react';
import { Search } from 'lucide-react';
import { useData } from '../../context/DataContext';

export default function SearchBar({ placeholder = "Search products, services or location...", onSearchSubmit }) {
  const { searchQuery, setSearchQuery } = useData();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearchSubmit) onSearchSubmit(searchQuery);
  };

  return (
    <form onSubmit={handleSubmit} className="relative max-w-2xl w-full">
      <div className="flex items-center bg-white rounded-full p-2 pl-6 shadow-lg border border-[#087A4B]/20 focus-within:border-[#087A4B] focus-within:ring-4 focus-within:ring-[#0B9A5B]/15 transition-all">
        <Search className="w-5 h-5 text-slate-400 mr-3 flex-shrink-0" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={placeholder}
          className="w-full text-slate-800 placeholder-slate-400 bg-transparent text-sm focus:outline-none py-2"
        />
        <button
          type="submit"
          className="bg-[#087A4B] hover:bg-[#064E3B] text-white px-7 py-3 rounded-full text-sm font-semibold flex items-center gap-2 shadow-md transition-all flex-shrink-0"
        >
          <Search className="w-4 h-4" />
          <span>Search</span>
        </button>
      </div>
    </form>
  );
}
