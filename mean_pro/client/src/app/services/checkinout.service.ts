// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class CheckinoutService {

//   constructor() { }
// }

// checkinout.service.ts

// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class CheckInOutService {
//   private apiUrl = '/api/'; // Adjust the API URL as needed

//   constructor(private http: HttpClient) { }

//   checkIn(userId: string): Observable<any> {
//     return this.http.post<any>(`${this.apiUrl}/checkin`, { userId });
//   }

//   checkOut(userId: string): Observable<any> {
//     return this.http.post<any>(`${this.apiUrl}/checkout`, { userId });
//   }
// }


import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CheckinoutService {
  private baseUrl = 'http://localhost:3001/api/checkinout';

  constructor(private http: HttpClient) { }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token'); // Adjust as needed for your token storage strategy
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  checkIn(): Observable<any> {
    return this.http.post(`${this.baseUrl}/checkin`, {}, { headers: this.getAuthHeaders() }).pipe(
      catchError(this.handleError)
    );
  }

  checkOut(): Observable<any> {
    return this.http.post(`${this.baseUrl}/checkout`, {}, { headers: this.getAuthHeaders() }).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: any): Observable<never> {
    console.error('Error in CheckinoutService:', error);
    return throwError('Something went wrong; please try again later.');
  }
}
