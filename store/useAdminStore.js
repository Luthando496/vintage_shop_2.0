// store/useAdminStore.js
import { create } from 'zustand';
import { mockProducts, mockOrders } from '@/lib/mockData';

const useAdminStore = create((set) => ({
  products: mockProducts,
  orders: mockOrders,
  
  addProduct: (product) => set((state) => ({ 
    products: [product, ...state.products] 
  })),
  
  updateOrderStatus: (orderId, newStatus) => set((state) => ({
    orders: state.orders.map(o => 
      o.id === orderId ? { ...o, status: newStatus } : o
    )
  }))
}));

export default useAdminStore;