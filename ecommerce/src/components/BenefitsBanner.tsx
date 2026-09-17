import React from 'react';
import { Leaf, Award, ShieldCheck, Truck } from 'lucide-react';


export const BenefitsBanner: React.FC = () => {
  const pillars = [
    {
      icon: Leaf,
      title: '100% Certified Organic',
      desc: 'Wild harvested blossoms & single-estate cold-pressed extraction with zero synthetic additives.'
    },
    {
      icon: Award,
      title: 'High Polyphenol Yield',
      desc: 'Tested for cellular density, bio-active antioxidants, and rich aromatic scent profiles.'
    },
    {
      icon: Truck,
      title: 'Complimentary Express',
      desc: 'Free temperature-controlled climate shipping on all orders over $75.'
    },
    {
      icon: ShieldCheck,
      title: '30-Day Elixir Guarantee',
      desc: 'Experience pure botanical transformation or receive a 100% hassle-free refund.'
    }
  ];

  return (
    <section className="py-16 bg-zinc-950 border-y border-amber-500/10">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="glass-card p-6 rounded-2xl border border-zinc-800 space-y-3 hover:border-amber-500/30 transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-amber-400/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-serif font-bold text-lg text-white">
                  {pillar.title}
                </h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  {pillar.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
