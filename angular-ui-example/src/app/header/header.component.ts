import { AuthService } from '../service/auth.service';
import { Component, OnInit } from '@angular/core';

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
