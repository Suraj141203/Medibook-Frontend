import { Component, OnInit } from '@angular/core';
import { OrderService, Order } from '../../services/order.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css']
})
export class OrderHistoryComponent implements OnInit {
  orders: Order[] = [];
  filteredOrders: Order[] = [];
  orderStats = {
    total: 0,
    pending: 0,
    completed: 0
  };
  loading = false;
  router: any;

  constructor(private orderService: OrderService) {}

  navigateToMedicines() {
  this.router.navigate(['/user/medicines']);
}

  ngOnInit(): void {
    this.loadOrders();
    this.loadOrderStats();
  }

  loadOrders(): void {
    this.loading = true;
    this.orderService.getOrders().subscribe((orders: Order[]) => {
      this.orders = orders;
      this.filteredOrders = orders;
      this.loading = false;
    });
  }

  loadOrderStats(): void {
    this.orderService.getOrderStats().subscribe((stats: { total: number; pending: number; completed: number }) => {
      this.orderStats = stats;
    });
  }
}