import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  responseData:any
  loginForm!:FormGroup;
  isSubmitted = false;
  returnUrl = '';

  constructor(private formBuilder: FormBuilder,
      private userService:UserService,
      private activatedRoute:ActivatedRoute,
      private authService : AuthService,
      private router:Router) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email:['', [Validators.required,Validators.email]],
      password:['', Validators.required]
    });

    this.returnUrl = this.activatedRoute.snapshot.queryParams.returnUrl;
  }

  get fc(){
    return this.loginForm.controls;
  }

  submit(){
    this.isSubmitted = true;
    if(this.loginForm.invalid) return;

   

     this.userService.login({email:this.fc.email.value,
        password:this.fc.password.value}).subscribe((resposne)=> {
          this.responseData = resposne
          console.log(resposne)
          if(this.responseData){
            const user = this.responseData.dbUser
    
            const token = this.responseData.token
    
            this.authService.setAuthData(user,token)
            console.log(this.authService.getAuthToken())
            this.router.navigateByUrl(this.returnUrl);
          }
          window.location.replace("/");
          
        });

     
  }

}