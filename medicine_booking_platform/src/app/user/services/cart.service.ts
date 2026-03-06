import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Cart, CartItem } from '../models/cart.model';
import { Medicine } from '../models/medicine.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartSubject: BehaviorSubject<Cart>;
  public cart$: Observable<Cart>;
  getCartItems: any;

  constructor() {
    const savedCart = this.loadCartFromStorage();
    this.cartSubject = new BehaviorSubject<Cart>(savedCart);
    this.cart$ = this.cartSubject.asObservable();
  }

  private loadCartFromStorage(): Cart {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      return JSON.parse(savedCart);
    }
    return {
      items: [],
      totalItems: 0,
      subtotal: 0,
      discount: 0,
      total: 0
    };
  }

  private saveCartToStorage(cart: Cart): void {
    localStorage.setItem('cart', JSON.stringify(cart));
  }

  private calculateCart(items: CartItem[]): Cart {
    const subtotal = items.reduce((sum, item) => {
      const price = item.medicine.discountPrice || item.medicine.price;
      return sum + (price * item.quantity);
    }, 0);

    const discount = items.reduce((sum, item) => {
      if (item.medicine.discountPrice) {
        const discountAmount = (item.medicine.price - item.medicine.discountPrice) * item.quantity;
        return sum + discountAmount;
      }
      return sum;
    }, 0);

    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

    return {
      items,
      totalItems,
      subtotal: subtotal + discount,
      discount,
      total: subtotal
    };
  }

  addToCart(medicine: Medicine, quantity: number = 1): void {
    const currentCart = this.cartSubject.value;
    const existingItemIndex = currentCart.items.findIndex(
      item => item.medicine.id === medicine.id
    );

    let updatedItems: CartItem[];

    if (existingItemIndex > -1) {
      // Update quantity of existing item
      updatedItems = currentCart.items.map((item, index) =>
        index === existingItemIndex
          ? { ...item, quantity: item.quantity + quantity }
          : item
      );
    } else {
      // Add new item
      const newItem: CartItem = {
        medicine,
        quantity,
        addedAt: new Date()
      };
      updatedItems = [...currentCart.items, newItem];
    }

    const newCart = this.calculateCart(updatedItems);
    this.cartSubject.next(newCart);
    this.saveCartToStorage(newCart);
  }

  removeFromCart(medicineId: string): void {
    const currentCart = this.cartSubject.value;
    const updatedItems = currentCart.items.filter(
      item => item.medicine.id !== medicineId
    );
    const newCart = this.calculateCart(updatedItems);
    this.cartSubject.next(newCart);
    this.saveCartToStorage(newCart);
  }

  updateQuantity(medicineId: string, quantity: number): void {
    const currentCart = this.cartSubject.value;
    const updatedItems = currentCart.items.map(item =>
      item.medicine.id === medicineId
        ? { ...item, quantity: Math.max(1, quantity) }
        : item
    );
    const newCart = this.calculateCart(updatedItems);
    this.cartSubject.next(newCart);
    this.saveCartToStorage(newCart);
  }

  clearCart(): void {
    const emptyCart: Cart = {
      items: [],
      totalItems: 0,
      subtotal: 0,
      discount: 0,
      total: 0
    };
    this.cartSubject.next(emptyCart);
    this.saveCartToStorage(emptyCart);
  }

  getCart(): Cart {
    return this.cartSubject.value;
  }

  getCartItemCount(): number {
    return this.cartSubject.value.totalItems;
  }
}