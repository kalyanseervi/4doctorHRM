import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { Location } from '@angular/common';




@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm!: FormGroup;
  user: any;
  

  constructor(
    private _fb: FormBuilder,
    private _router: Router,
    private _login: LoginService,
    private location: Location
  ) { }
  ngOnInit(): void {
    this.setForm();
   
  }
  setForm() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    })
  }
  

  submit(): void {
    if (this.loginForm.valid) {

      const formData = this.loginForm.value;
      this._login.loginUser(formData).subscribe(
        (response) => {
          // if (response && response.token2) {
          if (response.status == "success") {
            localStorage.setItem('token', response.token2);
            // Redirect to dashboard or any other authorized page
            this._router.navigate(['/dashboard']).then(() => {
              alert('Login successful!');// Get the user data and store it in the component or a service
              this.user = response.user;
            })
          } else {
            // Handle invalid response from the server
            console.error('Login failed:', response.message);
          }
        },
        (error: any) => {
          // Handle error response from the server
          console.error('Error occurred during login:', error);
        }
      );
    } else {
      alert('Please fill out the form correctly.');

    }
  }
}


