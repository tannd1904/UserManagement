import { ProfileComponent } from './user/profile/profile.component';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import {SectionMainComponent} from './section-main/section-main.component';
import { RegisterComponent} from './register/register.component';
import { AuthGuard } from './guard/auth.guard';
import { User } from './model/user';
import { UserRoutingModule } from './user/user-routing.module';

const routes: Routes = [
  {path: '', component: SectionMainComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: '', redirectTo: '/dashboard', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {enableTracing: true}), 
      UserRoutingModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
