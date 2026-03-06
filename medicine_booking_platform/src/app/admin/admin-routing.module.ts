import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLayoutComponent } from './components/admin-layout/admin-layout.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { UsersManagementComponent } from './components/users-management/users-management.component';
import { StoresManagementComponent } from './components/stores-management/stores-management.component';
import { AdminOrdersComponent } from './components/admin-orders/admin-orders.component';

const routes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: AdminDashboardComponent },
      { path: 'users', component: UsersManagementComponent },
      { path: 'stores', component: StoresManagementComponent },
      { path: 'orders', component: AdminOrdersComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }