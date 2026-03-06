import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { StoreInfo } from '../../models/admin.model';

@Component({
  selector: 'app-stores-management',
  templateUrl: './stores-management.component.html'
})
export class StoresManagementComponent implements OnInit {
  stores: StoreInfo[] = [];
  loading = true;

  constructor(private adminService: AdminService) {}

  ngOnInit() {
    this.loadStores();
  }

  loadStores() {
    this.adminService.getStores().subscribe(stores => {
      this.stores = stores;
      this.loading = false;
    });
  }

  approveStore(storeId: string) {
    this.adminService.approveStore(storeId).subscribe(() => this.loadStores());
  }

  rejectStore(storeId: string) {
    this.adminService.rejectStore(storeId).subscribe(() => this.loadStores());
  }
}