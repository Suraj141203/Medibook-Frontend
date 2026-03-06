import { Medicine } from './medicine.model';

export interface CartItem {
  medicine: Medicine;
  quantity: number;
  addedAt: Date;
}

export interface Cart {
  items: CartItem[];
  totalItems: number;
  subtotal: number;
  discount: number;
  total: number;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  total: number;
  status: 'pending' | 'confirmed' | 'ready' | 'picked-up' | 'cancelled';
  storeName: string;
  storeAddress: string;
  pickupDate: Date;
  pickupTime: string;
  createdAt: Date;
  updatedAt: Date;
  orderNumber: string;
}

export interface BookingRequest {
  items: CartItem[];
  pickupDate: Date;
  pickupTime: string;
  storeId?: string;
}