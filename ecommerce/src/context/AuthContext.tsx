import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, AuthMode } from '../types';

export const DEMO_USERS: User[] = [
  {
    id: 'usr_vip_01',
    name: 'Aria Sterling',
    email: 'aria.sterling@apothecary.com',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
    tier: 'Aura VIP Gold',
    memberSince: 'March 2023',
    loyaltyPoints: 1450,
    defaultAddress: '742 Evergreen Terrace, San Francisco, CA 94102',
    orders: [
      {
        id: 'AURA-894210',
        date: '2026-07-15',
        total: 184.50,
        status: 'Delivered',
        itemsCount: 3
      },
      {
        id: 'AURA-651293',
        date: '2026-06-02',
        total: 120.00,
        status: 'Delivered',
        itemsCount: 2
      }
    ]
  },
  {
    id: 'usr_member_02',
    name: 'Julian Vance',
    email: 'julian.vance@botanicals.com',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=250',
    tier: 'Botanical Enthusiast',
    memberSince: 'January 2024',
    loyaltyPoints: 480,
    defaultAddress: '120 Ocean View Blvd, Monterey, CA 93940',
    orders: [
      {
        id: 'AURA-310492',
        date: '2026-05-18',
        total: 68.00,
        status: 'Delivered',
        itemsCount: 1
      }
    ]
  }
];

interface AuthContextType {
  user: User | null;
  isAuthModalOpen: boolean;
  authMode: AuthMode;
  isAccountDrawerOpen: boolean;
  
  openAuthModal: (mode?: AuthMode) => void;
  closeAuthModal: () => void;
  setAuthMode: (mode: AuthMode) => void;
  
  openAccountDrawer: () => void;
  closeAccountDrawer: () => void;

  login: (email: string, pass: string) => Promise<{ success: boolean; message: string }>;
  signup: (name: string, email: string, pass: string) => Promise<{ success: boolean; message: string }>;
  logout: () => void;
  quickLoginDemo: (userIndex?: number) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('aura_user');
    return saved ? JSON.parse(saved) : DEMO_USERS[0]; // Default logged in as VIP user for seamless experience
  });

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<AuthMode>('login');
  const [isAccountDrawerOpen, setIsAccountDrawerOpen] = useState(false);

  useEffect(() => {
    if (user) {
      localStorage.setItem('aura_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('aura_user');
    }
  }, [user]);

  const openAuthModal = (mode: AuthMode = 'login') => {
    setAuthMode(mode);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  const openAccountDrawer = () => {
    setIsAccountDrawerOpen(true);
  };

  const closeAccountDrawer = () => {
    setIsAccountDrawerOpen(false);
  };

  const login = async (email: string): Promise<{ success: boolean; message: string }> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 600));

    const foundUser = DEMO_USERS.find(
      (u) => u.email.toLowerCase() === email.trim().toLowerCase()
    );

    if (foundUser) {
      setUser(foundUser);
      setIsAuthModalOpen(false);
      return { success: true, message: `Welcome back, ${foundUser.name}!` };
    }

    // Dynamic user creation if not found in demo users
    const newUser: User = {
      id: `usr_${Date.now().toString(36)}`,
      name: email.split('@')[0].replace('.', ' ').toUpperCase(),
      email: email.trim(),
      tier: 'Botanical Enthusiast',
      memberSince: 'July 2026',
      loyaltyPoints: 100,
      orders: []
    };

    setUser(newUser);
    setIsAuthModalOpen(false);
    return { success: true, message: `Logged in as ${newUser.name}!` };
  };

  const signup = async (name: string, email: string): Promise<{ success: boolean; message: string }> => {
    await new Promise((resolve) => setTimeout(resolve, 600));

    const newUser: User = {
      id: `usr_${Date.now().toString(36)}`,
      name: name.trim(),
      email: email.trim(),
      tier: 'Botanical Enthusiast',
      memberSince: 'July 2026',
      loyaltyPoints: 200, // 200 bonus signup points
      orders: []
    };

    setUser(newUser);
    setIsAuthModalOpen(false);
    return { success: true, message: `Welcome to AURA, ${newUser.name}! 200 bonus points added.` };
  };

  const logout = () => {
    setUser(null);
    setIsAccountDrawerOpen(false);
  };

  const quickLoginDemo = (userIndex: number = 0) => {
    const demo = DEMO_USERS[userIndex] || DEMO_USERS[0];
    setUser(demo);
    setIsAuthModalOpen(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthModalOpen,
        authMode,
        isAccountDrawerOpen,
        openAuthModal,
        closeAuthModal,
        setAuthMode,
        openAccountDrawer,
        closeAccountDrawer,
        login,
        signup,
        logout,
        quickLoginDemo
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
