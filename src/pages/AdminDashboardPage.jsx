import React, { useState } from 'react';
import { 
  Search, Users, Package, Wrench, ShoppingBag, MessageSquare, BarChart3, Settings, 
  ShieldCheck, AlertTriangle, Trash2, CheckCircle2, XCircle, Plus, Filter, Download,
  Eye, Edit3, DollarSign, Calendar, MapPin, Check, X
} from 'lucide-react';
import AdminSidebar from '../components/admin/AdminSidebar';
import MemberActionModal from '../components/admin/MemberActionModal';
import ConfirmationModal from '../components/common/ConfirmationModal';
import VerificationBadge from '../components/common/VerificationBadge';
import AddListingModal from '../components/user/AddListingModal';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { KENYA_COUNTIES } from '../data/kenyaCounties';

export default function AdminDashboardPage({ onExitAdmin }) {
  const { users, currentUser } = useAuth();
  const { 
    listings, messages, reports, adminLogs, 
    verifyMember, suspendMember, deleteMember, 
    updateListingStatus, toggleFeaturedListing, addListing, deleteListing
  } = useData();
  const { orders, updateOrderStatus, updateOrderPaymentStatus } = useCart();
  const { addToast } = useToast();

  const [activeTab, setActiveTab] = useState('dashboard'); // 'dashboard'|'members'|'products'|'services'|'orders'|'messages'|'reports'|'settings'

  // Access guard: strictly allow only authenticated managers
  if (!currentUser || currentUser.accountType !== 'Manager') {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl p-8 max-w-md w-full text-center space-y-4 shadow-2xl">
          <div className="w-16 h-16 bg-red-100 text-red-600 rounded-2xl flex items-center justify-center mx-auto">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-black text-slate-900">Restricted Manager Area</h2>
          <p className="text-xs text-slate-600">
            Access denied. You must be authenticated with an authorized Manager account to view or operate this administrative console.
          </p>
          <div className="pt-2 flex flex-col gap-2">
            <button
              onClick={onExitAdmin}
              className="w-full bg-[#087A4B] text-white font-bold py-3 rounded-xl text-xs hover:bg-[#064E3B] transition"
            >
              Return to Public Marketplace
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  // Search & Filters
  const [memberSearch, setMemberSearch] = useState('');
  const [memberTypeFilter, setMemberTypeFilter] = useState('All');
  const [memberStatusFilter, setMemberStatusFilter] = useState('All');

  const [productSearch, setProductSearch] = useState('');
  const [productCategoryFilter, setProductCategoryFilter] = useState('All');

  const [serviceSearch, setServiceSearch] = useState('');

  const [orderSearch, setOrderSearch] = useState('');
  const [orderStatusFilter, setOrderStatusFilter] = useState('All');

  // Modals
  const [selectedMember, setSelectedMember] = useState(null);
  const [deleteConfirmUser, setDeleteConfirmUser] = useState(null);
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);

  // Platform Settings State
  const [settings, setSettings] = useState({
    marketplaceName: 'Agro Kenya Marketplace',
    supportEmail: 'support@agrokenya.co.ke',
    supportEmailSecondary: 'info@agrokenya.co.ke',
    defaultLocation: 'Kenya',
    requireListingApproval: false
  });

  // Calculate Metrics
  const totalMembers = users.length;
  const activeMembers = users.filter(u => u.status === 'Active').length;
  const verifiedMembers = users.filter(u => u.verified).length;

  const productsList = listings.filter(l => l.listingType !== 'Service' && l.category !== 'Agricultural Services' && l.category !== 'Land Leasing');
  const servicesList = listings.filter(l => l.listingType === 'Service' || l.category === 'Agricultural Services' || l.category === 'Land Leasing');

  const totalActiveProducts = productsList.filter(p => p.status === 'Active').length;
  const totalActiveServices = servicesList.filter(s => s.status === 'Active').length;

  const totalOrders = orders.length;
  const pendingOrders = orders.filter(o => o.status === 'pending').length;
  const completedOrders = orders.filter(o => o.status === 'completed').length;
  const totalSalesKSh = orders
    .filter(o => o.status === 'completed' || o.paymentStatus === 'paid')
    .reduce((sum, o) => sum + (o.totalAmount || 0), 0);

  // Filter Members Table
  const filteredUsers = users.filter(u => {
    if (memberTypeFilter !== 'All' && u.accountType !== memberTypeFilter) return false;
    if (memberStatusFilter !== 'All' && u.status !== memberStatusFilter) return false;
    if (memberSearch.trim()) {
      const q = memberSearch.toLowerCase();
      const matchName = u.fullName.toLowerCase().includes(q);
      const matchPhone = u.phone.includes(q);
      const matchEmail = u.email.toLowerCase().includes(q);
      const matchCounty = (u.county || '').toLowerCase().includes(q);
      if (!matchName && !matchPhone && !matchEmail && !matchCounty) return false;
    }
    return true;
  });

  // Filter Products Table
  const filteredProducts = productsList.filter(p => {
    if (productCategoryFilter !== 'All' && p.category !== productCategoryFilter) return false;
    if (productSearch.trim()) {
      const q = productSearch.toLowerCase();
      return p.title.toLowerCase().includes(q) || (p.sellerName || '').toLowerCase().includes(q) || (p.county || '').toLowerCase().includes(q);
    }
    return true;
  });

  // Filter Services Table
  const filteredServices = servicesList.filter(s => {
    if (serviceSearch.trim()) {
      const q = serviceSearch.toLowerCase();
      return s.title.toLowerCase().includes(q) || (s.sellerName || '').toLowerCase().includes(q) || (s.county || '').toLowerCase().includes(q);
    }
    return true;
  });

  // Filter Orders Table
  const filteredOrders = orders.filter(o => {
    if (orderStatusFilter !== 'All' && o.status !== orderStatusFilter) return false;
    if (orderSearch.trim()) {
      const q = orderSearch.toLowerCase();
      return o.orderNumber.toLowerCase().includes(q) || (o.buyerName || '').toLowerCase().includes(q) || (o.buyerPhone || '').includes(q);
    }
    return true;
  });

  // CSV Export Handler
  const exportCSVReport = () => {
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "Type,ID,Title_Or_Name,Category_Or_Role,Location,Price_Or_Phone,Status,Date\n";

    listings.forEach(l => {
      csvContent += `Listing,${l.id},"${l.title.replace(/"/g, '""')}",${l.category},"${l.county}",${l.price},${l.status},${l.createdAt}\n`;
    });

    orders.forEach(o => {
      csvContent += `Order,${o.orderNumber},"${o.buyerName}",${o.paymentStatus},"${o.deliveryLocation}",${o.totalAmount},${o.status},${o.createdAt}\n`;
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Agro_Kenya_Platform_Report_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    addToast("Platform CSV report generated and downloaded!", "success");
  };

  return (
    <div className="flex min-h-screen bg-[#F8FAF4]">

      {/* DARK GREEN MANAGER SIDEBAR */}
      <AdminSidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onExitAdmin={onExitAdmin}
      />

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 p-6 sm:p-10 overflow-y-auto">

        {/* 1. DASHBOARD OVERVIEW TAB */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8 animate-fade-in">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-black text-slate-900">Manager Dashboard</h1>
                <p className="text-xs text-slate-500">Live platform metrics, active queues, orders & financial summary.</p>
              </div>
              <button
                onClick={exportCSVReport}
                className="bg-[#087A4B] hover:bg-[#064E3B] text-white text-xs font-bold px-4 py-2.5 rounded-xl flex items-center gap-2 shadow-md transition"
              >
                <Download className="w-4 h-4" />
                <span>Export CSV Report</span>
              </button>
            </div>

            {/* METRICS CARDS GRID */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Total Members</span>
                  <span className="text-3xl font-black text-slate-900">{totalMembers}</span>
                  <span className="text-[10px] text-emerald-600 font-bold block mt-0.5">{activeMembers} Active</span>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-[#087A4B] flex items-center justify-center">
                  <Users className="w-6 h-6" />
                </div>
              </div>

              <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Active Products</span>
                  <span className="text-3xl font-black text-[#087A4B]">{totalActiveProducts}</span>
                  <span className="text-[10px] text-slate-400 font-medium block mt-0.5">{totalActiveServices} Services</span>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-[#087A4B] flex items-center justify-center">
                  <Package className="w-6 h-6" />
                </div>
              </div>

              <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Total Orders</span>
                  <span className="text-3xl font-black text-blue-700">{totalOrders}</span>
                  <span className="text-[10px] text-amber-600 font-bold block mt-0.5">{pendingOrders} Pending</span>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center">
                  <ShoppingBag className="w-6 h-6" />
                </div>
              </div>

              <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Paid Sales (KSh)</span>
                  <span className="text-2xl font-black text-slate-900">KSh {totalSalesKSh.toLocaleString()}</span>
                  <span className="text-[10px] text-emerald-600 font-bold block mt-0.5">{completedOrders} Completed Orders</span>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center">
                  <DollarSign className="w-6 h-6" />
                </div>
              </div>
            </div>

            {/* RECENT ORDERS & AUDIT SUMMARY */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* RECENT ORDERS TABLE */}
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-slate-900 text-sm">Recent Platform Orders</h3>
                  <button onClick={() => setActiveTab('orders')} className="text-xs text-[#087A4B] font-bold hover:underline">
                    View All Orders →
                  </button>
                </div>
                <div className="space-y-3">
                  {orders.slice(0, 4).map(ord => (
                    <div key={ord.id} className="p-3 bg-[#F8FAF4] rounded-2xl text-xs flex items-center justify-between border border-slate-100">
                      <div>
                        <span className="font-mono font-bold text-slate-900 block">{ord.orderNumber}</span>
                        <span className="text-slate-500">{ord.buyerName} • {ord.deliveryLocation}</span>
                      </div>
                      <div className="text-right">
                        <span className="font-black text-[#087A4B] block">KSh {ord.totalAmount.toLocaleString()}</span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          ord.status === 'completed' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                        }`}>
                          {ord.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* RECENT AUDIT LOGS */}
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-slate-900 text-sm">Recent Manager Moderation Logs</h3>
                </div>
                <div className="space-y-3">
                  {adminLogs.slice(0, 4).map(log => (
                    <div key={log.id} className="p-3 bg-[#F8FAF4] rounded-2xl text-xs space-y-1 border border-slate-100">
                      <span className="font-bold text-[#087A4B] block">{log.action}</span>
                      <p className="text-slate-600">{log.details}</p>
                      <span className="text-[10px] text-slate-400">{new Date(log.createdAt).toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        )}

        {/* 2. MEMBER MANAGEMENT TAB */}
        {activeTab === 'members' && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl font-black text-slate-900">Member Directory Management</h1>
                <p className="text-xs text-slate-500">Inspect registered farmers, buyers, sellers, and service providers.</p>
              </div>

              <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
                <select
                  value={memberTypeFilter}
                  onChange={(e) => setMemberTypeFilter(e.target.value)}
                  className="px-3 py-2 rounded-xl border border-slate-200 text-xs bg-white outline-none"
                >
                  <option value="All">All Roles</option>
                  <option value="Farmer">Farmers</option>
                  <option value="Buyer">Buyers</option>
                  <option value="Seller">Sellers</option>
                  <option value="Service Provider">Service Providers</option>
                </select>

                <div className="relative max-w-xs w-full">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    placeholder="Search name, email, phone..."
                    value={memberSearch}
                    onChange={(e) => setMemberSearch(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 text-xs bg-white outline-none focus:border-[#087A4B]"
                  />
                </div>
              </div>
            </div>

            {/* MEMBERS DATA TABLE */}
            <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#F8FAF4] border-b border-slate-200 text-slate-600 font-bold uppercase text-[10px]">
                    <tr>
                      <th className="p-4">Member Name</th>
                      <th className="p-4">Phone</th>
                      <th className="p-4">Email</th>
                      <th className="p-4">County</th>
                      <th className="p-4">Role</th>
                      <th className="p-4">Verification</th>
                      <th className="p-4">Status</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium">
                    {filteredUsers.map((member) => (
                      <tr key={member.id} className="hover:bg-slate-50 transition">
                        <td className="p-4 font-bold text-slate-900 flex items-center gap-2">
                          <img src={member.profileImage} alt="avatar" className="w-8 h-8 rounded-full object-cover" />
                          <span>{member.fullName}</span>
                        </td>
                        <td className="p-4 text-slate-600 font-mono">{member.phone}</td>
                        <td className="p-4 text-slate-600">{member.email}</td>
                        <td className="p-4 text-slate-600">{member.county}</td>
                        <td className="p-4 font-semibold text-[#087A4B]">{member.accountType}</td>
                        <td className="p-4">
                          <button
                            onClick={() => verifyMember(member.id)}
                            className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                              member.verified ? 'bg-blue-100 text-blue-800' : 'bg-slate-100 text-slate-600'
                            }`}
                          >
                            {member.verified ? '✓ Verified' : '+ Verify'}
                          </button>
                        </td>
                        <td className="p-4">
                          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                            member.status === 'Active' ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
                          }`}>
                            {member.status}
                          </span>
                        </td>
                        <td className="p-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => suspendMember(member.id)}
                              className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 font-bold hover:bg-slate-200 transition text-[11px]"
                            >
                              {member.status === 'Active' ? 'Suspend' : 'Activate'}
                            </button>
                            <button
                              onClick={() => setSelectedMember(member)}
                              className="px-3 py-1 rounded-lg bg-[#E8F6EE] text-[#087A4B] font-bold hover:bg-[#087A4B] hover:text-white transition text-[11px]"
                            >
                              Manage
                            </button>
                            {member.accountType !== 'Manager' && (
                              <button
                                onClick={() => setDeleteConfirmUser(member)}
                                className="px-2.5 py-1 rounded-lg bg-red-100 text-red-700 font-bold hover:bg-red-600 hover:text-white transition text-[11px]"
                              >
                                Delete
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* 3. PRODUCT MANAGEMENT TAB */}
        {activeTab === 'products' && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl font-black text-slate-900">Product Marketplace Management</h1>
                <p className="text-xs text-slate-500">Approve, edit, feature or archive agricultural products.</p>
              </div>
              <button
                onClick={() => setIsAddProductOpen(true)}
                className="bg-[#087A4B] hover:bg-[#064E3B] text-white text-xs font-bold px-4 py-2.5 rounded-xl flex items-center gap-2 shadow-md"
              >
                <Plus className="w-4 h-4" />
                <span>+ Add Product</span>
              </button>
            </div>

            <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#F8FAF4] border-b border-slate-200 text-slate-600 font-bold uppercase text-[10px]">
                    <tr>
                      <th className="p-4">Product Title</th>
                      <th className="p-4">Seller</th>
                      <th className="p-4">Category</th>
                      <th className="p-4">County</th>
                      <th className="p-4">Price</th>
                      <th className="p-4">Status</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredProducts.map(product => (
                      <tr key={product.id} className="hover:bg-slate-50">
                        <td className="p-4 font-bold text-slate-900 flex items-center gap-2.5">
                          <img src={product.images[0]} alt="thumb" className="w-9 h-9 rounded-xl object-cover" />
                          <span>{product.title}</span>
                        </td>
                        <td className="p-4 text-slate-600">{product.sellerName}</td>
                        <td className="p-4 text-slate-600">{product.category}</td>
                        <td className="p-4 text-slate-600">{product.county}</td>
                        <td className="p-4 font-black text-[#087A4B]">KSh {product.price.toLocaleString()} / {product.priceUnit}</td>
                        <td className="p-4">
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                            {product.status}
                          </span>
                        </td>
                        <td className="p-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => toggleFeaturedListing(product.id)}
                              className={`px-3 py-1 rounded-lg font-bold text-[11px] ${
                                product.featured ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-slate-600'
                              }`}
                            >
                              {product.featured ? '★ Featured' : 'Feature'}
                            </button>
                            <button
                              onClick={() => deleteListing(product.id)}
                              className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg"
                              title="Delete product"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* 4. SERVICE MANAGEMENT TAB */}
        {activeTab === 'services' && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl font-black text-slate-900">Agricultural Services Management</h1>
                <p className="text-xs text-slate-500">Tractor hire, ploughing, irrigation installation & land leasing listings.</p>
              </div>
              <button
                onClick={() => setIsAddProductOpen(true)}
                className="bg-[#087A4B] hover:bg-[#064E3B] text-white text-xs font-bold px-4 py-2.5 rounded-xl flex items-center gap-2 shadow-md"
              >
                <Plus className="w-4 h-4" />
                <span>+ Add Service</span>
              </button>
            </div>

            <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#F8FAF4] border-b border-slate-200 text-slate-600 font-bold uppercase text-[10px]">
                    <tr>
                      <th className="p-4">Service Title</th>
                      <th className="p-4">Provider</th>
                      <th className="p-4">Category</th>
                      <th className="p-4">County</th>
                      <th className="p-4">Price Rate</th>
                      <th className="p-4">Status</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredServices.map(service => (
                      <tr key={service.id} className="hover:bg-slate-50">
                        <td className="p-4 font-bold text-slate-900 flex items-center gap-2.5">
                          <img src={service.images[0]} alt="thumb" className="w-9 h-9 rounded-xl object-cover" />
                          <span>{service.title}</span>
                        </td>
                        <td className="p-4 text-slate-600">{service.sellerName}</td>
                        <td className="p-4 text-slate-600">{service.category}</td>
                        <td className="p-4 text-slate-600">{service.county}</td>
                        <td className="p-4 font-black text-[#087A4B]">KSh {service.price.toLocaleString()} / {service.priceUnit}</td>
                        <td className="p-4">
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                            {service.status}
                          </span>
                        </td>
                        <td className="p-4 text-right">
                          <button
                            onClick={() => deleteListing(service.id)}
                            className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg"
                            title="Delete service"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* 5. ORDERS MANAGEMENT TAB */}
        {activeTab === 'orders' && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl font-black text-slate-900">Platform Orders Management</h1>
                <p className="text-xs text-slate-500">Monitor customer transactions, order status and payment verification.</p>
              </div>

              <div className="flex items-center gap-3">
                <select
                  value={orderStatusFilter}
                  onChange={(e) => setOrderStatusFilter(e.target.value)}
                  className="px-3 py-2 rounded-xl border border-slate-200 text-xs bg-white outline-none"
                >
                  <option value="All">All Statuses</option>
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="processing">Processing</option>
                  <option value="dispatched">Dispatched</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>

                <div className="relative max-w-xs w-full">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    placeholder="Search order #, buyer..."
                    value={orderSearch}
                    onChange={(e) => setOrderSearch(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 text-xs bg-white outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#F8FAF4] border-b border-slate-200 text-slate-600 font-bold uppercase text-[10px]">
                    <tr>
                      <th className="p-4">Order #</th>
                      <th className="p-4">Buyer Name</th>
                      <th className="p-4">Phone</th>
                      <th className="p-4">Location</th>
                      <th className="p-4">Total (KSh)</th>
                      <th className="p-4">Payment</th>
                      <th className="p-4">Order Status</th>
                      <th className="p-4 text-right">Update Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredOrders.map(ord => (
                      <tr key={ord.id} className="hover:bg-slate-50">
                        <td className="p-4 font-mono font-bold text-slate-900">{ord.orderNumber}</td>
                        <td className="p-4 text-slate-800 font-bold">{ord.buyerName}</td>
                        <td className="p-4 text-slate-600 font-mono">{ord.buyerPhone}</td>
                        <td className="p-4 text-slate-600">{ord.deliveryLocation}</td>
                        <td className="p-4 font-black text-[#087A4B]">KSh {ord.totalAmount.toLocaleString()}</td>
                        <td className="p-4">
                          <button
                            onClick={() => updateOrderPaymentStatus(ord.id, ord.paymentStatus === 'paid' ? 'unpaid' : 'paid')}
                            className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                              ord.paymentStatus === 'paid' ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
                            }`}
                          >
                            {ord.paymentStatus === 'paid' ? '✓ Paid' : 'Unpaid'}
                          </button>
                        </td>
                        <td className="p-4">
                          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                            ord.status === 'completed' ? 'bg-emerald-100 text-emerald-800' :
                            ord.status === 'pending' ? 'bg-amber-100 text-amber-800' : 'bg-blue-100 text-blue-800'
                          }`}>
                            {ord.status}
                          </span>
                        </td>
                        <td className="p-4 text-right">
                          <select
                            value={ord.status}
                            onChange={(e) => updateOrderStatus(ord.id, e.target.value)}
                            className="px-2 py-1 rounded-lg border border-slate-200 text-[11px] bg-white font-bold text-slate-700 outline-none"
                          >
                            <option value="pending">pending</option>
                            <option value="confirmed">confirmed</option>
                            <option value="processing">processing</option>
                            <option value="dispatched">dispatched</option>
                            <option value="completed">completed</option>
                            <option value="cancelled">cancelled</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* 6. MESSAGES LOGS TAB */}
        {activeTab === 'messages' && (
          <div className="space-y-6 animate-fade-in">
            <h1 className="text-2xl font-black text-slate-900">Communication & Messaging Audit Logs</h1>
            <p className="text-xs text-slate-500">Monitor buyer-seller discussions for marketplace safety and support resolution.</p>
            
            <div className="bg-white rounded-3xl border border-slate-200 p-6 space-y-3 shadow-sm">
              {messages.map(msg => (
                <div key={msg.id} className="p-4 bg-[#F8FAF4] rounded-2xl border border-slate-100 text-xs space-y-1">
                  <div className="flex justify-between items-center text-slate-500">
                    <span className="font-bold text-[#087A4B]">Listing: {msg.listingTitle}</span>
                    <span className="font-mono text-[10px]">{new Date(msg.timestamp).toLocaleString()}</span>
                  </div>
                  <p className="text-slate-800 text-sm font-medium">"{msg.message}"</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 7. REPORTS & ANALYTICS TAB */}
        {activeTab === 'reports' && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-black text-slate-900">Platform Reports & Analytics</h1>
                <p className="text-xs text-slate-500">Distribution metrics, regional county activity & export tools.</p>
              </div>
              <button
                onClick={exportCSVReport}
                className="bg-[#087A4B] hover:bg-[#064E3B] text-white text-xs font-bold px-4 py-2.5 rounded-xl flex items-center gap-2 shadow-md"
              >
                <Download className="w-4 h-4" />
                <span>Export CSV Report</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
                <h3 className="font-bold text-slate-900 text-sm">Members by Role</h3>
                <div className="space-y-2 text-xs">
                  {['Farmer', 'Buyer', 'Seller', 'Service Provider', 'Manager'].map(role => {
                    const count = users.filter(u => u.accountType === role).length;
                    const pct = Math.round((count / (totalMembers || 1)) * 100);
                    return (
                      <div key={role} className="space-y-1">
                        <div className="flex justify-between text-slate-700">
                          <span>{role}</span>
                          <span className="font-bold">{count} ({pct}%)</span>
                        </div>
                        <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full bg-[#087A4B]" style={{ width: `${pct}%` }} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4 md:col-span-2">
                <h3 className="font-bold text-slate-900 text-sm">Listings by County Breakdown</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                  {KENYA_COUNTIES.slice(0, 9).map(county => {
                    const count = listings.filter(l => l.county === county).length;
                    return (
                      <div key={county} className="p-3 bg-[#F8FAF4] rounded-2xl border border-slate-100">
                        <span className="font-bold text-slate-900 block">{county}</span>
                        <span className="text-[#087A4B] font-black text-sm">{count} Listings</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 8. PLATFORM SETTINGS TAB */}
        {activeTab === 'settings' && (
          <div className="space-y-6 max-w-3xl animate-fade-in">
            <div>
              <h1 className="text-2xl font-black text-slate-900">Platform Configuration Settings</h1>
              <p className="text-xs text-slate-500">Configure marketplace identity, contact defaults, and moderation parameters.</p>
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Marketplace Display Title</label>
                <input
                  type="text"
                  value={settings.marketplaceName}
                  onChange={(e) => setSettings({ ...settings, marketplaceName: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs outline-none focus:border-[#087A4B]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Support Email</label>
                  <input
                    type="email"
                    value={settings.supportEmail}
                    onChange={(e) => setSettings({ ...settings, supportEmail: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs outline-none focus:border-[#087A4B]"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Secondary Inquiries Email</label>
                  <input
                    type="email"
                    value={settings.supportEmailSecondary}
                    onChange={(e) => setSettings({ ...settings, supportEmailSecondary: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs outline-none focus:border-[#087A4B]"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Default Platform Location</label>
                <input
                  type="text"
                  value={settings.defaultLocation}
                  onChange={(e) => setSettings({ ...settings, defaultLocation: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs outline-none focus:border-[#087A4B]"
                />
              </div>

              <div className="pt-4 border-t border-slate-100">
                <button
                  onClick={() => addToast('Platform settings saved successfully!', 'success')}
                  className="bg-[#087A4B] hover:bg-[#064E3B] text-white font-bold px-6 py-3 rounded-xl text-xs shadow-lg shadow-[#087A4B]/20 transition"
                >
                  Save Platform Settings
                </button>
              </div>
            </div>
          </div>
        )}

      </main>

      {/* MEMBER ACTION MODAL */}
      {selectedMember && (
        <MemberActionModal
          member={selectedMember}
          onClose={() => setSelectedMember(null)}
          onConfirmDelete={(m) => setDeleteConfirmUser(m)}
        />
      )}

      {/* CONFIRMATION MODAL FOR MEMBER DELETION */}
      {deleteConfirmUser && (
        <ConfirmationModal
          isOpen={true}
          title="Delete Member Account?"
          message={`Are you sure you want to remove member "${deleteConfirmUser.fullName}"? This action will suspend their access and permanently remove all their associated listings.`}
          confirmText="Yes, Delete Member"
          confirmStyle="danger"
          onConfirm={() => {
            deleteMember(deleteConfirmUser.id);
            setDeleteConfirmUser(null);
          }}
          onClose={() => setDeleteConfirmUser(null)}
        />
      )}

      {/* ADD PRODUCT/SERVICE MODAL */}
      {isAddProductOpen && (
        <AddListingModal
          isOpen={isAddProductOpen}
          onClose={() => setIsAddProductOpen(false)}
        />
      )}

    </div>
  );
}
