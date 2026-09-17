import React, { useState } from 'react';
import { Droplets, Send, Instagram, Twitter, Facebook, Sparkles, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const Footer: React.FC = () => {
  const { setSelectedCategory } = useCart();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setEmail('');
  };

  return (
    <footer className="bg-zinc-950 text-zinc-400 pt-16 pb-12 border-t border-amber-500/20">
      <div className="container mx-auto px-4 lg:px-8 space-y-12">
        
        {/* Top Newsletter & Brand Card */}
        <div className="glass-card rounded-3xl p-8 lg:p-12 border border-amber-500/30 flex flex-col lg:flex-row items-center justify-between gap-8 bg-gradient-to-r from-emerald-950/60 via-zinc-900/90 to-amber-950/40">
          <div className="space-y-2 max-w-xl text-center lg:text-left">
            <span className="badge-gold flex items-center gap-1.5 inline-flex">
              <Sparkles className="w-3.5 h-3.5" /> Join The Apothecary Society
            </span>
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white">
              Receive 15% Off Your First Botanical Elixir
            </h3>
            <p className="text-xs sm:text-sm text-zinc-300 font-light">
              Subscribe for private micro-batch release notifications, artisanal harvest stories, and custom aromatherapy blend guides.
            </p>
          </div>

          <form onSubmit={handleSubscribe} className="w-full lg:w-auto flex-1 max-w-md">
            {subscribed ? (
              <div className="bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 p-4 rounded-2xl flex items-center gap-3 text-xs font-semibold">
                <Check className="w-5 h-5 text-amber-400 shrink-0" />
                <span>Welcome! Check your inbox for your 15% discount voucher code (AURA15).</span>
              </div>
            ) : (
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Enter your email address..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-zinc-900/90 border border-zinc-700 focus:border-amber-400 text-white rounded-full px-4 py-3 text-xs flex-1 outline-none"
                  required
                />
                <button type="submit" className="btn-gold py-3 px-6 text-xs uppercase tracking-wider shrink-0">
                  <Send className="w-3.5 h-3.5" /> Join
                </button>
              </div>
            )}
          </form>
        </div>

        {/* Multi-Column Links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 pt-6">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-emerald-950 border border-amber-500/30 flex items-center justify-center">
                <Droplets className="w-4 h-4 text-amber-400" />
              </div>
              <span className="font-serif text-xl font-bold text-white tracking-wider uppercase">
                AURA BOTANICALS
              </span>
            </div>
            <p className="text-xs text-zinc-400 font-light leading-relaxed max-w-sm">
              Handcrafted in small micro-batches. Our single-origin essential oils, facial serums, and reserve cold-pressed olive elixirs embody the timeless purity of living nature.
            </p>
            <div className="flex items-center gap-3 text-zinc-400 pt-2">
              <a href="#" className="p-2 rounded-full bg-zinc-900 hover:text-amber-400 hover:bg-zinc-800 transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-full bg-zinc-900 hover:text-amber-400 hover:bg-zinc-800 transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-full bg-zinc-900 hover:text-amber-400 hover:bg-zinc-800 transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Categories */}
          <div className="space-y-3">
            <h4 className="font-serif font-bold text-sm text-white uppercase tracking-wider">Collections</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => setSelectedCategory('essential')} className="hover:text-amber-400 transition-colors">
                  Essential Oils
                </button>
              </li>
              <li>
                <button onClick={() => setSelectedCategory('skincare')} className="hover:text-amber-400 transition-colors">
                  Skincare Serums
                </button>
              </li>
              <li>
                <button onClick={() => setSelectedCategory('culinary')} className="hover:text-amber-400 transition-colors">
                  Culinary Olive Reserve
                </button>
              </li>
              <li>
                <button onClick={() => setSelectedCategory('aromatherapy')} className="hover:text-amber-400 transition-colors">
                  Aromatherapy & Focus
                </button>
              </li>
            </ul>
          </div>

          {/* Sourcing & Science */}
          <div className="space-y-3">
            <h4 className="font-serif font-bold text-sm text-white uppercase tracking-wider">Apothecary</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#" className="hover:text-amber-400 transition-colors">Provencal Lavender</a></li>
              <li><a href="#" className="hover:text-amber-400 transition-colors">Patagonian Rosehip</a></li>
              <li><a href="#" className="hover:text-amber-400 transition-colors">Cretan Olive Estate</a></li>
              <li><a href="#" className="hover:text-amber-400 transition-colors">GC/MS Lab Certifications</a></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className="space-y-3">
            <h4 className="font-serif font-bold text-sm text-white uppercase tracking-wider">Client Care</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#" className="hover:text-amber-400 transition-colors">Track Your Order</a></li>
              <li><a href="#" className="hover:text-amber-400 transition-colors">Shipping & Returns</a></li>
              <li><a href="#" className="hover:text-amber-400 transition-colors">30-Day Guarantee</a></li>
              <li><a href="#" className="hover:text-amber-400 transition-colors">Contact Apothecary</a></li>
            </ul>
          </div>

        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 border-t border-zinc-900 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-500 gap-4">
          <p>© 2026 AURA BOTANICALS & LUXURY OILS. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-zinc-300">Privacy Policy</a>
            <a href="#" className="hover:text-zinc-300">Terms of Alchemy</a>
            <a href="#" className="hover:text-zinc-300">Sustainability Report</a>
          </div>
        </div>

      </div>
    </footer>
  );
};
