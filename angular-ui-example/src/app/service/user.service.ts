import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {User} from '../model/user';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { 
                }


  getAllUsers() {
    return this.http.get<User[]>('http://localhost:8080/api/users');
  }

  getUserByUsername(username: string) {
    return this.http.get<User>('http://localhost:8080/api/user/' + username);
  }

  createUser(user: User) {
    
      return this.http.post<string>('http://localhost:8080/api/user', user);
  }



  updateUser(username: string, user: User) {
    return this.http.put<User>('http://localhost:8080/api/user/' + username, user);
  }

  deleteUser(username: string) {
    console.log('lll');
    console.log('http://localhost:8080/api/user/' + username);
    return this.http.delete('http://localhost:8080/api/user/' + username);
  }

  getUserBy(field: string, value: string) {
    console.log('http://localhost:8080/api/get-user-by/' + field + '/' + value);
    return this.http.get<User[]>('http://localhost:8080/api/get-user-by/' + field + '/' + value);
  }
}
