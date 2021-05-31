import { User } from './../model/user';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of, throwError, Observable, BehaviorSubject } from 'rxjs';
import {catchError} from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public str: string = '';
  loginUser = {
    username: '',
    password: ''
  }

  username = '';
  private userSubject: BehaviorSubject<User>;
  public user: Observable<User>;

  constructor(private http: HttpClient, 
              private router: Router) {
                this.userSubject = new BehaviorSubject<User>(JSON.parse(JSON.stringify(sessionStorage.getItem('user'))));
                this.user = this.userSubject.asObservable();
               }

  public get userValue(): User {
    return this.userSubject.value;
  }

  authenticate(username: string, password: string) {
    this.loginUser.username = username;
    this.loginUser.password = password;
    return this.http.post<String>('http://localhost:8080/authenticate', JSON.parse(JSON.stringify(this.loginUser)),
                    {responseType: 'text' as 'json'});
  }

  logOut() {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('userToken');
    sessionStorage.removeItem('isLoggedIn');
    sessionStorage.removeItem('user');
  }

  isLoggedIn() {
    if (sessionStorage.getItem('isLoggedIn') == 'true') {
      return true;
    }
    else {
      return false;
    }
  }


}  
