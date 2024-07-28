import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {  provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignUpComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';  // Import SignUpComponent
import { AuthGuard } from './auth.guard';
import { AuthService } from './services/auth.service';
import { ProductListComponent } from './product-list/product-list.component';
import { HeaderComponent } from './header/header.component';
import { DefaultRedirectComponent } from './default-redirect/default-redirect.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { CartComponent } from './cart/cart.component';
import { CartService } from './services/cart.service'; 
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
@NgModule({
  
  declarations: [
    AppComponent,
    SignUpComponent,
    LoginComponent,
    ProductListComponent,
    HeaderComponent,
    DefaultRedirectComponent,
    ProductDetailComponent,
    CartComponent  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    BrowserAnimationsModule
   
  ],
  providers: [
    CartService,
    provideClientHydration(),
    provideHttpClient(withInterceptorsFromDi()),
    AuthService, 
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
