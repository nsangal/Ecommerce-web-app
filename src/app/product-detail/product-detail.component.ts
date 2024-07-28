import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { Product } from '../product.model';
import { CartService } from '../services/cart.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  product: Product = {
    id: 0,
    title: '',
    description: '',
    category: '',
    quantity: 0,
    addedOn: '',
    price: 0,
    seller: '',
    imageUrl: ''
  };

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService,
    private snackBar: MatSnackBar,
    private router: Router 
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const productIdParam = params.get('id');
      if (productIdParam) {
        const productId = +productIdParam;
        if (!isNaN(productId)) {
          this.productService.getProductById(productId).subscribe((data: Product) => {
            this.product = data;
          });
        } else {
          console.error('Invalid productId:', productId);
        }
      } else {
        console.error('No productId found in route parameters');
      }
    });

    
    this.cartService.getProductAdded().subscribe(() => {
      this.router.navigate(['/cart']);
    });
  }

  addToCart(product: Product): void {
    this.cartService.addToCart(this.product);
    this.snackBar.open('Added to cart', 'Close', { duration: 500 });
  }
}
