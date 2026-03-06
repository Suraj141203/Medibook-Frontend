export interface AdminUser {
  id: string;
  email: string;
  fullName: string;
  role: 'admin';
}

export interface PlatformUser {
  id: string;
  email: string;
  fullName: string;
  phoneNumber: string;
  role: 'user' | 'store' | 'admin';
  isActive: boolean;
  createdAt: Date;
}

export interface StoreInfo {
  id: string;
  storeName: string;
  storeIdCode: string;
  ownerName: string;
  email: string;
  phone: string;
  address: string;
  licenseNumber: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: Date;
}

export interface PlatformStats {
  totalUsers: number;
  totalStores: number;
  pendingApprovals: number;
  totalOrders: number;
  totalRevenue: number;
  activeToday: number;
}

export interface AdminOrder {
  id: string;
  orderNumber: string;
  customerName: string;
  storeName: string;
  total: number;
  status: 'pending' | 'confirmed' | 'ready' | 'picked-up' | 'cancelled';
  createdAt: Date;
}