import React, { useState } from 'react';
import { Heart, Star, ShoppingBag, Eye, Check, Sparkles } from 'lucide-react';
import { Product, VolumeOption } from '../types';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart, toggleWishlist, isWishlisted, setSelectedProduct } = useCart();
  const [selectedVolume, setSelectedVolume] = useState<VolumeOption>(product.volumes[0]);
  const [isAdded, setIsAdded] = useState(false);

  const wishlisted = isWishlisted(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, selectedVolume, 1);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1800);
  };

  return (
    <div
      onClick={() => setSelectedProduct(product)}
      className="group glass-card rounded-2xl p-4 sm:p-5 flex flex-col justify-between cursor-pointer relative overflow-hidden transition-all duration-300 hover:-translate-y-1.5"
    >
      
      {/* Top Badges & Wishlist Action */}
      <div className="flex items-center justify-between z-10 mb-3">
        <div className="flex flex-wrap gap-1.5">
          {product.isOrganic && (
            <span className="badge-emerald flex items-center gap-1">
              <Sparkles className="w-2.5 h-2.5" /> Organic
            </span>
          )}
          {product.isBestSeller && (
            <span className="badge-gold">Bestseller</span>
          )}
          {product.isNew && (
            <span className="bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full">
              New
            </span>
          )}
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className={`p-2 rounded-full transition-all ${
            wishlisted
              ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
              : 'bg-zinc-900/60 text-zinc-400 hover:text-rose-400 hover:bg-zinc-800'
          }`}
          title={wishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
        >
          <Heart className={`w-4 h-4 ${wishlisted ? 'fill-current' : ''}`} />
        </button>
      </div>

      {/* Product Image Frame */}
      <div className="relative w-full h-52 sm:h-60 rounded-xl overflow-hidden bg-zinc-950/70 border border-zinc-800/80 mb-4 flex items-center justify-center group-hover:border-amber-500/30 transition-colors">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
        />
        
        {/* Quick View Hover overlay */}
        <div className="absolute inset-0 bg-zinc-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <span className="bg-zinc-900/90 text-amber-300 border border-amber-500/40 text-xs font-semibold px-4 py-2 rounded-full flex items-center gap-1.5 shadow-lg">
            <Eye className="w-3.5 h-3.5" /> Quick View
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="space-y-3 flex-1 flex flex-col justify-between">
        <div>
          {/* Category & Latin Name */}
          <div className="flex items-center justify-between text-[11px] text-emerald-400/90 font-medium mb-1">
            <span className="uppercase tracking-widest">{product.category}</span>
            {product.latinName && <span className="italic opacity-70 font-serif">{product.latinName}</span>}
          </div>

          {/* Title & Tagline */}
          <h3 className="font-serif font-bold text-lg text-white group-hover:text-amber-300 transition-colors line-clamp-1">
            {product.name}
          </h3>
          <p className="text-xs text-zinc-400 line-clamp-2 mt-1 leading-relaxed">
            {product.tagline}
          </p>

          {/* Rating */}
          <div className="flex items-center gap-1.5 mt-2">
            <div className="flex items-center text-amber-400">
              <Star className="w-3.5 h-3.5 fill-current" />
            </div>
            <span className="text-xs font-bold text-zinc-200">{product.rating}</span>
            <span className="text-[11px] text-zinc-500">({product.reviewCount})</span>
          </div>
        </div>

        {/* Volume Picker & Add to Cart */}
        <div className="pt-2 border-t border-zinc-800/80 space-y-3">
          
          {/* Volume Selectors */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1" onClick={(e) => e.stopPropagation()}>
            {product.volumes.map((vol) => (
              <button
                key={vol.size}
                onClick={() => setSelectedVolume(vol)}
                className={`text-[11px] font-semibold px-2.5 py-1 rounded-md border transition-all ${
                  selectedVolume.size === vol.size
                    ? 'bg-amber-400/20 text-amber-300 border-amber-400'
                    : 'bg-zinc-900/60 text-zinc-400 border-zinc-800 hover:text-zinc-200'
                }`}
              >
                {vol.size}
              </button>
            ))}
          </div>

          {/* Price & Add Button */}
          <div className="flex items-center justify-between pt-1">
            <div>
              <span className="text-[10px] text-zinc-500 uppercase tracking-wider block">Price</span>
              <span className="text-xl font-bold font-serif text-amber-400">
                ${selectedVolume.price.toFixed(2)}
              </span>
            </div>

            <button
              onClick={handleAddToCart}
              className={`px-4 py-2.5 rounded-full text-xs font-bold tracking-wide flex items-center gap-1.5 transition-all ${
                isAdded
                  ? 'bg-emerald-600 text-white shadow-[0_0_15px_rgba(16,185,129,0.4)]'
                  : 'btn-gold'
              }`}
            >
              {isAdded ? (
                <>
                  <Check className="w-3.5 h-3.5" /> Added!
                </>
              ) : (
                <>
                  <ShoppingBag className="w-3.5 h-3.5" /> Add
                </>
              )}
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};
