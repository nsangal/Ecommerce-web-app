import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignUpComponent implements OnInit {
  signUpForm: FormGroup;
  submitted = false; 
  usernameTaken: boolean = false;
  firstInvalidField: string | null = null; 

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.signUpForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern('(?=.*[a-zA-Z])(?=.*\\d)(?=.*[^a-zA-Z0-9]).*') 
        ]
      ],
      username: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.signUpForm.get('username')?.valueChanges
      .pipe(debounceTime(300)) 
      .subscribe(() => this.checkUsername());
  }

  checkUsername() {
    const username = this.signUpForm.get('username')?.value;
    if (username) {
      this.http.get<any[]>(`http://localhost:3000/users?username=${username}`).subscribe(users => {
        this.usernameTaken = users.length > 0;
      });
    } else {
      this.usernameTaken = false; 
    }
  }

  onSubmit() {
    this.submitted = true; 
    this.firstInvalidField = this.getFirstInvalidField();

    if (this.signUpForm.valid && !this.usernameTaken) {
      this.http.post('http://localhost:3000/users', this.signUpForm.value).subscribe(() => {
        this.router.navigate(['/login']);
      });
    } else if (this.signUpForm.valid && this.usernameTaken) {
      this.firstInvalidField = 'username'; 
    }
  }

  getFirstInvalidField(): string | null {
    const controls = this.signUpForm.controls;
    for (const key in controls) {
      if (controls[key].invalid) {
        return key; 
      }
    }
    return null;
  }
}
