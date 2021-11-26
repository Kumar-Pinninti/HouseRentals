import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { UsersRoutingModule } from './users-routing.module';
import { UserComponent } from './user/user.component';
import { AddimageComponent } from './addimage/addimage.component';
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';
import { CreateadsComponent } from './createads/createads.component';
import { DetailAdsComponent } from './detail-ads/detail-ads.component';
import { EditAdsComponent } from './edit-ads/edit-ads.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';


@NgModule({
  declarations: [
    UserComponent,
    AddimageComponent,
    SignupComponent,
    SigninComponent,
    CreateadsComponent,
    DetailAdsComponent,
    EditAdsComponent,
    EditProfileComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    UsersRoutingModule
  ],
  schemas: [ NO_ERRORS_SCHEMA ],
})
export class UsersModule { }
