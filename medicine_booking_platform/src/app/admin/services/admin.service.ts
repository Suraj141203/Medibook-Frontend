import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { PlatformUser, StoreInfo, PlatformStats, AdminOrder } from '../models/admin.model';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private usersSubject = new BehaviorSubject<PlatformUser[]>(this.getMockUsers());
  private storesSubject = new BehaviorSubject<StoreInfo[]>(this.getMockStores());
  private ordersSubject = new BehaviorSubject<AdminOrder[]>(this.getMockOrders());

  constructor() {}

  // Platform Statistics
  getPlatformStats(): Observable<PlatformStats> {
    const users = this.usersSubject.value;
    const stores = this.storesSubject.value;
    const orders = this.ordersSubject.value;
    
    return of({
      totalUsers: users.filter(u => u.role === 'user').length,
      totalStores: stores.filter(s => s.status === 'approved').length,
      pendingApprovals: stores.filter(s => s.status === 'pending').length,
      totalOrders: orders.length,
      totalRevenue: orders.reduce((sum, o) => sum + o.total, 0),
      activeToday: Math.floor(users.length * 0.15)
    }).pipe(delay(500));
  }

  // Users Management
  getUsers(): Observable<PlatformUser[]> {
    return this.usersSubject.asObservable();
  }

  toggleUserStatus(userId: string): Observable<boolean> {
    const users = this.usersSubject.value.map(u =>
      u.id === userId ? { ...u, isActive: !u.isActive } : u
    );
    this.usersSubject.next(users);
    return of(true).pipe(delay(500));
  }

  deleteUser(userId: string): Observable<boolean> {
    const users = this.usersSubject.value.filter(u => u.id !== userId);
    this.usersSubject.next(users);
    return of(true).pipe(delay(500));
  }

  // Stores Management
  getStores(): Observable<StoreInfo[]> {
    return this.storesSubject.asObservable();
  }

  approveStore(storeId: string): Observable<boolean> {
    const stores = this.storesSubject.value.map(s =>
      s.id === storeId ? { ...s, status: 'approved' as const } : s
    );
    this.storesSubject.next(stores);
    return of(true).pipe(delay(500));
  }

  rejectStore(storeId: string): Observable<boolean> {
    const stores = this.storesSubject.value.map(s =>
      s.id === storeId ? { ...s, status: 'rejected' as const } : s
    );
    this.storesSubject.next(stores);
    return of(true).pipe(delay(500));
  }

  // Orders Management
  getAllOrders(): Observable<AdminOrder[]> {
    return this.ordersSubject.asObservable();
  }

  // Mock Data Generators
  private getMockUsers(): PlatformUser[] {
    const firstNames = ['John', 'Jane', 'Mike', 'Sarah', 'David', 'Emma', 'Tom', 'Lisa', 'James', 'Mary'];
    const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez'];
    
    return Array.from({ length: 50 }, (_, i) => ({
      id: `user-${i + 1}`,
      email: `user${i + 1}@example.com`,
      fullName: `${firstNames[i % 10]} ${lastNames[Math.floor(i / 5) % 10]}`,
      phoneNumber: `98${Math.floor(10000000 + Math.random() * 90000000)}`,
      role: i < 45 ? 'user' as const : (i < 48 ? 'store' as const : 'admin' as const),
      isActive: i < 47,
      createdAt: new Date(2024, 0, 1 + i)
    }));
  }

  private getMockStores(): StoreInfo[] {
    const storeNames = [
      'MediPlus Pharmacy', 'HealthCare Drugs', 'Apollo Pharmacy', 'Wellness Store',
      'City Medical Store', 'Care Pharmacy', 'Quick Meds', 'Pharmacy 24/7',
      'Healing Hands', 'MedLife Store', 'Trust Pharmacy', 'Health First'
    ];
    
    const cities = ['Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai', 'Kolkata'];
    
    return storeNames.map((name, i) => ({
      id: `store-${i + 1}`,
      storeName: name,
      storeIdCode: `STR${1000 + i}`,
      ownerName: `Owner ${i + 1}`,
      email: `store${i + 1}@example.com`,
      phone: `91${Math.floor(1000000000 + Math.random() * 9000000000)}`,
      address: `${Math.floor(Math.random() * 999) + 1} Main Street, ${cities[i % 6]}`,
      licenseNumber: `LIC${10000 + i}`,
      status: i < 3 ? 'pending' as const : (i < 10 ? 'approved' as const : 'rejected' as const),
      createdAt: new Date(2024, 0, 1 + i * 2)
    }));
  }

  private getMockOrders(): AdminOrder[] {
    return Array.from({ length: 100 }, (_, i) => ({
      id: `ord-${i + 1}`,
      orderNumber: `ORD${100000 + i}`,
      customerName: `Customer ${i + 1}`,
      storeName: `Store ${(i % 10) + 1}`,
      total: Math.floor(Math.random() * 5000) + 100,
      status: ['pending', 'confirmed', 'ready', 'picked-up', 'cancelled'][i % 5] as any,
      createdAt: new Date(2024, 1, 1 + (i % 17))
    }));
  }
}