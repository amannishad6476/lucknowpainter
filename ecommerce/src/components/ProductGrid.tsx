import React, { useState, useMemo } from 'react';
import { Filter, SlidersHorizontal, Search, RotateCcw, Sparkles } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { ProductCard } from './ProductCard';
import { useCart } from '../context/CartContext';
import { ProductCategory } from '../types';

export const ProductGrid: React.FC = () => {
  const { searchQuery, setSearchQuery, selectedCategory, setSelectedCategory } = useCart();
  
  const [selectedBenefit, setSelectedBenefit] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'rating'>('featured');
  const [onlyOrganic, setOnlyOrganic] = useState(false);

  // Extract unique benefits across products
  const availableBenefits = useMemo(() => {
    const set = new Set<string>();
    PRODUCTS.forEach((p) => p.benefits.forEach((b) => set.add(b)));
    return Array.from(set);
  }, []);

  // Filter & Sort logic
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // Category filter
      if (selectedCategory !== 'all' && product.category !== selectedCategory) {
        return false;
      }
      // Benefit tag filter
      if (selectedBenefit !== 'all' && !product.benefits.includes(selectedBenefit)) {
        return false;
      }
      // Organic filter
      if (onlyOrganic && !product.isOrganic) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = product.name.toLowerCase().includes(q);
        const matchDesc = product.description.toLowerCase().includes(q);
        const matchNotes = product.scentNotes && (
          product.scentNotes.top.toLowerCase().includes(q) ||
          product.scentNotes.heart.toLowerCase().includes(q) ||
          product.scentNotes.base.toLowerCase().includes(q)
        );
        if (!matchName && !matchDesc && !matchNotes) return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') {
        return a.volumes[0].price - b.volumes[0].price;
      }
      if (sortBy === 'price-high') {
        return b.volumes[0].price - a.volumes[0].price;
      }
      if (sortBy === 'rating') {
        return b.rating - a.rating;
      }
      return 0;
    });
  }, [selectedCategory, selectedBenefit, onlyOrganic, searchQuery, sortBy]);

  const categories: { label: string; value: ProductCategory | 'all' }[] = [
    { label: 'All Collection', value: 'all' },
    { label: 'Essential Oils', value: 'essential' },
    { label: 'Skincare Serums', value: 'skincare' },
    { label: 'Culinary Reserve', value: 'culinary' },
    { label: 'Aromatherapy', value: 'aromatherapy' }
  ];

  const resetFilters = () => {
    setSelectedCategory('all');
    setSelectedBenefit('all');
    setSortBy('featured');
    setOnlyOrganic(false);
    setSearchQuery('');
  };

  return (
    <section id="catalog-section" className="py-16 bg-zinc-950/40">
      <div className="container mx-auto px-4 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <span className="badge-gold uppercase tracking-widest">Master Apothecary Catalog</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white">
            Curated Artisanal Botanicals
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 font-light">
            Every bottle is single-origin cold-pressed or steam distilled to maintain living cellular integrity.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center justify-center gap-2 sm:gap-3 flex-wrap mb-8">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setSelectedCategory(cat.value)}
              className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold tracking-wider transition-all ${
                selectedCategory === cat.value
                  ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-zinc-950 shadow-[0_0_20px_rgba(229,193,88,0.3)]'
                  : 'glass-card text-zinc-300 hover:text-white hover:border-amber-500/40'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Filter Toolbar (Benefit Tags, Organic Toggle, Sort, Count) */}
        <div className="glass-card rounded-2xl p-4 mb-8 flex flex-col md:flex-row items-center justify-between gap-4 border border-zinc-800">
          
          {/* Benefit Pills */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
            <span className="text-xs text-zinc-400 font-medium flex items-center gap-1 shrink-0">
              <Filter className="w-3.5 h-3.5 text-amber-400" /> Benefit:
            </span>
            <button
              onClick={() => setSelectedBenefit('all')}
              className={`text-xs px-3 py-1 rounded-full border transition-all shrink-0 ${
                selectedBenefit === 'all'
                  ? 'bg-emerald-950 text-emerald-300 border-emerald-500/40'
                  : 'bg-zinc-900/60 text-zinc-400 border-zinc-800 hover:text-zinc-200'
              }`}
            >
              All Benefits
            </button>
            {availableBenefits.slice(0, 5).map((benefit) => (
              <button
                key={benefit}
                onClick={() => setSelectedBenefit(benefit)}
                className={`text-xs px-3 py-1 rounded-full border transition-all shrink-0 ${
                  selectedBenefit === benefit
                    ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                    : 'bg-zinc-900/60 text-zinc-400 border-zinc-800 hover:text-zinc-200'
                }`}
              >
                {benefit}
              </button>
            ))}
          </div>

          {/* Controls: Organic Checkbox & Sort Dropdown */}
          <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
            
            {/* Organic filter toggle */}
            <label className="flex items-center gap-2 text-xs font-semibold text-zinc-300 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={onlyOrganic}
                onChange={(e) => setOnlyOrganic(e.target.checked)}
                className="w-4 h-4 rounded border-zinc-700 text-amber-400 focus:ring-amber-400/20 bg-zinc-900"
              />
              <span className="flex items-center gap-1 text-emerald-400">
                <Sparkles className="w-3 h-3" /> Organic Only
              </span>
            </label>

            {/* Sort Selector */}
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-3.5 h-3.5 text-zinc-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="text-xs bg-zinc-900 border border-zinc-800 text-zinc-200 rounded-lg px-3 py-1.5 focus:border-amber-400 outline-none"
              >
                <option value="featured">Sort: Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>

          </div>

        </div>

        {/* Result Summary Bar */}
        <div className="flex items-center justify-between text-xs text-zinc-400 mb-6 px-1">
          <span>
            Showing <strong className="text-amber-400">{filteredProducts.length}</strong> botanical elixirs
            {selectedCategory !== 'all' && ` in "${selectedCategory}"`}
            {searchQuery && ` matching "${searchQuery}"`}
          </span>

          {(selectedCategory !== 'all' || selectedBenefit !== 'all' || onlyOrganic || searchQuery) && (
            <button
              onClick={resetFilters}
              className="text-amber-400 hover:underline flex items-center gap-1 text-xs"
            >
              <RotateCcw className="w-3 h-3" /> Reset Filters
            </button>
          )}
        </div>

        {/* Product Cards Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="glass-card rounded-3xl p-12 text-center space-y-4 max-w-md mx-auto my-12">
            <Search className="w-12 h-12 text-amber-400/40 mx-auto" />
            <h3 className="text-xl font-serif font-bold text-white">No Oils Found</h3>
            <p className="text-xs text-zinc-400">
              We couldn't find any botanical elixirs matching your selected filters or search terms.
            </p>
            <button onClick={resetFilters} className="btn-gold mx-auto text-xs">
              Clear All Filters
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
