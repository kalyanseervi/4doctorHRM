import { HttpClient, HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  // backend url or api url
  private url = "http://localhost:3001/api/user/login";
  constructor(private http: HttpClient) { } 
  loginUser(data: any) : Observable<any> {
    console.log("user login correct :-)", data);
     // Make an HTTP POST request to the login endpoint
    return this.http.post(this.url, data);
  }
}
