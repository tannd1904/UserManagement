import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './user/profile/profile.component';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {SectionMainComponent} from './components/section-main/section-main.component';
import { RegisterComponent} from './components/register/register.component';
import { AuthGuard } from './guard/auth.guard';
import { User } from './model/user';
import { UserRoutingModule } from './user/user-routing.module';
import {PagenotfoundComponent} from "./components/pagenotfound/pagenotfound.component";

const routes: Routes = [
  {path: '', component: SectionMainComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: '**', component: PagenotfoundComponent},
  {path: '', redirectTo: '/dashboard', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {enableTracing: true}),
      UserRoutingModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
