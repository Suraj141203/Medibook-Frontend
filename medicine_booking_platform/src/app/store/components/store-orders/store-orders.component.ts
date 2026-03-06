import { Component, OnInit } from '@angular/core';
import { StoreService } from '../../services/store.service';
import { StoreOrder } from '../../models/store.model';

@Component({
  selector: 'app-store-orders',
  templateUrl: './store-orders.component.html',
  styleUrls: ['./store-orders.component.css']
})
export class StoreOrdersComponent implements OnInit {
  orders: StoreOrder[] = [];
  filteredOrders: StoreOrder[] = [];
  statusFilter = 'all';
  loading = true;

  constructor(private storeService: StoreService) {}

  ngOnInit() {
    this.loadOrders();
  }

  loadOrders() {
    this.storeService.getOrders().subscribe(orders => {
      this.orders = orders;
      this.filterOrders();
      this.loading = false;
    });
  }

  filterOrders() {
    if (this.statusFilter === 'all') {
      this.filteredOrders = this.orders;
    } else {
      this.filteredOrders = this.orders.filter(o => o.status === this.statusFilter);
    }
  }

  updateStatus(orderId: string, status: StoreOrder['status']) {
    this.storeService.updateOrderStatus(orderId, status).subscribe(() => {
      this.loadOrders();
    });
  }

  getStatusBadge(status: string): string {
    const badges: any = {
      'pending': 'bg-warning',
      'accepted': 'bg-info',
      'rejected': 'bg-danger',
      'ready': 'bg-success',
      'completed': 'bg-primary'
    };
    return badges[status] || 'bg-secondary';
  }
}