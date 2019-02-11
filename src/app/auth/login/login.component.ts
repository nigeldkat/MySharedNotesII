import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service'; 
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  loginForm: FormGroup;
  isLoading: boolean = false;
  userSubmitted: boolean = false;
  serverError: boolean = false;
  serverErrorMessage: string;
  authSubscription: Subscription;

  constructor(private authService: AuthService , private router: Router) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl('', {
        validators: [Validators.required, Validators.email]
      }),
      password: new FormControl('', { validators: [Validators.required] })
    });

    this.authSubscription = this.authService.authChange.subscribe(authStatus => {
      if(authStatus == true){
        this.router.navigate(['/notelist']);
      }
    })
  }

  ngOnDestroy(){  
    if(this.authSubscription){
      this.authSubscription.unsubscribe();
    }
  }

  onSubmit(){
    this.userSubmitted = true;
    this.serverError = false;
    if(this.loginForm.valid){
      this.authService.login(this.Email.value, this.Password.value).then(()=>{}).catch((error) => {        
        this.serverError = true;
        this.serverErrorMessage = error.message;
      });;
    }
  } 


  public get Email(){
    return this.loginForm.get("email");
  }

  public get Password(){
    return this.loginForm.get("password");
  }

}
