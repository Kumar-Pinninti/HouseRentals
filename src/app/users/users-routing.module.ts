import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserGuardService } from '../auth/user-guard.service';
import { AddimageComponent } from './addimage/addimage.component';
import { CreateadsComponent } from './createads/createads.component';
import { DetailAdsComponent } from './detail-ads/detail-ads.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  {path: 'register', component: SignupComponent},
  {path: 'login', component: SigninComponent},
  {path: 'user', component: UserComponent, canActivate: [UserGuardService], data: { expectedRole: 'User' }},
  {path: 'edit/:id', component: EditProfileComponent, canActivate: [UserGuardService], data: { expectedRole: 'User'}},
  {path: 'createads', component: CreateadsComponent, canActivate: [UserGuardService], data: { expectedRole: 'User'}},
  {path: 'addimage/:id',component: AddimageComponent, canActivate: [UserGuardService], data: { expectedRole: 'User'}},
  {path: 'detail/:id', component: DetailAdsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
