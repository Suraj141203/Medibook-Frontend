import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, AuthResponse } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-user-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  user: AuthResponse | null = null;

  // ✅ added
  cartItemCount = 0;
  currentUser: any;
  isMenuOpen = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authService.currentUser$.subscribe((user: AuthResponse | null) => {
      this.user = user;
      this.currentUser = user;
    });
  }

  logout(): void {
    this.authService.logout();
  }

  // ✅ added functions

  navigateTo(path: string) {
    this.router.navigate([path]);
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

}