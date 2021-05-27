import { User } from 'src/app/model/user';
import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { AuthService } from './service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'User Management';
  userLogin!: User;

  constructor(private authService: AuthService) {
   }

  ngOnInit(): void {
  }
}
