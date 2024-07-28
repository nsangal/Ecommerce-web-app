import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/users'; 
  private loggedIn = new BehaviorSubject<boolean>(false);
  private currentUser: any;

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    return this.http.get<any[]>(`${this.apiUrl}?username=${username}`).pipe(
      map(users => {
        // Find the user with the correct username and password
        const user = users.find(u => u.password === password);
        if (user) {
          this.loggedIn.next(true);
          this.currentUser = user; // Store the logged-in user
          return user;
        } else {
          return null;
        }
      }),
      catchError(error => {
        console.error('Login error:', error);
        return of(null);
      })
    );
  }
  

  logout(): void {
    this.loggedIn.next(false);
    this.currentUser = null;
  }

  get isLoggedIn(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  getCurrentUser(): any {
    return this.currentUser;
  }
}
