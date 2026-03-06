import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminRoutingModule } from './admin-routing.module';

import { AdminLayoutComponent } from './components/admin-layout/admin-layout.component';
import { AdminNavbarComponent } from './components/admin-navbar/admin-navbar.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { UsersManagementComponent } from './components/users-management/users-management.component';
import { StoresManagementComponent } from './components/stores-management/stores-management.component';
import { AdminOrdersComponent } from './components/admin-orders/admin-orders.component';

@NgModule({
  declarations: [
    AdminLayoutComponent,
    AdminNavbarComponent,
    AdminDashboardComponent,
    UsersManagementComponent,
    StoresManagementComponent,
    AdminOrdersComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }