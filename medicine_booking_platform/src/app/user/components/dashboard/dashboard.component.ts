import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, AuthResponse } from '../../../auth/services/auth.service';
import { MedicineService, Medicine } from '../../services/medicine.service';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  user: AuthResponse | null = null;
  featuredMedicines: Medicine[] = [];

  orderStats = {
    total: 0,
    pending: 0,
    completed: 0
  };

  // ✅ Added variables
  currentUser: any;
  cartItemCount = 0;
  loading = false;

  quickActions: any[] = [];

  constructor(
    private authService: AuthService,
    private medicineService: MedicineService,
    private orderService: OrderService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadUserData();
    this.loadFeaturedMedicines();
    this.loadOrderStats();
  }

  loadUserData(): void {
    this.authService.currentUser$.subscribe((user: AuthResponse | null) => {
      this.user = user;
      this.currentUser = user;
    });
  }

  loadFeaturedMedicines(): void {
    this.medicineService.getFeaturedMedicines().subscribe((medicines: Medicine[]) => {
      this.featuredMedicines = medicines.slice(0, 8);
    });
  }

  loadOrderStats(): void {
    this.orderService.getOrderStats().subscribe((stats: { total: number; pending: number; completed: number }) => {
      this.orderStats = stats;
    });
  }

  // ✅ Added functions

  getGreeting() {
    const hour = new Date().getHours();

    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    return "Good Evening";
  }

  navigateToCart() {
    this.router.navigate(['/user/cart']);
  }

  navigateToMedicines() {
    this.router.navigate(['/user/medicines']);
  }

  addToCart(medicine: any) {
    console.log("Added to cart", medicine);
  }

}