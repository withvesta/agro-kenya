import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_LISTINGS, INITIAL_MESSAGES, INITIAL_REPORTS, INITIAL_REVIEWS, INITIAL_ADMIN_LOGS } from '../data/seedData';
import { useAuth } from './AuthContext';
import { useToast } from './ToastContext';
import { dbGetListings, isSupabaseConfigured } from '../lib/supabase';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const { currentUser, setUsers } = useAuth();
  const { addToast } = useToast();

  // Listings state
  const [listings, setListings] = useState(() => {
    if (isSupabaseConfigured) {
      localStorage.removeItem('agro_kenya_listings');
      return [];
    }
    const saved = localStorage.getItem('agro_kenya_listings');
    return saved ? JSON.parse(saved) : INITIAL_LISTINGS;
  });

  // Fetch live Supabase database listings on mount
  useEffect(() => {
    async function loadLiveListings() {
      if (!isSupabaseConfigured) return;
      const data = await dbGetListings();
      if (data) {
        const liveProducts = (data.products || []).map(p => ({
          id: p.id,
          userId: p.seller_id,
          sellerName: p.seller_name || 'Seller',
          sellerImage: p.seller_image || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=300',
          sellerVerified: p.seller_verified || false,
          title: p.name,
          category: p.category || 'Farm Produce',
          subcategory: p.subcategory || 'Other',
          listingType: 'For Sale',
          description: p.description,
          price: Number(p.price) || 0,
          priceUnit: p.unit || 'kg',
          quantity: p.quantity_available || 'Available',
          location: p.location || `${p.county || 'Nairobi'}, Kenya`,
          county: p.county || 'Nairobi',
          town: p.town || 'CBD',
          images: (p.images && p.images.length > 0) ? p.images : (p.image_url ? [p.image_url] : ['https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=800']),
          status: p.status || 'Active',
          featured: p.featured || false,
          views: p.views || 0,
          createdAt: p.created_at ? p.created_at.split('T')[0] : new Date().toISOString().split('T')[0],
          specs: {}
        }));

        const liveServices = (data.services || []).map(s => ({
          id: s.id,
          userId: s.provider_id,
          sellerName: s.provider_name || 'Service Provider',
          sellerImage: s.provider_image || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=300',
          sellerVerified: s.provider_verified || false,
          title: s.name,
          category: 'Services & Machinery',
          subcategory: s.category || 'Machinery',
          listingType: 'Service',
          description: s.description,
          price: Number(s.price) || 0,
          priceUnit: s.pricing_unit || 'per acre',
          quantity: s.availability_status || 'Available',
          location: s.location || `${s.county || 'Nairobi'}, Kenya`,
          county: s.county || 'Nairobi',
          town: s.town || 'CBD',
          images: (s.images && s.images.length > 0) ? s.images : (s.image_url ? [s.image_url] : ['https://images.unsplash.com/photo-1589923188900-85dae523342b?auto=format&fit=crop&q=80&w=800']),
          status: s.status || 'Active',
          featured: s.featured || false,
          views: 5,
          createdAt: s.created_at ? s.created_at.split('T')[0] : new Date().toISOString().split('T')[0],
          specs: {}
        }));

        setListings([...liveProducts, ...liveServices]);
      }
    }
    loadLiveListings();
  }, []);

  // Favorites state (array of listing IDs)
  const [favorites, setFavorites] = useState(() => {
    if (isSupabaseConfigured) {
      localStorage.removeItem('agro_kenya_favorites');
      return [];
    }
    const saved = localStorage.getItem('agro_kenya_favorites');
    return saved ? JSON.parse(saved) : [];
  });

  // Messages state
  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem('agro_kenya_messages');
    return saved ? JSON.parse(saved) : INITIAL_MESSAGES;
  });

  // Reports state
  const [reports, setReports] = useState(() => {
    const saved = localStorage.getItem('agro_kenya_reports');
    return saved ? JSON.parse(saved) : INITIAL_REPORTS;
  });

  // Reviews state
  const [reviews, setReviews] = useState(() => {
    const saved = localStorage.getItem('agro_kenya_reviews');
    return saved ? JSON.parse(saved) : INITIAL_REVIEWS;
  });

  // Admin Logs state
  const [adminLogs, setAdminLogs] = useState(() => {
    const saved = localStorage.getItem('agro_kenya_admin_logs');
    return saved ? JSON.parse(saved) : INITIAL_ADMIN_LOGS;
  });

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedCounty, setSelectedCounty] = useState('All');
  const [selectedType, setSelectedType] = useState('All');
  const [sortBy, setSortBy] = useState('Newest');

  // Active view details modal state
  const [activeListingModal, setActiveListingModal] = useState(null);
  const [activeMemberModal, setActiveMemberModal] = useState(null);
  const [isAddListingOpen, setIsAddListingOpen] = useState(false);
  const [activeChatListing, setActiveChatListing] = useState(null);

  // Sync to LocalStorage
  useEffect(() => {
    localStorage.setItem('agro_kenya_listings', JSON.stringify(listings));
  }, [listings]);

  useEffect(() => {
    localStorage.setItem('agro_kenya_favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('agro_kenya_messages', JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    localStorage.setItem('agro_kenya_reports', JSON.stringify(reports));
  }, [reports]);

  useEffect(() => {
    localStorage.setItem('agro_kenya_admin_logs', JSON.stringify(adminLogs));
  }, [adminLogs]);

  // FAVORITES ACTIONS
  const toggleFavorite = (listingId) => {
    if (favorites.includes(listingId)) {
      setFavorites(prev => prev.filter(id => id !== listingId));
      addToast("Removed from favorites", "info");
    } else {
      setFavorites(prev => [...prev, listingId]);
      addToast("Added to favorites!", "success");
    }
  };

  // CREATE LISTING ACTION
  const addListing = (newListingData) => {
    if (!currentUser) {
      addToast("Please login to post a listing.", "warning");
      return false;
    }

    const listing = {
      id: `list-${Date.now()}`,
      userId: currentUser.id,
      sellerName: currentUser.fullName,
      sellerImage: currentUser.profileImage,
      sellerVerified: currentUser.verified,
      title: newListingData.title,
      category: newListingData.category || "Farm Produce",
      subcategory: newListingData.subcategory || "Other",
      listingType: newListingData.listingType || "For Sale",
      description: newListingData.description,
      price: Number(newListingData.price) || 0,
      priceUnit: newListingData.priceUnit || "unit",
      quantity: newListingData.quantity || "Available on request",
      location: `${newListingData.county || 'Nairobi'}, Kenya`,
      county: newListingData.county || "Nairobi",
      town: newListingData.town || "CBD",
      images: newListingData.images.length > 0 ? newListingData.images : [
        "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=800"
      ],
      status: "Active",
      featured: false,
      views: 1,
      createdAt: new Date().toISOString().split('T')[0],
      specs: newListingData.specs || {}
    };

    setListings(prev => [listing, ...prev]);
    addToast("Listing published successfully!", "success");
    logAdminAction("CREATE_LISTING", "Listing", listing.id, `Created listing "${listing.title}"`);
    return true;
  };

  // UPDATE LISTING ACTION
  const updateListing = (id, updatedFields) => {
    setListings(prev => prev.map(l => l.id === id ? { ...l, ...updatedFields } : l));
    addToast("Listing updated successfully.", "success");
  };

  // DELETE LISTING ACTION
  const deleteListing = (id) => {
    setListings(prev => prev.filter(l => l.id !== id));
    setFavorites(prev => prev.filter(favId => favId !== id));
    addToast("Listing removed.", "info");
    logAdminAction("DELETE_LISTING", "Listing", id, `Listing ${id} deleted.`);
  };

  // MESSAGING ACTIONS
  const sendMessage = (receiverId, listingId, listingTitle, text) => {
    if (!currentUser) {
      addToast("Please login to message sellers.", "warning");
      return false;
    }
    const newMsg = {
      id: `msg-${Date.now()}`,
      senderId: currentUser.id,
      receiverId,
      listingId,
      listingTitle,
      message: text,
      timestamp: new Date().toISOString(),
      read: false
    };
    setMessages(prev => [...prev, newMsg]);
    addToast("Message sent to seller!", "success");
    return true;
  };

  // REPORT ACTION
  const reportListing = (listingId, reason, description) => {
    if (!currentUser) return;
    const targetListing = listings.find(l => l.id === listingId);
    const newReport = {
      id: `rep-${Date.now()}`,
      reporterId: currentUser.id,
      reporterName: currentUser.fullName,
      reportedUserId: targetListing?.userId || "unknown",
      reportedUserName: targetListing?.sellerName || "Seller",
      listingId,
      listingTitle: targetListing?.title || "Listing",
      reason,
      description,
      status: "Pending",
      createdAt: new Date().toISOString().split('T')[0]
    };
    setReports(prev => [newReport, ...prev]);
    addToast("Report submitted to Agro Kenya moderation team.", "success");
  };

  // ADMIN LOG ACTION
  const logAdminAction = (action, targetType, targetId, details) => {
    const newLog = {
      id: `log-${Date.now()}`,
      adminId: currentUser?.id || "admin-1",
      action,
      targetType,
      targetId,
      details,
      createdAt: new Date().toISOString()
    };
    setAdminLogs(prev => [newLog, ...prev]);
  };

  // MODERATION ACTIONS FOR ADMIN
  const verifyMember = (userId) => {
    setUsers(prev => prev.map(u => u.id === userId ? { ...u, verified: !u.verified } : u));
    logAdminAction("TOGGLE_VERIFY", "User", userId, `Toggled verification status for user ${userId}`);
    addToast("Updated user verification status.", "success");
  };

  const suspendMember = (userId) => {
    setUsers(prev => prev.map(u => u.id === userId ? {
      ...u,
      status: u.status === 'Suspended' ? 'Active' : 'Suspended'
    } : u));
    logAdminAction("SUSPEND_MEMBER", "User", userId, `Toggled suspension status for user ${userId}`);
    addToast("Member status updated.", "info");
  };

  const deleteMember = (userId) => {
    // Soft deletion / removal
    setUsers(prev => prev.filter(u => u.id !== userId));
    setListings(prev => prev.filter(l => l.userId !== userId));
    logAdminAction("DELETE_MEMBER", "User", userId, `Permanently removed member ${userId} and their listings`);
    addToast("Member removed from system.", "warning");
  };

  const updateListingStatus = (listingId, newStatus) => {
    setListings(prev => prev.map(l => l.id === listingId ? { ...l, status: newStatus } : l));
    logAdminAction("UPDATE_LISTING_STATUS", "Listing", listingId, `Changed listing status to ${newStatus}`);
    addToast(`Listing status updated to ${newStatus}.`, "info");
  };

  const toggleFeaturedListing = (listingId) => {
    setListings(prev => prev.map(l => l.id === listingId ? { ...l, featured: !l.featured } : l));
    addToast("Featured listing status updated.", "success");
  };

  // FILTERED LISTINGS COMPUTATION
  const filteredListings = listings.filter(item => {
    if (item.status === 'Suspended') return false;

    // Category filter
    if (selectedCategory !== 'All' && item.category !== selectedCategory) {
      return false;
    }

    // County filter
    if (selectedCounty !== 'All' && item.county !== selectedCounty) {
      return false;
    }

    // Type filter
    if (selectedType !== 'All' && item.listingType !== selectedType) {
      return false;
    }

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = item.title.toLowerCase().includes(q);
      const matchDesc = item.description.toLowerCase().includes(q);
      const matchLocation = item.location.toLowerCase().includes(q);
      const matchSeller = item.sellerName.toLowerCase().includes(q);
      const matchCat = item.category.toLowerCase().includes(q);
      if (!matchTitle && !matchDesc && !matchLocation && !matchSeller && !matchCat) {
        return false;
      }
    }

    return true;
  }).sort((a, b) => {
    if (sortBy === 'Price: Low to High') return a.price - b.price;
    if (sortBy === 'Price: High to Low') return b.price - a.price;
    if (sortBy === 'Most Relevant') return b.views - a.views;
    return new Date(b.createdAt) - new Date(a.createdAt); // Newest
  });

  return (
    <DataContext.Provider value={{
      listings,
      filteredListings,
      favorites,
      toggleFavorite,
      messages,
      sendMessage,
      reports,
      reportListing,
      reviews,
      adminLogs,
      searchQuery,
      setSearchQuery,
      selectedCategory,
      setSelectedCategory,
      selectedCounty,
      setSelectedCounty,
      selectedType,
      setSelectedType,
      sortBy,
      setSortBy,
      addListing,
      updateListing,
      deleteListing,
      verifyMember,
      suspendMember,
      deleteMember,
      updateListingStatus,
      toggleFeaturedListing,
      activeListingModal,
      setActiveListingModal,
      activeMemberModal,
      setActiveMemberModal,
      isAddListingOpen,
      setIsAddListingOpen,
      activeChatListing,
      setActiveChatListing
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
