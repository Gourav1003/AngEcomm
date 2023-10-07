import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { IUserRegister } from 'src/app/shared/interfaces/IUserRegister';
import { PasswordsMatchValidator } from 'src/app/shared/passwordValidator';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-register-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.css']
})
export class SignupPageComponent implements OnInit {
  responseData:any
  registerForm!:FormGroup;
  isSubmitted = false;

  returnUrl = '';
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private authService : AuthService
  ) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName:[''],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    },{
      validators: PasswordsMatchValidator('password','confirmPassword')
    });

    this.returnUrl= this.activatedRoute.snapshot.queryParams.returnUrl;
  }

  get fc() {
    return this.registerForm.controls;
  }

  submit(){
    this.isSubmitted = true;
    if(this.registerForm.invalid) return;

    const fv= this.registerForm.value;
    const user :IUserRegister = {
      firstName: fv.firstName,
      lastName:fv.lastName,
      email: fv.email,
      password: fv.password,
      confirmPassword: fv.confirmPassword
    };

    this.userService.signUp(user).subscribe((resposne)=> {
      this.responseData = resposne
      console.log(resposne)
      if(this.responseData){
        const user = this.responseData.dbUser

        const token = this.responseData.token

        this.authService.setAuthData(user,token)
        console.log(this.authService.getAuthToken())
        this.router.navigateByUrl(this.returnUrl);
        window.location.replace("/");
      }
      
    })
    
  }

}