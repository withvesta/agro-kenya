import React, { useState } from 'react';
import { X, Upload, Plus, Image as ImageIcon, CheckCircle } from 'lucide-react';
import { KENYA_COUNTIES } from '../../data/kenyaCounties';
import { CATEGORIES } from '../../data/categories';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';

export default function AddListingModal({ isOpen, onClose }) {
  const { addListing } = useData();
  const { currentUser } = useAuth();

  const [formData, setFormData] = useState({
    title: '',
    listingType: 'For Sale',
    category: 'Farm Produce',
    subcategory: 'Tomatoes',
    price: '',
    priceUnit: 'kg',
    quantity: '',
    county: currentUser?.county || 'Nakuru',
    town: currentUser?.town || 'Naivasha',
    description: '',
    images: [
      "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&q=80&w=800"
    ]
  });

  const [imageUrlInput, setImageUrlInput] = useState('');

  if (!isOpen) return null;

  const handleAddImageUrl = () => {
    if (imageUrlInput.trim()) {
      setFormData(prev => ({ ...prev, images: [...prev.images, imageUrlInput.trim()] }));
      setImageUrlInput('');
    }
  };

  const handleRemoveImage = (index) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.price) return;
    const success = addListing(formData);
    if (success) {
      onClose();
    }
  };

  const selectedCategoryObj = CATEGORIES.find(c => c.name === formData.category) || CATEGORIES[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm overflow-y-auto animate-fade-in">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-100 relative my-auto">

        {/* HEADER */}
        <div className="sticky top-0 bg-white z-10 px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#E8F6EE] text-[#087A4B] flex items-center justify-center font-bold">
              +
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">Add New Listing</h2>
              <p className="text-xs text-slate-500">Publish your produce, machinery, land, or service</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5 text-xs">

          {/* LISTING TYPE PILLS */}
          <div>
            <label className="font-bold text-slate-700 block mb-1.5">Listing Purpose</label>
            <div className="flex flex-wrap gap-2">
              {['For Sale', 'For Lease', 'For Rent', 'Service', 'Wanted'].map((type) => (
                <button
                  type="button"
                  key={type}
                  onClick={() => setFormData({ ...formData, listingType: type })}
                  className={`px-4 py-2 rounded-xl font-bold transition ${
                    formData.listingType === type
                      ? 'bg-[#087A4B] text-white shadow-md'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* TITLE */}
          <div>
            <label className="font-bold text-slate-700 block mb-1">Product / Service Name *</label>
            <input
              type="text"
              required
              placeholder="e.g. Fresh Red Tomatoes (Anna F1), John Deere Tractor, 5 Acres Land"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full p-3 rounded-xl border border-slate-200 text-sm focus:border-[#087A4B] focus:ring-2 focus:ring-[#087A4B]/20 outline-none"
            />
          </div>

          {/* CATEGORY & SUBCATEGORY */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="font-bold text-slate-700 block mb-1">Main Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value, subcategory: CATEGORIES.find(c => c.name === e.target.value)?.subcategories[0] || '' })}
                className="w-full p-3 rounded-xl border border-slate-200 text-sm bg-white outline-none focus:border-[#087A4B]"
              >
                {CATEGORIES.map(c => (
                  <option key={c.id} value={c.name}>{c.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Subcategory</label>
              <select
                value={formData.subcategory}
                onChange={(e) => setFormData({ ...formData, subcategory: e.target.value })}
                className="w-full p-3 rounded-xl border border-slate-200 text-sm bg-white outline-none focus:border-[#087A4B]"
              >
                {selectedCategoryObj.subcategories.map(sub => (
                  <option key={sub} value={sub}>{sub}</option>
                ))}
              </select>
            </div>
          </div>

          {/* PRICE, UNIT & QUANTITY */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="font-bold text-slate-700 block mb-1">Price (KSh) *</label>
              <input
                type="number"
                required
                placeholder="80"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="w-full p-3 rounded-xl border border-slate-200 text-sm outline-none focus:border-[#087A4B]"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Pricing Unit</label>
              <input
                type="text"
                placeholder="e.g. kg, 90kg bag, acre/yr, unit"
                value={formData.priceUnit}
                onChange={(e) => setFormData({ ...formData, priceUnit: e.target.value })}
                className="w-full p-3 rounded-xl border border-slate-200 text-sm outline-none focus:border-[#087A4B]"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Stock / Available Quantity</label>
              <input
                type="text"
                placeholder="e.g. 50 bags, 5 acres"
                value={formData.quantity}
                onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                className="w-full p-3 rounded-xl border border-slate-200 text-sm outline-none focus:border-[#087A4B]"
              />
            </div>
          </div>

          {/* LOCATION (COUNTY & TOWN) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="font-bold text-slate-700 block mb-1">County (Kenya)</label>
              <select
                value={formData.county}
                onChange={(e) => setFormData({ ...formData, county: e.target.value })}
                className="w-full p-3 rounded-xl border border-slate-200 text-sm bg-white outline-none focus:border-[#087A4B]"
              >
                {KENYA_COUNTIES.map(county => (
                  <option key={county} value={county}>{county}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Town / Market Hub</label>
              <input
                type="text"
                placeholder="e.g. Naivasha, Kitale, Thika"
                value={formData.town}
                onChange={(e) => setFormData({ ...formData, town: e.target.value })}
                className="w-full p-3 rounded-xl border border-slate-200 text-sm outline-none focus:border-[#087A4B]"
              />
            </div>
          </div>

          {/* DESCRIPTION */}
          <div>
            <label className="font-bold text-slate-700 block mb-1">Detailed Description</label>
            <textarea
              rows={4}
              required
              placeholder="Describe product quality, farming method, water access for land, machine specs, minimum order or delivery options..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full p-3 rounded-xl border border-slate-200 text-sm outline-none focus:border-[#087A4B]"
            />
          </div>

          {/* IMAGES UPLOADER PREVIEW */}
          <div>
            <label className="font-bold text-slate-700 block mb-1">Photos / Image URLs</label>
            <div className="flex gap-2 mb-3">
              <input
                type="url"
                placeholder="Paste Image URL (or use default mock images)"
                value={imageUrlInput}
                onChange={(e) => setImageUrlInput(e.target.value)}
                className="flex-1 p-2.5 rounded-xl border border-slate-200 text-xs outline-none"
              />
              <button
                type="button"
                onClick={handleAddImageUrl}
                className="bg-[#087A4B] text-white font-bold px-4 py-2.5 rounded-xl flex items-center gap-1"
              >
                <Plus className="w-4 h-4" /> Add Image
              </button>
            </div>

            {/* PREVIEW THUMBNAILS */}
            <div className="flex flex-wrap gap-2">
              {formData.images.map((img, idx) => (
                <div key={idx} className="relative w-20 h-20 rounded-xl overflow-hidden border border-slate-200 group">
                  <img src={img} alt="preview" className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(idx)}
                    className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* SUBMIT BUTTONS */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-3 rounded-xl border border-slate-200 text-slate-700 font-bold hover:bg-slate-50 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-7 py-3 rounded-xl bg-[#087A4B] hover:bg-[#064E3B] text-white font-bold shadow-lg shadow-[#087A4B]/20 transition"
            >
              Publish Listing Now
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
