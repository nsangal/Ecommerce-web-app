import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Product } from '../product.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: Product[] = [];
  private cartItemsSubject: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([]);
  private productAddedSubject: Subject<void> = new Subject<void>();

  constructor(private router: Router) {
  
    this.cartItemsSubject.next(this.cartItems);
  }

  getCartItems(): Observable<Product[]> {
    return this.cartItemsSubject.asObservable();
  }

  getCartItemCount(): number {
    return this.cartItems.reduce((count, item) => count + item.quantity, 0);
  }

  addToCart(item: Product): void {
    const existingItem = this.cartItems.find(i => i.id === item.id);
    if (existingItem) {
      existingItem.quantity++; // Increment quantity if item already exists
    } else {
      item.quantity = 1; // Initialize quantity to 1 if it's a new item
      this.cartItems.push(item);
    }
    this.cartItemsSubject.next(this.cartItems);
    this.productAddedSubject.next(); // Notify that a product was added
  }

  removeFromCart(productId: number): void {
    this.cartItems = this.cartItems.filter(item => item.id !== productId);
    this.cartItemsSubject.next(this.cartItems);
  }

  updateQuantity(productId: number, quantity: number): void {
    const item = this.cartItems.find(item => item.id === productId);
    if (item) {
      item.quantity = quantity;
    }
    this.cartItemsSubject.next(this.cartItems);
  }

  getTotal(): number {
    return this.cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  getDiscount(): number {
    // Flat 10% discount on total
    return this.getTotal() * 0.10;
  }

  // Method to get the productAddedSubject observable
  getProductAdded(): Observable<void> {
    return this.productAddedSubject.asObservable();
  }
}
