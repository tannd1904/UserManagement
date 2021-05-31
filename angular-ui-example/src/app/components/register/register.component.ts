import { ConfirmPasswordValidator } from 'src/app/validators/confirm-password.validator';
import { UserService } from './../../service/user.service';
import { AuthService } from './../../service/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form!: FormGroup;
  submitted = false;
  message: string[] = [];
  isSignedUp = false;
  loading = false;
  hasError = false;

  constructor(private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private authService: AuthService,
              private userService: UserService) { }

  ngOnInit(): void {

    this.form = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(50)]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(50)]],
      repeatpassword: ['', Validators.required],
      firstname: ['', [Validators.required, Validators.maxLength(15)]],
      lastname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(200)]]
    }, {
      validator: ConfirmPasswordValidator('password', 'repeatpassword')
    })
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
    
    this.loading = true;
    this.authService.authenticate('admin', '8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918')
      .subscribe((response) => {
        localStorage.setItem('token', response.trim());

        this.userService.createUser(this.form.value)
          .pipe(first())
          .subscribe(data => {
            console.log('data worked');
            this.isSignedUp = true;
            this.loading = false;
          }, error => {
            if (error.status === 200) {
              console.log('error worked');
              this.isSignedUp = true;
              this.loading = false;
            }
            else {
              this.message = error.error.errors;
              console.log(this.message);
              this.hasError = true;
              this.loading = false;
            }
          })
      }, (err) => {
        this.message = err.error.errors;
        console.log(this.message);
        this.hasError = true;
        this.loading = false;
      })
    
  }

}
