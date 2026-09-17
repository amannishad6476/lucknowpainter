import React from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Leaf, Flame } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const Hero: React.FC = () => {
  const { setIsQuizOpen } = useCart();

  const scrollToGrid = () => {
    const el = document.getElementById('catalog-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28 border-b border-amber-500/10">
      
      {/* Background ambient lighting effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-emerald-900/20 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute top-10 right-10 w-96 h-96 bg-amber-500/10 blur-[160px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column Text & CTA */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 bg-emerald-950/80 border border-amber-500/30 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider text-amber-300 shadow-md">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>100% Pure Organic Cold-Pressed Elixirs</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-white tracking-tight leading-[1.15]">
              Pure Botanical <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-600">Essence</span>. Unrivaled Alchemy.
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-emerald-100/80 max-w-2xl mx-auto lg:mx-0 font-light leading-relaxed">
              Crafted from wild-harvested French lavender, Patagonian rosehip, and Greek single-estate olives. Unfiltered, potent, and ethically extracted for deep cellular revitalization and culinary perfection.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={scrollToGrid}
                className="btn-gold"
              >
                <span>Shop Botanical Oils</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => setIsQuizOpen(true)}
                className="btn-outline"
              >
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Personal Oil Quiz</span>
              </button>
            </div>

            {/* Key Trust Pillars */}
            <div className="pt-8 border-t border-zinc-800/80 grid grid-cols-3 gap-4 max-w-lg mx-auto lg:mx-0">
              <div className="flex flex-col items-center lg:items-start space-y-1">
                <div className="flex items-center gap-1 text-amber-400 font-bold text-lg font-serif">
                  <Leaf className="w-4 h-4 text-emerald-400" />
                  <span>100%</span>
                </div>
                <span className="text-xs text-zinc-400">Pure Organic</span>
              </div>
              
              <div className="flex flex-col items-center lg:items-start space-y-1">
                <div className="flex items-center gap-1 text-amber-400 font-bold text-lg font-serif">
                  <ShieldCheck className="w-4 h-4 text-amber-400" />
                  <span>4.9 ★</span>
                </div>
                <span className="text-xs text-zinc-400">Verified Reviews</span>
              </div>

              <div className="flex flex-col items-center lg:items-start space-y-1">
                <div className="flex items-center gap-1 text-amber-400 font-bold text-lg font-serif">
                  <Flame className="w-4 h-4 text-rose-400" />
                  <span>Zero</span>
                </div>
                <span className="text-xs text-zinc-400">Synthetics / Fillers</span>
              </div>
            </div>

          </div>

          {/* Right Column Showcase Visual */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md">
              
              {/* Decorative Glass Frame */}
              <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/20 to-emerald-600/20 rounded-3xl blur-2xl transform rotate-3" />
              
              <div className="relative glass-card rounded-3xl p-6 border border-amber-500/30 overflow-hidden text-center space-y-4">
                
                {/* Hero Showcase Image */}
                <div className="relative h-72 sm:h-80 rounded-2xl overflow-hidden bg-zinc-950/60 border border-zinc-800">
                  <img
                    src="/assets/lavender.png"
                    alt="French Lavender Botanical Elixir"
                    className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-3 right-3 badge-gold shadow-lg">
                    Featured Batch
                  </div>
                </div>

                {/* Info Card Overlay */}
                <div className="text-left space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-semibold text-emerald-400 uppercase tracking-widest">
                      Provence Harvest 2026
                    </span>
                    <span className="text-amber-400 font-bold text-sm font-serif">$34.00</span>
                  </div>
                  <h3 className="text-lg font-serif font-bold text-white">
                    French Lavender Botanical Elixir
                  </h3>
                  <p className="text-xs text-zinc-400 line-clamp-2">
                    Steam distilled from high-altitude wild blooms. Restores calm, aids deep REM sleep, and soothes stressed skin.
                  </p>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
