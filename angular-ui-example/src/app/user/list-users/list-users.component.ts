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

  isSearch = false;

  options = ["Username", "Firstname", "Lastname", "Email"];
  selected = 'Username';
  findValue = '';
  findUsers: User[] = [];

  constructor(private route: ActivatedRoute,
              private router: Router,
              private service: UserService) {
               }

  ngOnInit(): void {
    this.service.getAllUsers().subscribe((res) => {
      res.forEach(value => {
        if (value.username != 'admin' && value.username != sessionStorage.getItem('user')) {
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

  goFirstPage() {
    this.config.currentPage = 1;
    this.isSearch = true;
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

  search() {
    if (this.findValue === '') {
      console.log('Find value is nothing');
      console.log(this.users);
      this.service.getAllUsers().subscribe((res) => {
        res.forEach(value => {
          if (value.username != 'admin' && value.username != sessionStorage.getItem('user')) {
            this.findUsers.push(value);
          }
        });
      });
      this.isSearch = false;
    }
    else {
      this.findUsers.length = 0;
      console.log(this.selected);
      console.log(this.findValue);
      this.service.getUserBy(this.selected, this.findValue)
        .subscribe((res) => {
          res.forEach((value) => {
            if (value.username !== 'admin' && value.username !== sessionStorage.getItem('user')) {
              this.findUsers.push(value);
            }
          });
          console.log(this.findUsers);
        }, (err) => {
          console.log(err);
        })
    }
  }

  reloadPage() {
    window.location.reload();
  }

}
