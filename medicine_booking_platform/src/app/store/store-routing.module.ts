import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StoreLayoutComponent } from './components/store-layout/store-layout.component';
import { StoreDashboardComponent } from './components/store-dashboard/store-dashboard.component';
import { AddMedicineComponent } from './components/add-medicine/add-medicine.component';
import { MedicineListComponent } from './components/medicine-list/medicine-list.component';
import { StoreOrdersComponent } from './components/store-orders/store-orders.component';

const routes: Routes = [
  {
    path: '',
    component: StoreLayoutComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: StoreDashboardComponent },
      { path: 'add-medicine', component: AddMedicineComponent },
      { path: 'medicines', component: MedicineListComponent },
      { path: 'orders', component: StoreOrdersComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StoreRoutingModule { }