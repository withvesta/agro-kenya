import React from 'react';
import { CATEGORIES } from '../../data/categories';
import { Wheat, Tractor, MapPin, Sprout, Briefcase, Truck, Beef, Layers } from 'lucide-react';
import { useData } from '../../context/DataContext';

export default function CategoryFilterPills() {
  const { selectedCategory, setSelectedCategory } = useData();

  const getIcon = (catName) => {
    switch (catName) {
      case 'Farm Produce': return <Wheat className="w-4 h-4" />;
      case 'Machinery': return <Tractor className="w-4 h-4" />;
      case 'Land Leasing': return <MapPin className="w-4 h-4" />;
      case 'Agricultural Inputs': return <Sprout className="w-4 h-4" />;
      case 'Agricultural Services': return <Briefcase className="w-4 h-4" />;
      case 'Transport & Logistics': return <Truck className="w-4 h-4" />;
      case 'Livestock & Animals': return <Beef className="w-4 h-4" />;
      default: return <Layers className="w-4 h-4" />;
    }
  };

  const pillCategories = [
    { id: 'All', name: 'All' },
    ...CATEGORIES.map(c => ({ id: c.name, name: c.name }))
  ];

  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none max-w-full">
      {pillCategories.map((cat) => {
        const isSelected = selectedCategory === cat.name;
        return (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.name)}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold whitespace-nowrap transition-all shadow-sm ${
              isSelected
                ? 'bg-[#087A4B] text-white shadow-md shadow-[#087A4B]/20 scale-105'
                : 'bg-white text-slate-700 hover:bg-[#E8F6EE] hover:text-[#087A4B] border border-slate-200'
            }`}
          >
            {getIcon(cat.name)}
            <span>{cat.name}</span>
          </button>
        );
      })}
    </div>
  );
}
