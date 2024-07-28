import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  errorMessage = '';
  firstInvalidField: string | null = null; // New property

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  get f() { return this.loginForm.controls; }

  onSubmit(): void {
    this.submitted = true;
    this.errorMessage = ''; 
    this.firstInvalidField = null;

    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      this.authService.login(username, password).subscribe({
        next: (user) => {
          if (user) {
            this.router.navigate(['/products']);
          } else {
            this.errorMessage = 'Invalid username or password';
          }
        },
        error: (error) => {
          console.error('Login error:', error);
          this.errorMessage = 'An error occurred. Please try again.';
        }
      });
    } else {
     
      if (this.f.username.errors) {
        this.firstInvalidField = 'username';
      } else if (this.f.password.errors) {
        this.firstInvalidField = 'password';
      }
    }
  }

  navigateToSignUp(): void {
    this.router.navigate(['/signup']);
  }

  clearError(field: string): void {
    if (this.f[field].errors) {
      this.submitted = false; 
    }
    this.errorMessage = '';
  }
}
