import React from 'react';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProductGrid } from './components/ProductGrid';
import { BenefitsBanner } from './components/BenefitsBanner';
import { ProductDetailModal } from './components/ProductDetailModal';
import { OilQuizModal } from './components/OilQuizModal';
import { CartDrawer } from './components/CartDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { AuthModal } from './components/AuthModal';
import { AccountDrawer } from './components/AccountDrawer';
import { Footer } from './components/Footer';

export const App: React.FC = () => {
  return (
    <AuthProvider>
      <CartProvider>
        <div className="min-h-screen bg-[#070D0B] text-zinc-100 flex flex-col justify-between selection:bg-amber-400 selection:text-zinc-950">
          <Navbar />
          
          <main className="flex-1">
            <Hero />
            <ProductGrid />
            <BenefitsBanner />
          </main>

          <Footer />

          {/* Dynamic Modals & Drawers */}
          <ProductDetailModal />
          <OilQuizModal />
          <CartDrawer />
          <WishlistDrawer />
          <CheckoutModal />
          <AuthModal />
          <AccountDrawer />
        </div>
      </CartProvider>
    </AuthProvider>
  );
};

export default App;

