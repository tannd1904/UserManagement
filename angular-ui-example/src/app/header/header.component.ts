import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  
  username: string | null = null;

  constructor(public loginService: AuthService) {   }

  ngOnInit(): void {
    this.username = this.loginService.username;
  }

  logOut(): void {
    this.loginService.logOut();
  }

}
