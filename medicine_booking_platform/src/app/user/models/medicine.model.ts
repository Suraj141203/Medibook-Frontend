export interface Medicine {
  id: string;
  name: string;
  description: string;
  category: string;
  manufacturer: string;
  price: number;
  discountPrice?: number;
  inStock: boolean;
  stockQuantity: number;
  imageUrl: string;
  prescription: boolean;
  dosage?: string;
  sideEffects?: string;
  rating?: number;
  reviewCount?: number;
}

export interface MedicineCategory {
  id: string;
  name: string;
  icon: string;
  count: number;
}