import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/user-login/user-login.component';  // ✅ Changed
import { UserRegisterComponent } from './components/user-register/user-register.component';
import { StoreLoginComponent } from './components/store-login/store-login.component';
import { AdminLoginComponent } from './components/admin-login/admin-login.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent  // ✅ Changed
  },
  {
    path: 'register',
    component: UserRegisterComponent
  },
  {
    path: 'store-login',
    component: StoreLoginComponent
  },
  {
    path: 'admin-login',
    component: AdminLoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }