import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';

import { AuthGuardService } from '../auth/auth-guard.service';

import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminProfileComponent } from './admin-profile/admin-profile.component';
import { AreaComponent } from './area/area.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DivisionComponent } from './division/division.component';
import { LocationComponent } from './location/location.component';
import { MoneyComponent } from './money/money.component';
import { RoomComponent } from './room/room.component';
import { UpdateAdminProfileComponent } from './update-admin-profile/update-admin-profile.component';
import { RoleGuardService } from '../auth/role-guard.service';

const routes: Routes = [
  {path: 'admin-login', component: AdminLoginComponent},
  {path: 'admindash', component: DashboardComponent, canActivate: [AuthGuardService, RoleGuardService], data: { expectedRole: 'Admin'}, children: [
    {path: 'adminprofile',component: AdminProfileComponent},
    
    {path: 'division', component: DivisionComponent},
    {path: 'location', component: LocationComponent},
    {path: 'area', component: AreaComponent},
    {path: 'money', component: MoneyComponent},
    {path: 'room', component: RoomComponent}
  ]},
  {path: 'adminUpdate/:id',component: UpdateAdminProfileComponent , canActivate: [AuthGuardService, RoleGuardService], data: { expectedRole: 'Admin'}},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminsRoutingModule { }
