import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { OrderService, OrderRequest } from '../../services/order.service';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cartItems: any[] = [];
  total = 0;

  // ✅ added
  cart = {
    items: [] as any[],
    totalItems: 0,
    total: 0
  };

  constructor(
    private cartService: CartService,
    private orderService: OrderService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart(): void {
    this.cartService.getCartItems().subscribe((items: any[]) => {
      this.cartItems = items;

      // sync with cart object
      this.cart.items = items;
      this.cart.totalItems = items.length;

      this.calculateTotal();
    });
  }

  calculateTotal(): void {
    this.total = this.cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    // sync total
    this.cart.total = this.total;
  }

  checkout(): void {

    const currentUser = this.authService.getCurrentUser();

    if (!currentUser) {
      this.router.navigate(['/auth/login']);
      return;
    }

    const orderRequest: OrderRequest = {
      storeId: this.cartItems[0]?.storeId || '',
      items: this.cartItems.map(item => ({
        medicineId: item.id,
        medicineName: item.name,
        quantity: item.quantity,
        price: item.price
      })),
      subtotal: this.total,
      discount: 0,
      total: this.total,
      pickupDate: new Date().toISOString().split('T')[0],
      pickupTime: '10:00'
    };

    this.orderService.createOrder(orderRequest).subscribe({
      next: () => {
        this.cartService.clearCart();
        this.router.navigate(['/user/orders']);
      },
      error: (error) => {
        console.error('Order creation failed:', error);
      }
    });
  }

  // ✅ added function
  continueShopping() {
    this.router.navigate(['/user/medicines']);
  }

}