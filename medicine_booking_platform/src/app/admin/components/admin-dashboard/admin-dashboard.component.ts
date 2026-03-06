import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { PlatformStats } from '../../models/admin.model';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  stats: PlatformStats = {
    totalUsers: 0,
    totalStores: 0,
    pendingApprovals: 0,
    totalOrders: 0,
    totalRevenue: 0,
    activeToday: 0
  };
  loading = true;

  constructor(private adminService: AdminService) {}

  ngOnInit() {
    this.adminService.getPlatformStats().subscribe(stats => {
      this.stats = stats;
      this.loading = false;
    });
  }
}