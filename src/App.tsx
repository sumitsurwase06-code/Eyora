import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { SearchProvider } from './context/SearchContext';
import { QuickViewProvider } from './context/QuickViewContext';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import { CartDrawer } from './components/CartDrawer/CartDrawer';
import { WishlistDrawer } from './components/WishlistDrawer/WishlistDrawer';
import { SearchModal } from './components/SearchModal/SearchModal';
import { QuickViewModal } from './components/QuickViewModal/QuickViewModal';
import { CheckoutModal } from './components/CheckoutModal/CheckoutModal';
import { Home } from './pages/Home';
import { CollectionPage } from './pages/CollectionPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { OurStoryPage } from './pages/OurStoryPage';
import { JournalPage } from './pages/JournalPage';
import './App.css';

// Helper component to scroll to top on route navigation
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

export const App: React.FC = () => {
  return (
    <Router>
      <CartProvider>
        <WishlistProvider>
          <SearchProvider>
            <QuickViewProvider>
              <ScrollToTop />
              <div className="eyora-app">
                <Header />

                <main className="main-content">
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/collection" element={<CollectionPage />} />
                    <Route path="/product/:slug" element={<ProductDetailPage />} />
                    <Route path="/our-story" element={<OurStoryPage />} />
                    <Route path="/journal" element={<JournalPage />} />
                    <Route path="*" element={<Home />} />
                  </Routes>
                </main>

                <Footer />

                {/* Global Modals & Slide-over Drawers */}
                <CartDrawer />
                <WishlistDrawer />
                <SearchModal />
                <QuickViewModal />
                <CheckoutModal />
              </div>
            </QuickViewProvider>
          </SearchProvider>
        </WishlistProvider>
      </CartProvider>
    </Router>
  );
};

export default App;
