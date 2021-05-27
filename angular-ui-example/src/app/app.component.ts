import { User } from 'src/app/model/user';
import { DoCheck, OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { AuthService } from './service/auth.service';
import { UserService } from './service/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, DoCheck {
  title = 'User Management';
  userLogin!: User;

  constructor(private userService: UserService) {
  }

  ngDoCheck(): void {
    // this.userService.getUserByUsername(<string>localStorage.getItem('user'))
    //   .subscribe((res) => {
    //     this.userLogin = res;
    //     console.log(this.userLogin);
    //   }, (err) => {
    //     console.log('error!!!');
    //   })
  }

  ngOnInit(): void {
  }
}
