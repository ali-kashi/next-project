"use client";

import { CartProvider } from "./contexts/CartContexts";

export default function CartProviderWrapper({ children }) {
  return (
    <CartProvider>
      {children}
    </CartProvider>
  );
}
