import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreRoutingModule } from './store-routing.module';

import { StoreLayoutComponent } from './components/store-layout/store-layout.component';
import { StoreNavbarComponent } from './components/store-navbar/store-navbar.component';
import { StoreDashboardComponent } from './components/store-dashboard/store-dashboard.component';
import { AddMedicineComponent } from './components/add-medicine/add-medicine.component';
import { MedicineListComponent } from './components/medicine-list/medicine-list.component';
import { StoreOrdersComponent } from './components/store-orders/store-orders.component';

@NgModule({
  declarations: [
    StoreLayoutComponent,
    StoreNavbarComponent,
    StoreDashboardComponent,
    AddMedicineComponent,
    MedicineListComponent,
    StoreOrdersComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    StoreRoutingModule
  ]
})
export class StoreModule { }