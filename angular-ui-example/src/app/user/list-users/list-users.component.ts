import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../service/user.service';
import {User} from '../../model/user';
import {MatPaginator} from '@angular/material'

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent implements OnInit {

  users: User[] = [];

  config: any;
  collection = {count: 60, data: []};

  clickedDelete = false;
  username: string = '';

  filter: any;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private service: UserService) {
               }

  ngOnInit(): void {
    this.service.getAllUsers().subscribe((res) => {
      res.forEach(value => {
        if (value.username != 'admin' && value.username != localStorage.getItem('user')) {
          this.users.push(value);
        }
      });
    });
    
    this.config = {
      itemsPerPage: 5,
      currentPage: 1,
      totalItems: this.users.length
    };

  }

  pageChanged(event: any) {
    this.config.currentPage = event;
  }

  clickedDeleteBtn(username: string) {
    this.clickedDelete = true;
    this.username = username;
  }

  cancelBtnClick() {
    this.clickedDelete = false;
  }

  deleteUser(username: string) {
    this.clickedDelete = true;
    this.service.deleteUser(username)
      .subscribe(
        (        response: any) => {
          console.log(response);
          //this.reloadPage();
        },
        (        error: any) => {
          console.log(error);
        });
    this.reloadPage();
  }

  reloadPage() {
    window.location.reload();
  }

}
