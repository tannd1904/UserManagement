import { first, map } from 'rxjs/operators';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {UserService} from '../service/user.service';
import {AuthService} from '../service/auth.service';
import {User} from '../model/user';
import {Observable} from 'rxjs';
import { ILogin } from '../model/ilogin';
import { HttpHeaders, HttpRequest } from '@angular/common/http';
import {sha256} from 'js-sha256'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @Output() userLoginEvent = new EventEmitter<User>();
  userLogin!: User;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private authService: AuthService,
              private userService: UserService) {
               }

  users: User[] = [];

  user = {
    username: '', 
    password: ''
  }


  loginForm!: FormGroup;
  invalid = false;
  returnUrl!: string;
  submitted = false;

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.returnUrl = 'dashboard/profile';
    
  }

  get f() {
    return this.loginForm.controls;
  }

  login() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    else if (this.loginForm.valid) {
      console.log('123');
      console.log(localStorage.getItem('token'));

      this.authService.authenticate(this.f.username.value, this.encode(this.f.password.value))
        .subscribe((response) => {
          console.log('ppp');
          localStorage.setItem('token', response.trim());
          
          this.userService.getUserByUsername(this.f.username.value)
            .subscribe((res) => {
              console.log('ooo');
              this.user.username = res.username;
              this.user.password = res.password;

              if (this.user != null) {
                if (this.f.username.value == this.user.username && this.encode(this.f.password.value) == this.user.password) {
                  console.log('Login successful');
                  localStorage.setItem('user', this.f.username.value);
                  this.authService.username = this.f.username.value;
                  localStorage.setItem('isLoggedIn', 'true');
                  console.log(localStorage.getItem('isLoggedIn'));
                  this.router.navigate([this.returnUrl]);
                  this.userLoginEvent.emit(this.userLogin);
                }
                else {
                  this.invalid = true;
                }
              }
            }, (err) => {
              if (err.status == 404) {
                console.log('iii');
                this.invalid = true;
              }
            })
        }, (error) => {
          console.log('uuu');
          if (error.status == 404) {
            this.invalid = true;
          }
        })
      
    }
  }

  encode(password: string) {
    return sha256(password);
  }

  cancelSubmit() {
    this.invalid = false;
  }


}
