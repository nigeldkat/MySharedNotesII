import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  resetPWForm: FormGroup;
  isLoading: boolean = false;
  userSubmitted: boolean = false;
  serverError: boolean = false;
  serverErrorMessage: string;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.resetPWForm = new FormGroup({
      email: new FormControl('', {
        validators: [Validators.required, Validators.email]
      })
    });
  }

  onSubmit() {
    this.userSubmitted = true;
    this.serverError = false;
    if (this.resetPWForm.valid) {
      this.authService.resetPassword(this.Email.value)
        .then(() => {
          this.router.navigate(['/login'])
        })
        .catch((error) => {
          //console.log('in error');
          this.serverError = true;
          this.serverErrorMessage = error.message;
        });;
    }
  }

  // resetPassword() {
  //   return this.auth.resetPassword(this.email)
  //   .then(() => this.router.navigate(['/login']))
  // }

  public get Email() {
    return this.resetPWForm.get("email");
  }
}
