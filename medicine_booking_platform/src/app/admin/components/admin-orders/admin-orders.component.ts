import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { AdminOrder } from '../../models/admin.model';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html'
})
export class AdminOrdersComponent implements OnInit {
  orders: AdminOrder[] = [];
  loading = true;

  constructor(private adminService: AdminService) {}

  ngOnInit() {
    this.adminService.getAllOrders().subscribe(orders => {
      this.orders = orders;
      this.loading = false;
    });
  }

  getStatusBadge(status: string): string {
    const badges: any = {
      'pending': 'bg-warning text-dark',
      'confirmed': 'bg-info',
      'ready': 'bg-success',
      'picked-up': 'bg-primary',
      'cancelled': 'bg-danger'
    };
    return badges[status] || 'bg-secondary';
  }
}