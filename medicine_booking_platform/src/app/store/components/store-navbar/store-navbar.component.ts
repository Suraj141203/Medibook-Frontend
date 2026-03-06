import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-store-navbar',
  templateUrl: './store-navbar.component.html',
  styleUrls: ['./store-navbar.component.css']
})
export class StoreNavbarComponent implements OnInit {
  storeName: string = 'MediPlus Pharmacy';
  notifications: number = 3;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const user = this.authService.currentUserValue;
    if (user) {
      this.storeName = user.fullName;
    }
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/auth/store-login']);
  }
}