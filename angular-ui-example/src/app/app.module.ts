import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListUsersComponent } from './user/list-users/list-users.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {UserService} from './service/user.service';
import { LoginComponent } from './login/login.component';
import { SectionMainComponent } from './section-main/section-main.component';
import {AuthGuard} from './guard/auth.guard';
import { HeaderComponent } from './header/header.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { BasicAuthInterceptor } from './interceptor/basic-auth.interceptor';
import { RegisterComponent } from './register/register.component';
import {MatPaginator, MatPaginatorModule} from '@angular/material'
import { RouterModule } from '@angular/router';
import {NgxPaginationModule} from 'ngx-pagination';
import {Ng2SearchPipeModule} from 'ng2-search-filter';
import { UserComponent } from './user/user.component';
import { UserModule } from './user/user.module';
import { AuthService } from './service/auth.service';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SectionMainComponent,
    HeaderComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    UserModule
  ],
  providers: [UserService, AuthService, AuthGuard,
    {provide: HTTP_INTERCEPTORS, useClass: BasicAuthInterceptor, multi: true}
    ],
  bootstrap: [AppComponent]

})
export class AppModule { }
