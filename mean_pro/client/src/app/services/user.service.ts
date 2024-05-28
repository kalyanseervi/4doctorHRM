
// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { throwError, Observable } from 'rxjs';
// import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
// import { isPlatformBrowser } from '@angular/common';
// import { catchError } from 'rxjs/operators';

// @Injectable({
//   providedIn: 'root',
// })
// export class UserService {
//   private readonly API_ENDPOINT = 'http://localhost:3001/api';
//   private readonly AUTH_HEADER = 'Authorization';

//   constructor(
//     private readonly http: HttpClient,
//     @Inject(PLATFORM_ID) private platformId: Object
//   ) { }

//   getLoggedUser(): Observable<any> {
//     if (isPlatformBrowser(this.platformId)) {
//       const token = localStorage.getItem('token');
//       if (token) {
//         const headers = new HttpHeaders().set(this.AUTH_HEADER, `Bearer ${token}`);
//         return this.http.get<any>(`${this.API_ENDPOINT}/user/loggeduser`, { headers }).pipe(
//           catchError(error => this.handleError(error))
//         );
//       } else {
//         return throwError('JWT token is missing');
//       }
//     } else {
//       return throwError('localStorage is not available in this environment 1');
//     }
//   }


// import { isPlatformBrowser } from '@angular/common';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { throwError, Observable, of } from 'rxjs';
// import { catchError } from 'rxjs/operators';
// import { Injectable, Inject, PLATFORM_ID } from '@angular/core';

// @Injectable({
//   providedIn: 'root',
// })
// export class UserService {
//   private readonly API_ENDPOINT = 'http://localhost:3001/api';
//   private readonly AUTH_HEADER = 'Authorization';

//   constructor(
//     private readonly http: HttpClient,
//     @Inject(PLATFORM_ID) private platformId: Object
//   ) { }

//   getLoggedUser(): Observable<any> {
//     if (isPlatformBrowser(this.platformId)) {
//       const token = localStorage.getItem('token');
//       if (token) {
//         const headers = new HttpHeaders().set(this.AUTH_HEADER, `Bearer ${token}`);
//         return this.http.get<any>(`${this.API_ENDPOINT}/user/loggeduser`, { headers }).pipe(
//           catchError(error => this.handleError(error))
//         );
//       } else {
//         return throwError('JWT token is missing');
//       }
//     } else {


//       return of(null); // You can modify this to return a default user object or handle it as needed
//     }
//   }



//   checkIn(): Observable<any> {
//     if (isPlatformBrowser(this.platformId)) {
//       const token = localStorage.getItem('token');
//       if (token) {
//         const headers = new HttpHeaders().set(this.AUTH_HEADER, `Bearer ${token}`);
//         return this.http.post<any>(`${this.API_ENDPOINT}/checkinout/checkin`, {}, { headers }).pipe(
//           catchError(error => {
//             if (error.status === 201) {
//               setTimeout(() => {
//               }, 15 * 60 * 60 * 1000); // 15 hours in milliseconds
//               return of(error.error); // Assuming the response body contains relevant data
//             } else {
//               return this.handleError(error);
//             }
//           })
//         );
//       } else {
//         return throwError('JWT token is missing');
//       }
//     } else {
//       return throwError('localStorage is not available in this environment');
//     }
//   }


//   checkOut(): Observable<any> {
//     if (isPlatformBrowser(this.platformId)) {
//       const token = localStorage.getItem('token');
//       if (token) {
//         const headers = new HttpHeaders().set(this.AUTH_HEADER, `Bearer ${token}`);
//         return this.http.post<any>(`${this.API_ENDPOINT}/checkinout/checkout`, {}, { headers }).pipe(
//           catchError(error => {
//             if (error.status === 200 || error.status === 201) {

//               return of(error.error); 
//             } else {
//               return this.handleError(error);
//             }
//           })
//         );
//       } else {
//         return throwError('JWT token is missing');
//       }
//     } else {
//       return throwError('localStorage is not available in this environment');
//     }
//   }


//   logout(): void {
//     localStorage.removeItem('token');
//     // Optionally, perform any additional cleanup or actions needed for logout
//   }
//   private handleError(error: any): Observable<never> {
//     console.error('Error:', error);
//     return throwError(error);
//   }


// }

import { isPlatformBrowser } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { throwError, Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly API_ENDPOINT = 'http://localhost:3001/api';
  private readonly AUTH_HEADER = 'Authorization';

  constructor(
    private readonly http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  getLoggedUser(): Observable<any> {
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('token');
      if (token) {
        const headers = new HttpHeaders().set(this.AUTH_HEADER, `Bearer ${token}`);
        return this.http.get<any>(`${this.API_ENDPOINT}/user/loggeduser`, { headers }).pipe(
          catchError(error => this.handleError(error))
        );
      } else {
        return throwError('JWT token is missing');
      }
    } else {
      return of(null);
    }
  }

  checkIn(): Observable<any> {
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('token');
      if (token) {
        const headers = new HttpHeaders().set(this.AUTH_HEADER, `Bearer ${token}`);
        return this.http.post<any>(`${this.API_ENDPOINT}/checkinout/checkin`, {}, { headers }).pipe(
          catchError(error => {
            if (error.status === 201) {
              setTimeout(() => { }, 15 * 60 * 60 * 1000); // 15 hours in milliseconds
              return of(error.error);
            } else {
              return this.handleError(error);
            }
          })
        );
      } else {
        return throwError('JWT token is missing');
      }
    } else {
      return throwError('localStorage is not available in this environment');
    }
  }

  checkOut(): Observable<any> {
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('token');
      if (token) {
        const headers = new HttpHeaders().set(this.AUTH_HEADER, `Bearer ${token}`);
        return this.http.post<any>(`${this.API_ENDPOINT}/checkinout/checkout`, {}, { headers }).pipe(
          catchError(error => {
            if (error.status === 200 || error.status === 201) {
              return of(error.error);
            } else {
              return this.handleError(error);
            }
          })
        );
      } else {
        return throwError('JWT token is missing');
      }
    } else {
      return throwError('localStorage is not available in this environment');
    }
  }

  getCheckInOutHistory(): Observable<any> {
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('token');
      if (token) {
        const headers = new HttpHeaders().set(this.AUTH_HEADER, `Bearer ${token}`);
        return this.http.get<any>(`${this.API_ENDPOINT}/checkinout/entries`, { headers }).pipe(
          catchError(error => this.handleError(error))
        );
      } else {
        return throwError('JWT token is missing');
      }
    } else {
      return throwError('localStorage is not available in this environment');
    }
  }

  logout(): void {
    localStorage.removeItem('token');
  }

  private handleError(error: any): Observable<never> {
    console.error('Error:', error);
    return throwError(error);
  }
}
