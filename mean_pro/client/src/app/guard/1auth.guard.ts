import { CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  if (typeof localStorage !== 'undefined') {
    const token = localStorage.getItem('token');
    if (token) {
      return true;
    } else {
      window.location.href = '';
      return false;
    }
  } else {
    console.error('localStorage is not available');
    return false;
  }
};

// import { Injectable } from '@angular/core';
// import { CanActivate, Router } from '@angular/router';
// import { AuthService } from '../services/auth.service';
// import { Observable, of } from 'rxjs';
// import { catchError, map } from 'rxjs/operators';

// @Injectable({
//   providedIn: 'root'
// })
// export class authGuard implements CanActivate {

//   constructor(private router: Router, private authService: AuthService) { }

//   canActivate(): Observable<boolean> {
//     return this.authService.isAuthenticated().pipe(
//       map(authenticated => {
//         if (authenticated) {
//           return true; // Proceed to the route
//         } else {
//           this.router.navigate(['']); // Redirect to the login page if token is not present
//           return false;
//         }
//       }),
//       catchError(() => {
//         console.error('An error occurred while checking authentication.');
//         // You might want to display an error message here to the user
//         return of(false);
//       })
//     );
//   }
// }

// auth.guard.ts

// import { Injectable } from '@angular/core';
// import { CanActivate, Router } from '@angular/router';
// // import { AuthService } from './auth.service';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthGuard implements CanActivate {

//   constructor(private authService: AuthService, private router: Router) {}

//   canActivate(): boolean {
//     if (this.authService.isAuthenticated()) {
//       return true; // Allow access if user is authenticated
//     } else {
//       this.router.navigate(['/login']); // Redirect to login page if user is not authenticated
//       return false;
//     }
//   }
// }
