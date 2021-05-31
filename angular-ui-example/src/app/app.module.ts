import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {UserService} from './service/user.service';
import { LoginComponent } from './components/login/login.component';
import { SectionMainComponent } from './components/section-main/section-main.component';
import {AuthGuard} from './guard/auth.guard';
import { HeaderComponent } from './header/header.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { BasicAuthInterceptor } from './interceptor/basic-auth.interceptor';
import { RegisterComponent } from './components/register/register.component';
import { RouterModule } from '@angular/router';
import {NgxPaginationModule} from 'ngx-pagination';
import {Ng2SearchPipeModule} from 'ng2-search-filter';
import { UserComponent } from './user/user.component';
import { UserModule } from './user/user.module';
import { AuthService } from './service/auth.service';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SectionMainComponent,
    HeaderComponent,
    RegisterComponent,
    PagenotfoundComponent
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
