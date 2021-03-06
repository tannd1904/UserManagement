import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  username : string = '';
  user!: User;

  constructor(private userService: UserService) {
    this.username = <string>sessionStorage.getItem('user');
    if (sessionStorage.getItem('user') != null) {
      this.userService.getUserByUsername(this.username)
      .subscribe((res) => {
        this.user = res;
      });
    }
   }

  ngOnInit(): void {
    
  }

}
