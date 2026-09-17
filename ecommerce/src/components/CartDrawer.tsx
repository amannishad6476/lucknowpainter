import React, { useState } from 'react';
import { X, Trash2, ShoppingBag, ArrowRight, Tag, ShieldCheck, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    subtotal,
    discountAmount,
    shippingFee,
    taxAmount,
    totalAmount,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    progressToFreeShipping,
    freeShippingThreshold,
    setIsCheckoutOpen
  } = useCart();

  const [couponInput, setCouponInput] = useState('');
  const [couponFeedback, setCouponFeedback] = useState<{ success: boolean; message: string } | null>(null);

  if (!isCartOpen) return null;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    const res = applyCoupon(couponInput);
    setCouponFeedback(res);
    if (res.success) setCouponInput('');
  };

  const amountLeftForFreeShipping = Math.max(0, freeShippingThreshold - (subtotal - discountAmount));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/80 backdrop-blur-md flex justify-end">
      
      {/* Backdrop Click */}
      <div className="absolute inset-0" onClick={() => setIsCartOpen(false)} />

      {/* Slide-over Content Container */}
      <div className="relative w-full max-w-md bg-zinc-950 border-l border-amber-500/30 h-full flex flex-col justify-between shadow-2xl z-10 text-white animate-float" style={{ animationDuration: '0s' }}>
        
        {/* Header */}
        <div className="p-5 border-b border-zinc-800 flex items-center justify-between bg-zinc-900/60">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-amber-400" />
            <h2 className="font-serif font-bold text-xl text-white">Your Sanctuary Bag</h2>
            <span className="bg-amber-400/20 text-amber-300 text-xs font-bold px-2 py-0.5 rounded-full border border-amber-400/30">
              {cart.reduce((a, b) => a + b.quantity, 0)}
            </span>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="p-2 rounded-full text-zinc-400 hover:text-white hover:bg-zinc-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Progress Indicator */}
        <div className="bg-emerald-950/40 border-b border-emerald-500/20 p-4 space-y-2">
          <div className="flex justify-between text-xs">
            {amountLeftForFreeShipping > 0 ? (
              <span className="text-emerald-300">
                Add <strong className="text-amber-400">${amountLeftForFreeShipping.toFixed(2)}</strong> more for <strong>Free Express Shipping</strong>
              </span>
            ) : (
              <span className="text-emerald-400 font-bold flex items-center gap-1">
                <Check className="w-4 h-4" /> You've unlocked Complimentary Express Shipping!
              </span>
            )}
          </div>
          <div className="w-full bg-zinc-900 rounded-full h-2 overflow-hidden border border-zinc-800">
            <div
              className="bg-gradient-to-r from-amber-500 to-emerald-400 h-full transition-all duration-500"
              style={{ width: `${progressToFreeShipping}%` }}
            />
          </div>
        </div>

        {/* Cart Item List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {cart.length > 0 ? (
            cart.map((item) => (
              <div
                key={`${item.product.id}-${item.selectedVolume.size}`}
                className="bg-zinc-900/60 border border-zinc-800 p-3 rounded-2xl flex gap-3 items-center group hover:border-amber-500/30 transition-colors"
              >
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-16 h-16 object-cover rounded-xl border border-zinc-800 shrink-0"
                />

                <div className="flex-1 min-w-0 space-y-1">
                  <div className="flex justify-between items-start">
                    <h4 className="font-serif font-bold text-sm text-white truncate">
                      {item.product.name}
                    </h4>
                    <button
                      onClick={() => removeFromCart(item.product.id, item.selectedVolume.size)}
                      className="text-zinc-500 hover:text-rose-400 p-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <span className="text-[11px] text-amber-300 bg-amber-400/10 px-2 py-0.5 rounded border border-amber-500/20 inline-block font-semibold">
                    {item.selectedVolume.size}
                  </span>

                  <div className="flex items-center justify-between pt-1">
                    {/* Stepper */}
                    <div className="flex items-center border border-zinc-800 rounded-lg bg-zinc-950 px-2 py-0.5 text-xs">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.selectedVolume.size, -1)}
                        className="text-zinc-400 hover:text-white px-1 font-bold"
                      >
                        -
                      </button>
                      <span className="px-2 text-white font-semibold">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.selectedVolume.size, 1)}
                        className="text-zinc-400 hover:text-white px-1 font-bold"
                      >
                        +
                      </button>
                    </div>

                    <span className="text-sm font-serif font-bold text-amber-400">
                      ${(item.selectedVolume.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-16 space-y-3">
              <ShoppingBag className="w-12 h-12 text-zinc-700 mx-auto" />
              <h3 className="text-lg font-serif font-bold text-zinc-300">Your bag is currently empty</h3>
              <p className="text-xs text-zinc-500">Explore our organic essential oils and culinary elixirs.</p>
              <button
                onClick={() => setIsCartOpen(false)}
                className="btn-gold text-xs mx-auto"
              >
                Browse Collection
              </button>
            </div>
          )}
        </div>

        {/* Footer Summary & Coupon Section */}
        {cart.length > 0 && (
          <div className="p-5 border-t border-zinc-800 bg-zinc-900/80 space-y-4">
            
            {/* Promo Code Form */}
            <form onSubmit={handleApplyCoupon} className="space-y-1">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="w-3.5 h-3.5 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Promo Code (AURA15)"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    className="text-xs bg-zinc-950 border border-zinc-800 pl-8 pr-3 py-2 rounded-xl text-white uppercase"
                  />
                </div>
                <button type="submit" className="btn-outline py-2 px-4 text-xs font-semibold">
                  Apply
                </button>
              </div>

              {appliedCoupon && (
                <div className="flex items-center justify-between text-xs text-emerald-400 pt-1">
                  <span>Code <strong>{appliedCoupon.code}</strong> applied ({appliedCoupon.discountPercent}% Off)</span>
                  <button onClick={removeCoupon} className="text-rose-400 hover:underline">Remove</button>
                </div>
              )}

              {couponFeedback && !appliedCoupon && (
                <span className={`text-[11px] ${couponFeedback.success ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {couponFeedback.message}
                </span>
              )}
            </form>

            {/* Calculations Breakdown */}
            <div className="space-y-1.5 text-xs text-zinc-400 pt-2 border-t border-zinc-800/80">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="text-zinc-200">${subtotal.toFixed(2)}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-400">
                  <span>Discount</span>
                  <span>-${discountAmount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Estimated Shipping</span>
                <span>{shippingFee === 0 ? <strong className="text-emerald-400">FREE</strong> : `$${shippingFee}`}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax (8%)</span>
                <span>${taxAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-base font-bold text-white pt-2 border-t border-zinc-800">
                <span>Total</span>
                <span className="text-amber-400 font-serif text-xl">${totalAmount.toFixed(2)}</span>
              </div>
            </div>

            {/* Checkout Trigger */}
            <button
              onClick={() => {
                setIsCartOpen(false);
                setIsCheckoutOpen(true);
              }}
              className="btn-gold w-full py-3.5 text-xs uppercase tracking-wider justify-center"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="flex items-center justify-center gap-2 text-[10px] text-zinc-500 text-center">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              <span>Encrypted SSL 256-bit Secure Checkout</span>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
