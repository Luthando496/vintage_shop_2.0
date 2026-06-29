// store/useCartStore.js
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],
      
      // Add item (if it exists, increase quantity)
      addItem: (product) => set((state) => {
        const existingItem = state.items.find((item) => item.id === product.id);
        if (existingItem) {
          return {
            items: state.items.map((item) =>
              item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
            ),
          };
        }
        return { items: [...state.items, { ...product, quantity: 1 }] };
      }),

      // Remove item completely
      removeItem: (productId) => set((state) => ({
        items: state.items.filter((item) => item.id !== productId),
      })),

      // Update quantity
      updateQuantity: (productId, quantity) => set((state) => ({
        items: state.items.map((item) =>
          item.id === productId ? { ...item, quantity: Math.max(1, quantity) } : item
        ),
      })),

      // Clear cart
      clearCart: () => set({ items: [] }),

      // Getters
      getTotalItems: () => get().items.reduce((total, item) => total + item.quantity, 0),
      
      getSubtotal: () => get().items.reduce((total, item) => total + item.price_zar * item.quantity, 0),
      
      getVat: () => {
        const subtotal = get().items.reduce((total, item) => total + item.price_zar * item.quantity, 0);
        return subtotal * 0.15; // 15% VAT as per your SQL schema
      },
      
      getTotal: () => {
        const subtotal = get().items.reduce((total, item) => total + item.price_zar * item.quantity, 0);
        return subtotal * 1.15;
      }
    }),
    {
      name: 'vintage-cart-storage', // Key for local storage
    }
  )
);

export default useCartStore;