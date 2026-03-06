import { Component, OnInit } from '@angular/core';
import { StoreService } from '../../services/store.service';
import { DashboardStats } from '../../models/store.model';

@Component({
  selector: 'app-store-dashboard',
  templateUrl: './store-dashboard.component.html',
  styleUrls: ['./store-dashboard.component.css']
})
export class StoreDashboardComponent implements OnInit {
  stats: DashboardStats = {
    totalMedicines: 0,
    lowStock: 0,
    pendingOrders: 0,
    todayOrders: 0,
    totalRevenue: 0,
    monthlyRevenue: 0
  };
  loading = true;

  constructor(private storeService: StoreService) {}

  ngOnInit() {
    this.loadStats();
  }

  loadStats() {
    this.storeService.getDashboardStats().subscribe(stats => {
      this.stats = stats;
      this.loading = false;
    });
  }
}