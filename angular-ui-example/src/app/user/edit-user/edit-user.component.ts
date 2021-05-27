import { UserService } from './../../service/user.service';
import { AuthService } from './../../service/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ConfirmPasswordValidator } from 'src/app/validators/confirm-password.validator';
import { User } from 'src/app/model/user';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  form!: FormGroup;
  submitted = false;
  user!: User;
  hasError = false;
  message: string[] = [];
  isSuccess = false;

  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private userService: UserService) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      username: [''],
      password: [''],
      firstname: ['', [Validators.required, Validators.maxLength(15)]],
      lastname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(200)]]
    })

    this.userService.getUserByUsername(<string>localStorage.getItem('user'))
      .subscribe((res) => {
        this.user = res;
      });
  }

  get f() {
    return this.form.controls;
  }

  cancelSubmit() {
    this.hasError = false;
  }

  onSubmit() {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    this.userService.getUserByUsername(<string>localStorage.getItem('user'))
      .subscribe((res) => {
        this.user = res;
      });
    this.user.firstname = this.f.firstname.value;
    this.user.lastname = this.f.lastname.value;
    this.user.email = this.f.email.value;
    console.log(this.user);
    this.userService.updateUser(this.user.username, this.user)
      .subscribe((res) => {
        console.log(res);
        this.isSuccess = true;
      }, (err) => {
        if (err.status === 404) {
          this.message = err.error.errors;
              console.log(this.message);
              this.hasError = true;
        }
      })
  }

}
