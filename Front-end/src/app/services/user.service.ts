import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { USER_LOGIN_URL, USER_SIGNUP_URL } from '../shared/Links/urls';
import { IUserLogin } from '../shared/interfaces/IUserLogin';
import { User } from '../shared/Models/User';
import { IUserRegister } from '../shared/interfaces/IUserRegister';
import { AuthService } from './auth.service';

const USER_KEY = 'User';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userSubject = new BehaviorSubject<User>(
    this.getUserFromLocalStorage()
  );

  public userObservable: Observable<User>;
  constructor(private http: HttpClient, 
    private toastrService: ToastrService,
    private authService : AuthService
    
    ) {
    this.userObservable = this.userSubject.asObservable();
  }

  login(userLogin: IUserLogin): Observable<User> {
    return this.http.post<User>(USER_LOGIN_URL, userLogin).pipe(
      tap({
        next: (user) => {
          this.setUserToLocalStorage(user);
          this.userSubject.next(user);
          this.toastrService.success(
            `Welcome to Products Section ${user.firstName + user.lastName}!`,
            'Login Successful'
          );
        },
        error: (errorResponse) => {
          this.toastrService.error(errorResponse.error, 'Login Failed');
        },
      })
    );
  }

  signUp(userRegister: any) {
    const postData = userRegister;
    console.log('hello', postData);

    return this.http
      .post<User>(USER_SIGNUP_URL, postData)
      .pipe(
        tap({
          next: (user) => {
            this.setUserToLocalStorage(user);
            this.userSubject.next(user);
            this.toastrService.success(
              `Welcome to the Products ${user.firstName + user.lastName}`,
              'SignUp Successful'
            );
          },
          error: (errorResponse) => {
            this.toastrService.error(errorResponse.error, 'SignUp Failed');
          },
        })
      )
      
  }
  logout() {
    this.userSubject.next(new User());
    localStorage.removeItem(USER_KEY);
    window.location.reload();
  }

  private setUserToLocalStorage(user: User) {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  private getUserFromLocalStorage(): User {
    const userJson = localStorage.getItem(USER_KEY);
    if (userJson) return JSON.parse(userJson) as User;
    return new User();
  }
}
