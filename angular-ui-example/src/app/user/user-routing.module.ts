import { ListUsersComponent } from './list-users/list-users.component';
import { UserComponent } from './user.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { AuthGuard } from '../guard/auth.guard';
import { EditUserComponent } from './edit-user/edit-user.component';

const routes: Routes = [
  {path: 'dashboard', component: UserComponent, canActivate: [AuthGuard],
    children: [
      {path: 'list-users', component: ListUsersComponent, canActivate: [AuthGuard]}, 
      {path: 'edit-user', component: EditUserComponent, canActivate: [AuthGuard]},
      {path: 'profile/:username', component: ProfileComponent, canActivate: [AuthGuard] },
      {path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
