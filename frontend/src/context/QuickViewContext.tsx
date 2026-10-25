import React, { createContext, useContext, useState } from 'react';
import { Product } from '../types';

interface QuickViewContextType {
  activeProduct: Product | null;
  openQuickView: (product: Product) => void;
  closeQuickView: () => void;
}

const QuickViewContext = createContext<QuickViewContextType | undefined>(undefined);

export const QuickViewProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);

  return (
    <QuickViewContext.Provider
      value={{
        activeProduct,
        openQuickView: (p) => setActiveProduct(p),
        closeQuickView: () => setActiveProduct(null),
      }}
    >
      {children}
    </QuickViewContext.Provider>
  );
};

export const useQuickView = () => {
  const context = useContext(QuickViewContext);
  if (!context) throw new Error('useQuickView must be used within QuickViewProvider');
  return context;
};
