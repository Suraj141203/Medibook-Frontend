import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface Order {
  id: string;
  orderNumber: string;
  userId: string;
  storeId: string;
  storeName: string;
  customerName: string;
  customerPhone: string;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  total: number;
  status: string;
  pickupDate: string;
  pickupTime: string;
  createdAt: string;
}

export interface OrderItem {
  medicineId: string;
  medicineName: string;
  quantity: number;
  price: number;
}

export interface OrderRequest {
  storeId: string;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  total: number;
  pickupDate: string;
  pickupTime: string;
}

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = `${environment.apiUrl}/orders`;

  constructor(private http: HttpClient) {}

  getUserOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.apiUrl);
  }

  getOrderById(id: string): Observable<Order> {
    return this.http.get<Order>(`${this.apiUrl}/${id}`);
  }

  createOrder(order: OrderRequest): Observable<Order> {
    return this.http.post<Order>(this.apiUrl, order);
  }

  cancelOrder(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  // ✅ NEW METHODS
  getOrders(): Observable<Order[]> {
    return this.getUserOrders();
  }

  getOrderStats(): Observable<{ total: number; pending: number; completed: number }> {
    return this.getUserOrders().pipe(
      map(orders => ({
        total: orders.length,
        pending: orders.filter(o => o.status === 'PENDING').length,
        completed: orders.filter(o => o.status === 'COMPLETED').length
      }))
    );
  }
}