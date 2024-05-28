import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RegistrService {
// backend url or api url
  url="http://localhost:3001/api/user/register";
  constructor(private http:HttpClient) { }

  registerUser(data: any) {
    console.log("Data being sent to server:", data);
    return this.http.post(this.url, data);
  }
}


// import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class RegistrService {
//   // backend url or api url
//   url = "http://localhost:3001/api/user/register";

//   constructor(private http: HttpClient) { }

//   registerUser(data: any, file: File) {
//     const formData: FormData = new FormData();
//     for (const key in data) {
//       formData.append(key, data[key]);
//     }
//     formData.append('userImage', file, file.name);

//     console.log("Data being sent to server:", formData);
//     return this.http.post(this.url, formData, { 
//       headers: { 'Content-Type': 'multipart/form-data' } 
//     });
//   }
// }


// import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';


// @Injectable({
//   providedIn: 'root'
// })
// export class RegistrService {
//   // backend url or api url
//   url = "http://localhost:3001/api/user/register";

//   constructor(private http: HttpClient) { }

//   registerUser(formData: FormData) {
//     console.log("Data being sent to server:", formData);
//     return this.http.post(this.url, formData);
//   }
// }
