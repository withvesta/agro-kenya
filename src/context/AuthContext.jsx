import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_USERS } from '../data/seedData';
import { useToast } from './ToastContext';
import { isSupabaseConfigured, dbGetProfiles, dbInsertProfile } from '../lib/supabase';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [users, setUsers] = useState(() => {
    // Purge cached legacy mock users
    const cachedUsers = localStorage.getItem('agro_kenya_users');
    if (cachedUsers && (
      cachedUsers.includes('johnmwangi') ||
      cachedUsers.includes('Wanjiku') ||
      cachedUsers.includes('AgroTech') ||
      cachedUsers.includes('Grace Njeri') ||
      cachedUsers.includes('user-1')
    )) {
      localStorage.removeItem('agro_kenya_users');
      return [];
    }
    const saved = localStorage.getItem('agro_kenya_users');
    return saved ? JSON.parse(saved) : [];
  });

  const [currentUser, setCurrentUser] = useState(() => {
    const cachedCurr = localStorage.getItem('agro_kenya_current_user');
    if (cachedCurr && (
      cachedCurr.includes('johnmwangi') ||
      cachedCurr.includes('user-1') ||
      cachedCurr.includes('John Mwangi')
    )) {
      localStorage.removeItem('agro_kenya_current_user');
      return null;
    }
    const savedUser = localStorage.getItem('agro_kenya_current_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const { addToast } = useToast();

  // Load live registered profiles from Supabase on mount
  useEffect(() => {
    async function loadLiveProfiles() {
      if (!isSupabaseConfigured) return;
      const data = await dbGetProfiles();
      if (data && Array.isArray(data)) {
        if (data.length > 0) {
          const liveUsers = data.map(p => ({
            id: p.id,
            fullName: p.full_name,
            businessName: p.business_name || `${p.full_name}'s Enterprise`,
            email: p.email,
            phone: p.phone || '',
            whatsapp: p.whatsapp || '',
            county: p.county || 'Nairobi',
            town: p.town || 'CBD',
            accountType: p.account_type || 'Farmer',
            profileImage: p.avatar_url || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=300',
            verified: p.verified || false,
            status: p.account_status || 'Active',
            rating: 5.0,
            reviewCount: 0,
            about: p.bio || `Registered ${p.account_type || 'member'} on Agro Kenya.`,
            joinedDate: p.created_at ? p.created_at.split('T')[0] : new Date().toISOString().split('T')[0]
          }));
          setUsers(liveUsers);
        } else {
          setUsers(prev => prev.filter(u => !u.email?.includes('mwangi') && !u.id?.startsWith('user-1') && !u.fullName?.includes('Wanjiku')));
        }
      }
    }
    loadLiveProfiles();
  }, []);

  useEffect(() => {
    localStorage.setItem('agro_kenya_users', JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('agro_kenya_current_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('agro_kenya_current_user');
    }
  }, [currentUser]);

  // Login handler with strict authentication
  const login = (emailOrPhone, password) => {
    const term = emailOrPhone.trim().toLowerCase();

    // Check for Manager Admin credentials
    if (term === 'onlyvee222@gmail.com' || term === 'manager@agrokenya.co.ke') {
      if (password === 'AgroKenya360' || password === 'Agro360') {
        const managerUser = {
          id: "admin-1",
          fullName: "Manager Admin",
          businessName: "Agro Kenya Moderation Team",
          email: "onlyvee222@gmail.com",
          phone: "+254 700 123 456",
          whatsapp: "+254700123456",
          county: "Nairobi",
          town: "CBD",
          accountType: "Manager",
          profileImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300",
          verified: true,
          status: "Active",
          rating: 5.0,
          reviewCount: 50,
          about: "Official platform administrator overseeing marketplace integrity, verification, and member safety.",
          joinedDate: "2023-01-01"
        };
        setCurrentUser(managerUser);
        addToast(`Welcome back, ${managerUser.fullName}!`, 'success');
        return { success: true, user: managerUser };
      } else {
        addToast("Invalid manager credentials.", "error");
        return { success: false, message: "Invalid manager credentials." };
      }
    }

    const found = users.find(u =>
      u.email.toLowerCase() === term || u.phone.includes(term)
    );

    if (found) {
      if (found.status === 'Suspended') {
        addToast("Your account has been suspended by Agro Kenya admin. Contact support.", "error");
        return { success: false, message: "Account suspended." };
      }

      const isPasswordValid = found.password ? found.password === password : password === 'password123';
      if (!isPasswordValid) {
        addToast("Incorrect password. Please try again.", "error");
        return { success: false, message: "Incorrect password." };
      }

      setCurrentUser(found);
      addToast(`Welcome back, ${found.fullName}!`, 'success');
      return { success: true, user: found };
    } else {
      addToast("Invalid email/phone or password. Please try again.", "error");
      return { success: false, message: "Invalid email/phone or password." };
    }
  };

  // Register handler
  const register = (userData) => {
    const existing = users.find(u => u.email.toLowerCase() === userData.email.toLowerCase());
    if (existing) {
      addToast("An account with this email already exists!", "error");
      return { success: false };
    }

    const newUser = {
      id: `user-${Date.now()}`,
      fullName: userData.fullName,
      businessName: userData.businessName || `${userData.fullName}'s Enterprise`,
      email: userData.email,
      password: userData.password || "password123",
      phone: userData.phone || "+254 700 000 000",
      whatsapp: userData.phone ? userData.phone.replace(/[^0-9]/g, '') : "254700000000",
      county: userData.county || "Nakuru",
      town: userData.town || "CBD",
      accountType: userData.accountType || "Farmer",
      profileImage: userData.profileImage || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=300",
      verified: false,
      status: "Active",
      rating: 5.0,
      reviewCount: 0,
      about: `New ${userData.accountType} member on Agro Kenya.`,
      joinedDate: new Date().toISOString().split('T')[0]
    };

    setUsers(prev => [newUser, ...prev]);
    setCurrentUser(newUser);

    // Capture forthcoming client in Supabase
    if (isSupabaseConfigured) {
      dbInsertProfile({
        full_name: newUser.fullName,
        business_name: newUser.businessName,
        email: newUser.email,
        phone: newUser.phone,
        whatsapp: newUser.whatsapp,
        county: newUser.county,
        town: newUser.town,
        account_type: newUser.accountType,
        avatar_url: newUser.profileImage,
        bio: newUser.about
      });
    }

    addToast("Account created successfully! Welcome to Agro Kenya.", "success");
    return { success: true, user: newUser };
  };

  // Logout handler
  const logout = () => {
    setCurrentUser(null);
    addToast("Logged out successfully.", "info");
  };

  // Update profile
  const updateProfile = (updatedFields) => {
    if (!currentUser) return;
    const updated = { ...currentUser, ...updatedFields };
    setCurrentUser(updated);
    setUsers(prev => prev.map(u => u.id === currentUser.id ? updated : u));
    addToast("Profile updated successfully.", "success");
  };

  const isAdmin = currentUser?.accountType === 'Manager';

  return (
    <AuthContext.Provider value={{
      currentUser,
      users,
      setUsers,
      login,
      register,
      logout,
      updateProfile,
      isAdmin
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
