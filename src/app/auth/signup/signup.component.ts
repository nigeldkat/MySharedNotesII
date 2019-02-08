import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  isLoading: boolean = false;
  userSubmitted: boolean = false;
  signUpForm: FormGroup;
  serverError: boolean = false;
  serverErrorMessage: string;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.signUpForm = new FormGroup({
      email: new FormControl('', {
        validators: [Validators.required, Validators.email]
      }),
      password: new FormControl('', { validators: [Validators.required, Validators.minLength(6)] }),
      username: new FormControl('', { validators: [Validators.required] })
    });
  }

  onSubmit() {
    this.userSubmitted = true;
    this.serverError = false;
    if (this.signUpForm.valid) {
      return this.authService.regusterUser(this.Email.value,
        this.Password.value, this.UserName.value)
        .then(() => this.router.navigate(['/notelist'])).catch((error) => {
          console.log('in signin error - ', error)
          this.serverError = true;
          this.serverErrorMessage = error.message;
        });
    }

  }

  public get Email() {
    return this.signUpForm.get("email");
  }
  public get Password() {
    return this.signUpForm.get("password");
  }
  public get UserName() {
    return this.signUpForm.get("username");
  }

}
