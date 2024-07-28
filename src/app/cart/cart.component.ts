import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { Product } from '../product.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cartItems: Product[] = [];
  total: number = 0;
  discount: number = 0;

  constructor(private cartService: CartService, private router: Router) { }

  ngOnInit(): void {
    this.cartService.getCartItems().subscribe((items: Product[]) => {
      this.cartItems = items;
      this.calculateTotals();
    });
  }

  calculateTotals(): void {
    this.total = this.cartService.getTotal();
    this.discount = this.cartService.getDiscount();
  }

  removeItem(productId: number): void {
    this.cartService.removeFromCart(productId); 
    this.cartService.getCartItems().subscribe((items: Product[]) => {
      this.cartItems = items; 
      this.calculateTotals();
    });
  }

  updateQuantity(productId: number, quantity: number): void {
    this.cartService.updateQuantity(productId, quantity);
    this.calculateTotals();
  }

  incrementQuantity(productId: number): void {
    const item = this.cartItems.find(i => i.id === productId);
    if (item) {
      this.updateQuantity(productId, item.quantity + 1);
    }
  }

  decrementQuantity(productId: number): void {
    const item = this.cartItems.find(i => i.id === productId);
    if (item && item.quantity > 1) { 
      this.updateQuantity(productId, item.quantity - 1);
    }
  }

  backToShopping(): void {
    this.router.navigate(['/products']);
  }
}
