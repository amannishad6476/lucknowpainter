import React, { useState } from 'react';
import { ShoppingBag, Heart, Search, Sparkles, Droplets, Menu, X, User as UserIcon } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { ProductCategory } from '../types';

export const Navbar: React.FC = () => {
  const {
    cart,
    wishlist,
    setIsCartOpen,
    setIsWishlistOpen,
    setIsQuizOpen,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory
  } = useCart();

  const { user, openAuthModal, openAccountDrawer } = useAuth();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  const totalCartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const wishlistCount = wishlist.length;

  const categories: { label: string; value: ProductCategory | 'all' }[] = [
    { label: 'All Botanicals', value: 'all' },
    { label: 'Essential Oils', value: 'essential' },
    { label: 'Skincare Serums', value: 'skincare' },
    { label: 'Culinary Reserve', value: 'culinary' },
    { label: 'Aromatherapy', value: 'aromatherapy' }
  ];

  return (
    <header className="sticky top-0 z-50 glass-nav transition-all duration-300">
      <div className="container mx-auto px-4 lg:px-8 py-3.5 flex items-center justify-between">
        
        {/* Brand Emblem & Logo */}
        <div 
          onClick={() => { setSelectedCategory('all'); setSearchQuery(''); }}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-full bg-emerald-950/80 border border-amber-500/30 flex items-center justify-center shadow-lg group-hover:border-amber-400 group-hover:shadow-[0_0_15px_rgba(229,193,88,0.3)] transition-all">
            <Droplets className="w-5 h-5 text-amber-400 animate-pulse" />
          </div>
          <div>
            <span className="font-serif text-xl lg:text-2xl font-bold tracking-widest text-amber-400 uppercase">
              AURA
            </span>
            <span className="block text-[10px] tracking-[0.25em] text-emerald-300 uppercase font-medium">
              Botanicals & Oils
            </span>
          </div>
        </div>

        {/* Desktop Category Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setSelectedCategory(cat.value)}
              className={`text-sm font-medium tracking-wider uppercase transition-all pb-1 ${
                selectedCategory === cat.value
                  ? 'text-amber-400 border-b-2 border-amber-400'
                  : 'text-zinc-400 hover:text-zinc-100'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-2 sm:gap-3 lg:gap-4">

          {/* Search Toggle */}
          <div className="relative">
            {showSearch ? (
              <div className="flex items-center bg-zinc-900/90 border border-amber-500/30 rounded-full px-3 py-1.5 text-xs text-white w-44 lg:w-64">
                <Search className="w-4 h-4 text-amber-400 mr-2 shrink-0" />
                <input
                  type="text"
                  placeholder="Search botanical oils..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-transparent border-none focus:outline-none text-white text-xs w-full p-0"
                  autoFocus
                />
                <button 
                  onClick={() => { setShowSearch(false); setSearchQuery(''); }}
                  className="text-zinc-500 hover:text-zinc-300 ml-1"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowSearch(true)}
                className="p-2 rounded-full text-zinc-400 hover:text-amber-400 hover:bg-emerald-950/40 transition-all"
                title="Search Products"
              >
                <Search className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Oil Selection Quiz Trigger */}
          <button
            onClick={() => setIsQuizOpen(true)}
            className="hidden lg:flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-amber-400 bg-amber-400/10 border border-amber-400/30 hover:bg-amber-400/20 px-3.5 py-2 rounded-full transition-all"
          >
            <Sparkles className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '6s' }} />
            <span>Oil Finder Quiz</span>
          </button>

          {/* User Account / Auth Button */}
          {user ? (
            <button
              onClick={openAccountDrawer}
              className="flex items-center gap-2 p-1.5 pl-2 pr-3 rounded-full bg-emerald-950/60 border border-amber-400/40 hover:border-amber-400 text-amber-300 transition-all group"
              title="View Sanctuary Account"
            >
              {user.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-6 h-6 rounded-full object-cover border border-amber-400"
                />
              ) : (
                <div className="w-6 h-6 rounded-full bg-amber-400/20 text-amber-400 flex items-center justify-center font-bold text-xs">
                  {user.name.charAt(0)}
                </div>
              )}
              <span className="text-xs font-semibold max-w-[80px] sm:max-w-[110px] truncate">
                {user.name.split(' ')[0]}
              </span>
            </button>
          ) : (
            <button
              onClick={() => openAuthModal('login')}
              className="flex items-center gap-1.5 p-2 sm:px-3 sm:py-2 rounded-full text-zinc-300 hover:text-amber-400 hover:bg-emerald-950/40 transition-all border border-transparent hover:border-amber-400/30"
              title="Sign In / Register"
            >
              <UserIcon className="w-5 h-5 text-amber-400" />
              <span className="text-xs font-semibold hidden sm:inline">Sign In</span>
            </button>
          )}

          {/* Wishlist Button */}
          <button
            onClick={() => setIsWishlistOpen(true)}
            className="relative p-2 rounded-full text-zinc-400 hover:text-amber-400 hover:bg-emerald-950/40 transition-all"
            title="Wishlist"
          >
            <Heart className="w-5 h-5" />
            {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center border border-zinc-950">
                {wishlistCount}
              </span>
            )}
          </button>

          {/* Cart Trigger */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative flex items-center gap-2 bg-gradient-to-r from-amber-500/20 to-emerald-900/40 border border-amber-500/40 hover:border-amber-400 text-amber-300 hover:text-white px-3.5 py-2 rounded-full transition-all"
          >
            <ShoppingBag className="w-4 h-4 text-amber-400" />
            <span className="text-xs font-semibold hidden sm:inline">Cart</span>
            <span className="bg-amber-400 text-emerald-950 text-[11px] font-bold px-1.5 py-0.5 rounded-full">
              {totalCartCount}
            </span>
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-zinc-400 hover:text-white"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-zinc-950/95 border-b border-amber-500/20 px-6 py-4 space-y-3">
          {user ? (
            <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-amber-400/20 border border-amber-400 flex items-center justify-center text-amber-400 font-bold text-xs">
                  {user.name.charAt(0)}
                </div>
                <div>
                  <div className="text-xs font-bold text-white">{user.name}</div>
                  <div className="text-[10px] text-amber-400">{user.tier}</div>
                </div>
              </div>
              <button
                onClick={() => { openAccountDrawer(); setIsMobileMenuOpen(false); }}
                className="text-xs text-amber-400 underline font-medium"
              >
                Account
              </button>
            </div>
          ) : (
            <button
              onClick={() => { openAuthModal('login'); setIsMobileMenuOpen(false); }}
              className="w-full flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400 bg-amber-400/20 border border-amber-400/40 py-2.5 rounded-full mb-2"
            >
              <UserIcon className="w-4 h-4" />
              <span>Sign In / Create Account</span>
            </button>
          )}

          <div className="flex items-center gap-2 mb-2">
            <button
              onClick={() => { setIsQuizOpen(true); setIsMobileMenuOpen(false); }}
              className="w-full flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400 bg-amber-400/10 border border-amber-400/30 py-2.5 rounded-full"
            >
              <Sparkles className="w-4 h-4" />
              <span>Take Personal Oil Quiz</span>
            </button>
          </div>
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => {
                setSelectedCategory(cat.value);
                setIsMobileMenuOpen(false);
              }}
              className={`block w-full text-left py-2 text-sm font-medium tracking-wide ${
                selectedCategory === cat.value ? 'text-amber-400 font-bold' : 'text-zinc-300'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
};

