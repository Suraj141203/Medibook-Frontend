export interface StoreUser {
  id: string;
  email: string;
  storeName: string;
  storeId: string;
  address: string;
  phone: string;
  role: 'store';
}

export interface StoreMedicine {
  id: string;
  name: string;
  category: string;
  manufacturer: string;
  price: number;
  stock: number;
  description: string;
  prescription: boolean;
  expiryDate: Date;
  imageUrl?: string;
  addedAt: Date;
}

export interface StoreOrder {
  id: string;
  orderNumber: string;
  customerName: string;
  customerPhone: string;
  items: Array<{
    medicineName: string;
    quantity: number;
    price: number;
  }>;
  total: number;
  status: 'pending' | 'accepted' | 'rejected' | 'ready' | 'completed';
  pickupDate: Date;
  pickupTime: string;
  createdAt: Date;
}

export interface DashboardStats {
  totalMedicines: number;
  lowStock: number;
  pendingOrders: number;
  todayOrders: number;
  totalRevenue: number;
  monthlyRevenue: number;
}