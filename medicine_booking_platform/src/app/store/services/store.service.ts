import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { StoreMedicine, StoreOrder, DashboardStats } from '../models/store.model';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  private medicinesSubject = new BehaviorSubject<StoreMedicine[]>(this.getMockMedicines());
  private ordersSubject = new BehaviorSubject<StoreOrder[]>(this.getMockOrders());

  constructor() {}

  // Dashboard Stats
  getDashboardStats(): Observable<DashboardStats> {
    const medicines = this.medicinesSubject.value;
    const orders = this.ordersSubject.value;
    
    const stats: DashboardStats = {
      totalMedicines: medicines.length,
      lowStock: medicines.filter(m => m.stock < 10).length,
      pendingOrders: orders.filter(o => o.status === 'pending').length,
      todayOrders: orders.filter(o => {
        const today = new Date().toDateString();
        return new Date(o.createdAt).toDateString() === today;
      }).length,
      totalRevenue: orders.filter(o => o.status === 'completed').reduce((sum, o) => sum + o.total, 0),
      monthlyRevenue: orders.filter(o => {
        const month = new Date().getMonth();
        return new Date(o.createdAt).getMonth() === month;
      }).reduce((sum, o) => sum + o.total, 0)
    };
    
    return of(stats).pipe(delay(500));
  }

  // Medicines CRUD
  getMedicines(): Observable<StoreMedicine[]> {
    return this.medicinesSubject.asObservable();
  }

  addMedicine(medicine: Omit<StoreMedicine, 'id' | 'addedAt'>): Observable<StoreMedicine> {
    const newMedicine: StoreMedicine = {
      ...medicine,
      id: Date.now().toString(),
      addedAt: new Date()
    };
    
    const currentMedicines = this.medicinesSubject.value;
    this.medicinesSubject.next([...currentMedicines, newMedicine]);
    
    return of(newMedicine).pipe(delay(500));
  }

  updateMedicine(id: string, updates: Partial<StoreMedicine>): Observable<boolean> {
    const medicines = this.medicinesSubject.value.map(m =>
      m.id === id ? { ...m, ...updates } : m
    );
    this.medicinesSubject.next(medicines);
    return of(true).pipe(delay(500));
  }

  deleteMedicine(id: string): Observable<boolean> {
    const medicines = this.medicinesSubject.value.filter(m => m.id !== id);
    this.medicinesSubject.next(medicines);
    return of(true).pipe(delay(500));
  }

  updateStock(id: string, newStock: number): Observable<boolean> {
    return this.updateMedicine(id, { stock: newStock });
  }

  // Orders Management
  getOrders(): Observable<StoreOrder[]> {
    return this.ordersSubject.asObservable();
  }

  updateOrderStatus(orderId: string, status: StoreOrder['status']): Observable<boolean> {
    const orders = this.ordersSubject.value.map(o =>
      o.id === orderId ? { ...o, status } : o
    );
    this.ordersSubject.next(orders);
    return of(true).pipe(delay(500));
  }

  // Mock Data
  private getMockMedicines(): StoreMedicine[] {
    return [
      {
        id: '1',
        name: 'Paracetamol 500mg',
        category: 'Pain Relief',
        manufacturer: 'PharmaCorp',
        price: 45.00,
        stock: 150,
        description: 'Effective pain relief and fever reducer',
        prescription: false,
        expiryDate: new Date('2025-12-31'),
        imageUrl: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400',
        addedAt: new Date('2024-01-15')
      },
      {
        id: '2',
        name: 'Amoxicillin 250mg',
        category: 'Antibiotics',
        manufacturer: 'MediLife',
        price: 120.00,
        stock: 8,
        description: 'Antibiotic for bacterial infections',
        prescription: true,
        expiryDate: new Date('2025-06-30'),
        imageUrl: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=400',
        addedAt: new Date('2024-02-01')
      },
      {
        id: '3',
        name: 'Cetirizine 10mg',
        category: 'Allergy',
        manufacturer: 'AllerCare',
        price: 65.00,
        stock: 200,
        description: 'Antihistamine for allergies',
        prescription: false,
        expiryDate: new Date('2026-03-31'),
        imageUrl: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=400',
        addedAt: new Date('2024-01-20')
      }
    ];
  }

  private getMockOrders(): StoreOrder[] {
    return [
      {
        id: '1',
        orderNumber: 'ORD001234',
        customerName: 'John Doe',
        customerPhone: '9876543210',
        items: [
          { medicineName: 'Paracetamol 500mg', quantity: 2, price: 45.00 },
          { medicineName: 'Cetirizine 10mg', quantity: 1, price: 65.00 }
        ],
        total: 155.00,
        status: 'pending',
        pickupDate: new Date('2024-02-20'),
        pickupTime: '10:00 AM - 11:00 AM',
        createdAt: new Date('2024-02-18')
      },
      {
        id: '2',
        orderNumber: 'ORD001235',
        customerName: 'Jane Smith',
        customerPhone: '9123456789',
        items: [
          { medicineName: 'Amoxicillin 250mg', quantity: 1, price: 120.00 }
        ],
        total: 120.00,
        status: 'accepted',
        pickupDate: new Date('2024-02-19'),
        pickupTime: '02:00 PM - 03:00 PM',
        createdAt: new Date('2024-02-17')
      },
      {
        id: '3',
        orderNumber: 'ORD001236',
        customerName: 'Mike Johnson',
        customerPhone: '9988776655',
        items: [
          { medicineName: 'Paracetamol 500mg', quantity: 3, price: 45.00 }
        ],
        total: 135.00,
        status: 'completed',
        pickupDate: new Date('2024-02-16'),
        pickupTime: '11:00 AM - 12:00 PM',
        createdAt: new Date('2024-02-15')
      }
    ];
  }
}