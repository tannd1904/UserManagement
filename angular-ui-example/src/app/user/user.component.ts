import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../service/user.service';
import {RouterModule} from '@angular/router'

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  changeColor = [true, false];

  constructor(private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
  }

  changeColorFunction(index: number) {
    for (let i = 0; i <this.changeColor.length; i++) {
      if (i !== index) {
        this.changeColor[i] = false;
      }
    }
    this.changeColor[index] = true;
  }

}
