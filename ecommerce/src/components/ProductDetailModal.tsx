import React, { useState } from 'react';
import { X, Star, Heart, ShoppingBag, ShieldCheck, Award, MapPin, Sparkles, Check, Send } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { VolumeOption, ProductReview } from '../types';

export const ProductDetailModal: React.FC = () => {
  const { selectedProduct, setSelectedProduct, addToCart, toggleWishlist, isWishlisted, setIsCheckoutOpen } = useCart();

  if (!selectedProduct) return null;

  const [selectedVolume, setSelectedVolume] = useState<VolumeOption>(selectedProduct.volumes[0]);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'details' | 'notes' | 'reviews'>('details');
  const [isAdded, setIsAdded] = useState(false);

  // New Review form state
  const [newReviewAuthor, setNewReviewAuthor] = useState('');
  const [newReviewComment, setNewReviewComment] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [reviewsList, setReviewsList] = useState<ProductReview[]>(selectedProduct.reviews || []);

  const wishlisted = isWishlisted(selectedProduct.id);

  const handleAddToCart = () => {
    addToCart(selectedProduct, selectedVolume, quantity);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const handleBuyNow = () => {
    addToCart(selectedProduct, selectedVolume, quantity);
    setSelectedProduct(null);
    setIsCheckoutOpen(true);
  };

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewAuthor.trim() || !newReviewComment.trim()) return;

    const newRev: ProductReview = {
      id: Date.now().toString(),
      author: newReviewAuthor,
      rating: newReviewRating,
      date: new Date().toISOString().split('T')[0],
      comment: newReviewComment,
      verified: true
    };

    setReviewsList([newRev, ...reviewsList]);
    setNewReviewAuthor('');
    setNewReviewComment('');
  };

  return (
    <div className="modal-backdrop">
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto glass-card rounded-3xl p-6 sm:p-8 border border-amber-500/30 text-white shadow-2xl animate-float" style={{ animationDuration: '0s' }}>
        
        {/* Close Button */}
        <button
          onClick={() => setSelectedProduct(null)}
          className="absolute top-4 right-4 p-2.5 rounded-full bg-zinc-900/80 text-zinc-400 hover:text-white hover:bg-zinc-800 border border-zinc-800 transition-all z-20"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          
          {/* Left Column: Large Image & Badges */}
          <div className="md:col-span-5 space-y-4">
            <div className="relative rounded-2xl overflow-hidden bg-zinc-950/80 border border-zinc-800 h-80 sm:h-96 flex items-center justify-center">
              <img
                src={selectedProduct.image}
                alt={selectedProduct.name}
                className="w-full h-full object-cover object-center"
              />
              <button
                onClick={() => toggleWishlist(selectedProduct.id)}
                className={`absolute top-4 left-4 p-3 rounded-full transition-all ${
                  wishlisted
                    ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                    : 'bg-zinc-950/70 text-zinc-400 hover:text-rose-400'
                }`}
              >
                <Heart className={`w-5 h-5 ${wishlisted ? 'fill-current' : ''}`} />
              </button>
            </div>

            {/* Quick Specs Badges */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="bg-zinc-900/60 border border-zinc-800/80 p-3 rounded-xl flex items-center gap-2">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
                <div>
                  <span className="text-[10px] text-zinc-500 uppercase block">Origin</span>
                  <span className="font-semibold text-zinc-200">{selectedProduct.origin}</span>
                </div>
              </div>
              
              <div className="bg-zinc-900/60 border border-zinc-800/80 p-3 rounded-xl flex items-center gap-2">
                <Award className="w-4 h-4 text-amber-400 shrink-0" />
                <div>
                  <span className="text-[10px] text-zinc-500 uppercase block">Extraction</span>
                  <span className="font-semibold text-zinc-200 truncate block max-w-[120px]">
                    {selectedProduct.extractionMethod.split(' ')[0]}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Information, Pricing, Size Picker & Reviews */}
          <div className="md:col-span-7 space-y-5 flex flex-col justify-between">
            
            <div>
              {/* Category & Organic Badge */}
              <div className="flex items-center gap-2 mb-2">
                <span className="badge-emerald uppercase">{selectedProduct.category}</span>
                {selectedProduct.isOrganic && (
                  <span className="badge-gold flex items-center gap-1">
                    <Sparkles className="w-3 h-3" /> 100% Organic
                  </span>
                )}
              </div>

              {/* Title & Latin Name */}
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white leading-tight">
                {selectedProduct.name}
              </h2>
              {selectedProduct.latinName && (
                <p className="text-xs italic text-emerald-300 font-serif mt-0.5">
                  {selectedProduct.latinName}
                </p>
              )}

              {/* Rating */}
              <div className="flex items-center gap-2 mt-2">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <span className="text-sm font-bold text-zinc-200">{selectedProduct.rating}</span>
                <span className="text-xs text-zinc-400">({reviewsList.length} customer reviews)</span>
              </div>
            </div>

            {/* Navigation Tabs (Details, Scent Profile, Reviews) */}
            <div className="flex border-b border-zinc-800 gap-6">
              <button
                onClick={() => setActiveTab('details')}
                className={`pb-2 text-xs font-semibold uppercase tracking-wider ${
                  activeTab === 'details'
                    ? 'text-amber-400 border-b-2 border-amber-400'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                Elixir Details
              </button>
              {selectedProduct.scentNotes && (
                <button
                  onClick={() => setActiveTab('notes')}
                  className={`pb-2 text-xs font-semibold uppercase tracking-wider ${
                    activeTab === 'notes'
                      ? 'text-amber-400 border-b-2 border-amber-400'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  Scent Profile
                </button>
              )}
              <button
                onClick={() => setActiveTab('reviews')}
                className={`pb-2 text-xs font-semibold uppercase tracking-wider ${
                  activeTab === 'reviews'
                    ? 'text-amber-400 border-b-2 border-amber-400'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                Reviews ({reviewsList.length})
              </button>
            </div>

            {/* Tab Contents */}
            <div className="py-2 min-h-[140px]">
              {activeTab === 'details' && (
                <div className="space-y-3">
                  <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-light">
                    {selectedProduct.description}
                  </p>
                  <div>
                    <span className="text-[11px] font-semibold uppercase text-amber-400 tracking-wider block mb-1.5">
                      Key Botanical Benefits
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {selectedProduct.benefits.map((b) => (
                        <span key={b} className="bg-emerald-950/80 border border-emerald-500/30 text-emerald-200 text-xs px-2.5 py-1 rounded-md">
                          ✓ {b}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'notes' && selectedProduct.scentNotes && (
                <div className="space-y-2 bg-zinc-950/60 p-4 rounded-xl border border-zinc-800/80">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold text-amber-400 w-24">Top Note:</span>
                    <span className="text-xs text-zinc-200">{selectedProduct.scentNotes.top}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold text-amber-400 w-24">Heart Note:</span>
                    <span className="text-xs text-zinc-200">{selectedProduct.scentNotes.heart}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold text-amber-400 w-24">Base Note:</span>
                    <span className="text-xs text-zinc-200">{selectedProduct.scentNotes.base}</span>
                  </div>
                </div>
              )}

              {activeTab === 'reviews' && (
                <div className="space-y-4 max-h-52 overflow-y-auto pr-1">
                  
                  {/* Write a review mini form */}
                  <form onSubmit={handleAddReview} className="bg-zinc-950/80 p-3 rounded-xl border border-zinc-800 space-y-2">
                    <span className="text-xs font-semibold text-amber-400 block">Leave a Review</span>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Your Name"
                        value={newReviewAuthor}
                        onChange={(e) => setNewReviewAuthor(e.target.value)}
                        className="text-xs bg-zinc-900 border border-zinc-800 p-2 rounded w-1/2"
                      />
                      <select
                        value={newReviewRating}
                        onChange={(e) => setNewReviewRating(Number(e.target.value))}
                        className="text-xs bg-zinc-900 border border-zinc-800 p-2 rounded w-1/2"
                      >
                        <option value={5}>5 Stars ★★★★★</option>
                        <option value={4}>4 Stars ★★★★☆</option>
                        <option value={3}>3 Stars ★★★☆☆</option>
                      </select>
                    </div>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Share your experience with this oil..."
                        value={newReviewComment}
                        onChange={(e) => setNewReviewComment(e.target.value)}
                        className="text-xs bg-zinc-900 border border-zinc-800 p-2 rounded flex-1"
                      />
                      <button type="submit" className="btn-gold py-1 px-3 text-xs">
                        <Send className="w-3 h-3" />
                      </button>
                    </div>
                  </form>

                  {reviewsList.map((rev) => (
                    <div key={rev.id} className="bg-zinc-900/60 p-3 rounded-xl border border-zinc-800/60 space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-semibold text-white">{rev.author}</span>
                        <span className="text-zinc-500">{rev.date}</span>
                      </div>
                      <div className="flex text-amber-400">
                        {[...Array(rev.rating)].map((_, i) => (
                          <Star key={i} className="w-3 h-3 fill-current" />
                        ))}
                      </div>
                      <p className="text-xs text-zinc-300">{rev.comment}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Volume Picker & Add Controls */}
            <div className="space-y-4 pt-4 border-t border-zinc-800">
              
              {/* Select Volume Size */}
              <div>
                <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider block mb-2">
                  Select Bottle Size
                </span>
                <div className="grid grid-cols-3 gap-2">
                  {selectedProduct.volumes.map((vol) => (
                    <button
                      key={vol.size}
                      onClick={() => setSelectedVolume(vol)}
                      className={`p-2.5 rounded-xl border text-center transition-all ${
                        selectedVolume.size === vol.size
                          ? 'bg-amber-400/20 border-amber-400 text-amber-300 font-bold'
                          : 'bg-zinc-950/60 border-zinc-800 text-zinc-400 hover:text-white'
                      }`}
                    >
                      <span className="block text-xs uppercase">{vol.size}</span>
                      <span className="block text-sm font-serif font-bold text-white">
                        ${vol.price.toFixed(2)}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity Stepper & Action Buttons */}
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center border border-zinc-800 rounded-full bg-zinc-950/80 px-3 py-1.5">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="text-zinc-400 hover:text-white px-2 text-base font-bold"
                  >
                    -
                  </button>
                  <span className="text-sm font-bold text-white px-3">{quantity}</span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="text-zinc-400 hover:text-white px-2 text-base font-bold"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={handleAddToCart}
                  className={`flex-1 py-3 px-6 rounded-full text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
                    isAdded ? 'bg-emerald-600 text-white' : 'btn-gold'
                  }`}
                >
                  {isAdded ? (
                    <>
                      <Check className="w-4 h-4" /> Added to Cart!
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" /> Add to Cart (${(selectedVolume.price * quantity).toFixed(2)})
                    </>
                  )}
                </button>

                <button
                  onClick={handleBuyNow}
                  className="btn-outline py-3 px-6 text-xs uppercase tracking-wider"
                >
                  Buy Now
                </button>
              </div>

              {/* Guarantee Footer */}
              <div className="flex items-center justify-center gap-4 text-[11px] text-zinc-400 pt-2">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-400" /> 30-Day Elixir Guarantee
                </span>
                <span>•</span>
                <span>Free Shipping Over $75</span>
              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
