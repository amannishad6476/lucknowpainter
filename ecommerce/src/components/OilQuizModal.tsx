import React, { useState } from 'react';
import { X, Sparkles, ArrowRight, ArrowLeft, Check, RefreshCw } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { PRODUCTS } from '../data/products';
import { Product } from '../types';

export const OilQuizModal: React.FC = () => {
  const { isQuizOpen, setIsQuizOpen, addToCart } = useCart();
  const [step, setStep] = useState(1);
  
  const [goal, setGoal] = useState<'sleep' | 'glow' | 'focus' | 'gourmet' | null>(null);
  const [scent, setScent] = useState<'floral' | 'earthy' | 'citrus' | 'rich' | null>(null);
  const [usage, setUsage] = useState<'diffuser' | 'topical' | 'culinary' | null>(null);

  if (!isQuizOpen) return null;

  const resetQuiz = () => {
    setStep(1);
    setGoal(null);
    setScent(null);
    setUsage(null);
  };

  // Recommendation engine logic
  const getRecommendation = (): Product => {
    if (usage === 'culinary' || goal === 'gourmet') return PRODUCTS.find((p) => p.id === 'golden-estate-olive-nectar') || PRODUCTS[1];
    if (goal === 'sleep') return PRODUCTS.find((p) => p.id === 'lavender-french-elixir') || PRODUCTS[0];
    if (goal === 'glow' || usage === 'topical') return PRODUCTS.find((p) => p.id === 'radiance-rosehip-facial-serum') || PRODUCTS[2];
    if (goal === 'focus' || usage === 'diffuser') return PRODUCTS.find((p) => p.id === 'eucalyptus-clarity-oil') || PRODUCTS[3];
    return PRODUCTS[0];
  };


  const matchedProduct = getRecommendation();

  return (
    <div className="modal-backdrop">
      <div className="relative w-full max-w-xl glass-card rounded-3xl p-6 sm:p-8 border border-amber-500/30 text-white shadow-2xl">
        
        {/* Close Button */}
        <button
          onClick={() => { setIsQuizOpen(false); resetQuiz(); }}
          className="absolute top-4 right-4 p-2.5 rounded-full bg-zinc-900/80 text-zinc-400 hover:text-white border border-zinc-800"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Quiz Step Header */}
        <div className="text-center space-y-2 mb-6">
          <div className="inline-flex items-center gap-1.5 badge-gold text-[10px]">
            <Sparkles className="w-3 h-3 text-amber-400" />
            <span>Botanical Alchemy Quiz • Step {step} of 4</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white">
            {step === 1 && 'What is your primary ritual goal?'}
            {step === 2 && 'Which aroma note calls to you?'}
            {step === 3 && 'How do you plan to use your botanical oil?'}
            {step === 4 && 'Your Botanical Match is Ready'}
          </h2>
        </div>

        {/* Step 1: Goal */}
        {step === 1 && (
          <div className="grid grid-cols-2 gap-3">
            {[
              { key: 'sleep', title: 'Restful REM Sleep & Calm', desc: 'Soothe nerves & promote night tranquility' },
              { key: 'glow', title: 'Cellular Skin Glow', desc: 'Hydrate, fade spots & restore elasticity' },
              { key: 'focus', title: 'Mental Clarity & Focus', desc: 'Clear respiratory pathways & brain fog' },
              { key: 'gourmet', title: 'Artisanal Culinary Finishing', desc: 'High-polyphenol single-estate olive nectar' }
            ].map((opt) => (
              <button
                key={opt.key}
                onClick={() => { setGoal(opt.key as any); setStep(2); }}
                className={`p-4 rounded-2xl border text-left transition-all ${
                  goal === opt.key
                    ? 'bg-amber-400/20 border-amber-400 text-white'
                    : 'bg-zinc-900/60 border-zinc-800 hover:border-amber-500/40 text-zinc-300'
                }`}
              >
                <span className="font-serif font-bold text-sm text-amber-300 block mb-1">
                  {opt.title}
                </span>
                <span className="text-xs text-zinc-400 block">{opt.desc}</span>
              </button>
            ))}
          </div>
        )}

        {/* Step 2: Scent Preference */}
        {step === 2 && (
          <div className="grid grid-cols-2 gap-3">
            {[
              { key: 'floral', title: 'Sweet Wild Floral', desc: 'Lavender, violet blossom & honeyed petals' },
              { key: 'earthy', title: 'Earthy Resins & Sage', desc: 'Pine needle, herbal rosemary & moss' },
              { key: 'citrus', title: 'Crisp Camphor & Mint', desc: 'Invigorating Tasmanian eucalyptus & citrus' },
              { key: 'rich', title: 'Peppery Green Grass', desc: 'Fresh-cut olive wheatgrass & warm nut' }
            ].map((opt) => (
              <button
                key={opt.key}
                onClick={() => { setScent(opt.key as any); setStep(3); }}
                className={`p-4 rounded-2xl border text-left transition-all ${
                  scent === opt.key
                    ? 'bg-amber-400/20 border-amber-400 text-white'
                    : 'bg-zinc-900/60 border-zinc-800 hover:border-amber-500/40 text-zinc-300'
                }`}
              >
                <span className="font-serif font-bold text-sm text-amber-300 block mb-1">
                  {opt.title}
                </span>
                <span className="text-xs text-zinc-400 block">{opt.desc}</span>
              </button>
            ))}
          </div>
        )}

        {/* Step 3: Usage Method */}
        {step === 3 && (
          <div className="space-y-3">
            {[
              { key: 'topical', title: 'Direct Facial & Body Massage', desc: 'Absorbed into moisture barriers & scalp' },
              { key: 'diffuser', title: 'Ultrasonic Room Diffuser', desc: 'Aromatherapy scent diffusion for living spaces' },
              { key: 'culinary', title: 'Gourmet Raw Drizzle', desc: 'Finishing oil for fine salads, bread & cheeses' }
            ].map((opt) => (
              <button
                key={opt.key}
                onClick={() => { setUsage(opt.key as any); setStep(4); }}
                className="w-full p-4 rounded-2xl border bg-zinc-900/60 border-zinc-800 hover:border-amber-500/40 text-left transition-all flex items-center justify-between"
              >
                <div>
                  <span className="font-serif font-bold text-sm text-amber-300 block">
                    {opt.title}
                  </span>
                  <span className="text-xs text-zinc-400">{opt.desc}</span>
                </div>
                <ArrowRight className="w-4 h-4 text-amber-400" />
              </button>
            ))}
          </div>
        )}

        {/* Step 4: Result Recommendation */}
        {step === 4 && matchedProduct && (
          <div className="space-y-6">
            <div className="bg-zinc-950/80 border border-amber-500/40 rounded-2xl p-5 flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
              <img
                src={matchedProduct.image}
                alt={matchedProduct.name}
                className="w-24 h-24 object-cover rounded-xl border border-zinc-800 shrink-0"
              />
              <div className="space-y-1">
                <span className="bg-emerald-950 text-emerald-300 border border-emerald-500/30 text-[10px] uppercase font-bold px-2 py-0.5 rounded-full">
                  99% Match Score
                </span>
                <h3 className="font-serif font-bold text-xl text-white">
                  {matchedProduct.name}
                </h3>
                <p className="text-xs text-zinc-400">
                  {matchedProduct.tagline}
                </p>
                <div className="text-amber-400 font-bold font-serif text-lg pt-1">
                  ${matchedProduct.volumes[0].price.toFixed(2)} ({matchedProduct.volumes[0].size})
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  addToCart(matchedProduct, matchedProduct.volumes[0], 1);
                  setIsQuizOpen(false);
                  resetQuiz();
                }}
                className="btn-gold flex-1 py-3 text-xs uppercase tracking-wider justify-center"
              >
                <Check className="w-4 h-4" /> Add Recommended Oil to Cart
              </button>
              <button
                onClick={resetQuiz}
                className="btn-outline p-3"
                title="Retake Quiz"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Quiz Back Navigation */}
        {step > 1 && step < 4 && (
          <div className="mt-6 pt-4 border-t border-zinc-800 flex justify-between">
            <button
              onClick={() => setStep(step - 1)}
              className="text-xs text-zinc-400 hover:text-white flex items-center gap-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
