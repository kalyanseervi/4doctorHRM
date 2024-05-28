import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegistrService } from '../../services/registr.service';
import { confirmPasswordValidator } from '../../validators/confirm-password.validator';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {

  userRegForm!: FormGroup;
  constructor(
    private _register: RegistrService,
    private router: Router
  ) { }
  ngOnInit(): void {
    this.setForm();
  }
  setForm() {
    this.userRegForm = new FormGroup({
      name: new FormControl('', Validators.required),
      jobTitle: new FormControl(''),
      email: new FormControl('', [Validators.required, Validators.email]),
      city: new FormControl(''),
      bio: new FormControl(''),
      password: new FormControl('', [Validators.required, Validators.minLength(2)]),
      confirmPassword: new FormControl('', Validators.required)
    }, { validators: confirmPasswordValidator });

  }
  register() {
    console.log("form submitted !");
    console.log(this.userRegForm.value);
    this._register.registerUser(this.userRegForm.value).subscribe(
      (data) => {
        
      alert("Registered Successfully");
      console.log(data)
      this.userRegForm.reset();
      // alert(data.msg);
      this.router.navigate(['']);
    })
  } 
}
