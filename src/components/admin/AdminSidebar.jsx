import React from 'react';
import { Leaf, LayoutDashboard, Users, Package, Wrench, ShoppingBag, MessageSquare, BarChart3, Settings, LogOut, ArrowLeft } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function AdminSidebar({ activeTab, setActiveTab, onExitAdmin }) {
  const { logout, currentUser } = useAuth();

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'members', label: 'Members', icon: Users },
    { id: 'products', label: 'Products', icon: Package },
    { id: 'services', label: 'Services', icon: Wrench },
    { id: 'orders', label: 'Orders', icon: ShoppingBag },
    { id: 'messages', label: 'Messages', icon: MessageSquare },
    { id: 'reports', label: 'Reports & Analytics', icon: BarChart3 },
    { id: 'settings', label: 'Platform Settings', icon: Settings },
  ];

  return (
    <aside className="w-64 bg-[#064E3B] text-white flex flex-col min-h-screen border-r border-emerald-900 shadow-xl flex-shrink-0">

      {/* LOGO */}
      <div className="p-6 border-b border-emerald-800/80 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-[#0B9A5B] flex items-center justify-center text-white shadow-md">
            <Leaf className="w-5 h-5" />
          </div>
          <div>
            <span className="font-extrabold text-base tracking-tight text-white block">Agro Kenya</span>
            <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-300 block -mt-1">Manager Portal</span>
          </div>
        </div>
      </div>

      {/* ADMIN PERSONA INFO */}
      <div className="p-4 mx-3 my-4 bg-white/10 rounded-2xl border border-white/10 flex items-center gap-3">
        <img
          src={currentUser?.profileImage || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300"}
          alt="Manager"
          className="w-10 h-10 rounded-full object-cover border-2 border-emerald-400"
        />
        <div className="min-w-0">
          <p className="text-xs font-bold text-white truncate">{currentUser?.fullName || "Manager Admin"}</p>
          <span className="text-[10px] bg-emerald-400/20 text-emerald-300 font-semibold px-2 py-0.5 rounded-full inline-block">
            System Manager
          </span>
        </div>
      </div>

      {/* NAVIGATION ITEMS */}
      <nav className="flex-1 px-3 space-y-1.5">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition ${
                isActive
                  ? 'bg-[#0B9A5B] text-white shadow-md shadow-[#0B9A5B]/30'
                  : 'text-emerald-100/80 hover:bg-white/10 hover:text-white'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* BOTTOM ACTIONS */}
      <div className="p-4 border-t border-emerald-800/80 space-y-2">
        <button
          onClick={onExitAdmin}
          className="w-full flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white text-xs font-bold py-2.5 rounded-xl transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Customer Marketplace</span>
        </button>

        <button
          onClick={() => {
            logout();
            if (onExitAdmin) onExitAdmin();
          }}
          className="w-full flex items-center justify-center gap-2 text-red-300 hover:text-white hover:bg-red-900/40 text-xs font-bold py-2 rounded-xl transition"
        >
          <LogOut className="w-4 h-4" />
          <span>Logout</span>
        </button>
      </div>

    </aside>
  );
}
