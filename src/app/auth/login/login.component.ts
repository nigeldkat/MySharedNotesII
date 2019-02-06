import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service'; 

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  isLoading: boolean = false;
  userSubmitted: boolean = false;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl('', {
        validators: [Validators.required, Validators.email]
      }),
      password: new FormControl('', { validators: [Validators.required] })
    });
  }

  onSubmit(){
    this.userSubmitted = true;
    alert('clicked submit');
    this.authService.login(this.Email.value, this.Password.value);
  } 


  public get Email(){
    return this.loginForm.get("email");
  }

  public get Password(){
    return this.loginForm.get("password");
  }

}
