import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminsRoutingModule } from './admins-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminProfileComponent } from './admin-profile/admin-profile.component';
import { AreaComponent } from './area/area.component';
import { DivisionComponent } from './division/division.component';
import { LocationComponent } from './location/location.component';
import { MoneyComponent } from './money/money.component';
import { RoomComponent } from './room/room.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { UpdateAdminProfileComponent } from './update-admin-profile/update-admin-profile.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    DashboardComponent,
    AdminLoginComponent,
    AdminProfileComponent,
    AreaComponent,
    DivisionComponent,
    LocationComponent,
    MoneyComponent,
    RoomComponent,
    SidebarComponent,
    UpdateAdminProfileComponent
  ],
  imports: [
    CommonModule,
    AdminsRoutingModule,
    FormsModule
  ]
})
export class AdminsModule { }
