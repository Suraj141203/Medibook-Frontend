import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AuthRoutingModule } from './auth-routing.module';

import { LoginComponent } from './components/user-login/user-login.component';  // ✅ Changed
import { UserRegisterComponent } from './components/user-register/user-register.component';
import { StoreLoginComponent } from './components/store-login/store-login.component';
import { AdminLoginComponent } from './components/admin-login/admin-login.component';

@NgModule({
  declarations: [
    LoginComponent,            // ✅ Changed
    UserRegisterComponent,
    StoreLoginComponent,
    AdminLoginComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    AuthRoutingModule
  ]
})
export class AuthModule { }