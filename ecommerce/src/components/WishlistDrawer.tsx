import React from 'react';
import { X, Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { PRODUCTS } from '../data/products';

export const WishlistDrawer: React.FC = () => {
  const { wishlist, isWishlistOpen, setIsWishlistOpen, toggleWishlist, addToCart, setSelectedProduct } = useCart();

  if (!isWishlistOpen) return null;

  const wishlistedProducts = PRODUCTS.filter((p) => wishlist.includes(p.id));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/80 backdrop-blur-md flex justify-end">
      
      {/* Backdrop Click */}
      <div className="absolute inset-0" onClick={() => setIsWishlistOpen(false)} />

      <div className="relative w-full max-w-md bg-zinc-950 border-l border-amber-500/30 h-full flex flex-col justify-between shadow-2xl z-10 text-white animate-float" style={{ animationDuration: '0s' }}>
        
        {/* Header */}
        <div className="p-5 border-b border-zinc-800 flex items-center justify-between bg-zinc-900/60">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-rose-400 fill-current" />
            <h2 className="font-serif font-bold text-xl text-white">Your Saved Favorites</h2>
            <span className="bg-rose-500/20 text-rose-300 text-xs font-bold px-2 py-0.5 rounded-full border border-rose-500/30">
              {wishlist.length}
            </span>
          </div>
          <button
            onClick={() => setIsWishlistOpen(false)}
            className="p-2 rounded-full text-zinc-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Wishlist Items List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {wishlistedProducts.length > 0 ? (
            wishlistedProducts.map((product) => (
              <div
                key={product.id}
                className="bg-zinc-900/60 border border-zinc-800 p-3 rounded-2xl flex gap-3 items-center group hover:border-amber-500/30 transition-colors"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-16 h-16 object-cover rounded-xl border border-zinc-800 cursor-pointer"
                  onClick={() => {
                    setSelectedProduct(product);
                    setIsWishlistOpen(false);
                  }}
                />

                <div className="flex-1 min-w-0 space-y-1">
                  <div className="flex justify-between items-start">
                    <h4
                      onClick={() => {
                        setSelectedProduct(product);
                        setIsWishlistOpen(false);
                      }}
                      className="font-serif font-bold text-sm text-white truncate cursor-pointer hover:text-amber-400"
                    >
                      {product.name}
                    </h4>
                    <button
                      onClick={() => toggleWishlist(product.id)}
                      className="text-zinc-500 hover:text-rose-400 p-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <span className="text-xs text-amber-400 font-serif font-bold block">
                    Starting at ${product.volumes[0].price.toFixed(2)}
                  </span>

                  <button
                    onClick={() => addToCart(product, product.volumes[0], 1)}
                    className="btn-gold py-1 px-3 text-[11px] font-semibold mt-1"
                  >
                    <ShoppingBag className="w-3 h-3" /> Move to Cart
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-16 space-y-3">
              <Heart className="w-12 h-12 text-zinc-700 mx-auto" />
              <h3 className="text-lg font-serif font-bold text-zinc-300">No saved favorites yet</h3>
              <p className="text-xs text-zinc-500">Tap the heart icon on any oil to save it for later.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
