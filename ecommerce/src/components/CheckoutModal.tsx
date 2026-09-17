import React, { useState, useEffect } from 'react';
import { X, CreditCard, ShieldCheck, CheckCircle2, ArrowRight, Printer, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

export const CheckoutModal: React.FC = () => {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    cart,
    clearCart,
    totalAmount
  } = useCart();

  const { user } = useAuth();


  const [step, setStep] = useState<1 | 2 | 3>(1);

  // Form state
  const [formData, setFormData] = useState({
    name: user ? user.name : 'Aria Sterling',
    email: user ? user.email : 'aria.sterling@apothecary.com',
    address: '742 Evergreen Terrace',
    city: 'San Francisco',
    zip: '94102',
    country: 'United States',
    cardNumber: '•••• •••• •••• 4242',
    cardExp: '12/28',
    cardCvc: '888',
    paymentMethod: 'card' as 'card' | 'applepay'
  });

  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        name: user.name,
        email: user.email,
        address: user.defaultAddress ? user.defaultAddress.split(',')[0] : prev.address
      }));
    }
  }, [user]);


  const [orderId, setOrderId] = useState<string>('');

  if (!isCheckoutOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
    } else if (step === 2) {
      // Trigger order success
      const generatedId = `AURA-${Math.floor(100000 + Math.random() * 900000)}`;
      setOrderId(generatedId);
      setStep(3);

      // Trigger Confetti!
      try {
        confetti({
          particleCount: 120,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (err) {
        // Fallback gracefully if confetti fails
      }
    }
  };

  const handleFinish = () => {
    clearCart();
    setIsCheckoutOpen(false);
    setStep(1);
  };

  return (
    <div className="modal-backdrop">
      <div className="relative w-full max-w-2xl glass-card rounded-3xl p-6 sm:p-8 border border-amber-500/30 text-white shadow-2xl animate-float" style={{ animationDuration: '0s' }}>
        
        {/* Close Button */}
        {step !== 3 && (
          <button
            onClick={() => setIsCheckoutOpen(false)}
            className="absolute top-4 right-4 p-2 rounded-full text-zinc-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        )}

        {/* Step Indicator Header */}
        <div className="text-center space-y-1 mb-6">
          <span className="badge-gold text-[10px] uppercase">
            {step === 1 && 'Step 1: Shipping Details'}
            {step === 2 && 'Step 2: Payment & Final Review'}
            {step === 3 && 'Order Confirmed'}
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white">
            {step === 1 && 'Where shall we send your oils?'}
            {step === 2 && 'Secure Payment Details'}
            {step === 3 && 'Thank You for Your Order!'}
          </h2>
        </div>

        {/* Step 1: Shipping Address Form */}
        {step === 1 && (
          <form onSubmit={handleNextStep} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-zinc-400 font-medium block mb-1">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label className="text-xs text-zinc-400 font-medium block mb-1">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-xs text-zinc-400 font-medium block mb-1">Street Address</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="text-xs text-zinc-400 font-medium block mb-1">City</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label className="text-xs text-zinc-400 font-medium block mb-1">ZIP / Postal Code</label>
                <input
                  type="text"
                  name="zip"
                  value={formData.zip}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label className="text-xs text-zinc-400 font-medium block mb-1">Country</label>
                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="btn-gold w-full py-3.5 text-xs uppercase tracking-wider justify-center mt-4"
            >
              <span>Continue to Payment</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}

        {/* Step 2: Payment Details */}
        {step === 2 && (
          <form onSubmit={handleNextStep} className="space-y-4">
            
            {/* Payment Method Selector */}
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setFormData({ ...formData, paymentMethod: 'card' })}
                className={`p-3 rounded-xl border flex items-center justify-center gap-2 transition-all ${
                  formData.paymentMethod === 'card'
                    ? 'bg-amber-400/20 border-amber-400 text-amber-300'
                    : 'bg-zinc-900 border-zinc-800 text-zinc-400'
                }`}
              >
                <CreditCard className="w-4 h-4" />
                <span className="text-xs font-semibold">Credit Card</span>
              </button>
              <button
                type="button"
                onClick={() => setFormData({ ...formData, paymentMethod: 'applepay' })}
                className={`p-3 rounded-xl border flex items-center justify-center gap-2 transition-all ${
                  formData.paymentMethod === 'applepay'
                    ? 'bg-amber-400/20 border-amber-400 text-amber-300'
                    : 'bg-zinc-900 border-zinc-800 text-zinc-400'
                }`}
              >
                <Sparkles className="w-4 h-4" />
                <span className="text-xs font-semibold">Apple Pay / Digital Wallet</span>
              </button>
            </div>

            {formData.paymentMethod === 'card' ? (
              <div className="space-y-3 bg-zinc-950/60 p-4 rounded-xl border border-zinc-800">
                <div>
                  <label className="text-xs text-zinc-400 font-medium block mb-1">Card Number</label>
                  <input
                    type="text"
                    name="cardNumber"
                    value={formData.cardNumber}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-zinc-400 font-medium block mb-1">Expiration Date</label>
                    <input
                      type="text"
                      name="cardExp"
                      value={formData.cardExp}
                      onChange={handleChange}
                      placeholder="MM/YY"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-xs text-zinc-400 font-medium block mb-1">CVC Code</label>
                    <input
                      type="text"
                      name="cardCvc"
                      value={formData.cardCvc}
                      onChange={handleChange}
                      placeholder="CVC"
                      required
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-6 bg-zinc-950/60 rounded-xl text-center border border-zinc-800 space-y-2">
                <Sparkles className="w-8 h-8 text-amber-400 mx-auto animate-pulse" />
                <p className="text-xs text-zinc-300">
                  Ready to authorize purchase with your default biometric digital wallet.
                </p>
              </div>
            )}

            {/* Order Total Summary */}
            <div className="bg-emerald-950/40 p-4 rounded-xl border border-emerald-500/30 flex justify-between items-center text-xs">
              <div>
                <span className="text-zinc-400 block">Total Amount Due</span>
                <span className="text-amber-400 font-serif font-bold text-xl">${totalAmount.toFixed(2)}</span>
              </div>
              <div className="text-right text-[11px] text-emerald-300">
                <span>{cart.length} items in package</span>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="btn-outline py-3 px-4 text-xs"
              >
                Back
              </button>
              <button
                type="submit"
                className="btn-gold flex-1 py-3.5 text-xs uppercase tracking-wider justify-center"
              >
                <ShieldCheck className="w-4 h-4" /> Place Order (${totalAmount.toFixed(2)})
              </button>
            </div>

          </form>
        )}

        {/* Step 3: Order Confirmation Screen */}
        {step === 3 && (
          <div className="text-center space-y-6">
            
            <div className="w-16 h-16 bg-emerald-500/20 border border-emerald-500/40 rounded-full flex items-center justify-center mx-auto text-emerald-400">
              <CheckCircle2 className="w-8 h-8 animate-bounce" />
            </div>

            <div className="space-y-1">
              <span className="text-xs text-amber-400 font-bold uppercase tracking-widest block">
                Order Reference #{orderId}
              </span>
              <p className="text-xs text-zinc-300 max-w-md mx-auto">
                We have sent your confirmation receipt to <strong>{formData.email}</strong>. Your artisanal oils are being freshly bottled and prepared for dispatch.
              </p>
            </div>

            {/* Receipt Summary Box */}
            <div className="bg-zinc-950/80 border border-zinc-800 rounded-2xl p-4 text-left text-xs space-y-2 max-h-40 overflow-y-auto">
              <div className="flex justify-between font-semibold text-zinc-400 border-b border-zinc-800 pb-1">
                <span>Shipping To</span>
                <span className="text-zinc-200">{formData.name}</span>
              </div>
              <p className="text-zinc-400">{formData.address}, {formData.city}, {formData.zip}</p>

              <div className="border-t border-zinc-800 pt-2 space-y-1">
                {cart.map((item) => (
                  <div key={item.product.id} className="flex justify-between text-zinc-300">
                    <span>{item.quantity}x {item.product.name} ({item.selectedVolume.size})</span>
                    <span className="text-amber-400">${(item.selectedVolume.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => window.print()}
                className="btn-outline flex-1 py-3 text-xs uppercase tracking-wider justify-center"
              >
                <Printer className="w-4 h-4" /> Print Receipt
              </button>

              <button
                onClick={handleFinish}
                className="btn-gold flex-1 py-3 text-xs uppercase tracking-wider justify-center"
              >
                Return to Sanctuary
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
