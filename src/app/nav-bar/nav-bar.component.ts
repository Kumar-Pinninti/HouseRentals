import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AccountService } from '../admins/service/account.service';
import { AuthService } from '../auth/auth.service';
import { CommonService } from '../auth/common.service';
import { RoleGuardService } from '../auth/role-guard.service';
import { UserGuardService } from '../auth/user-guard.service';
import { UserService } from '../users/services/user.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  jwtHelper = new JwtHelperService();
  public userID!: string;
  public adminID!: string;
  public userName!: string;
  public adminName!: string;

  constructor(
    private _userService: UserService,
    public _authService: AuthService,
    public _rollGuardService: RoleGuardService,
    public _userGuardService: UserGuardService,
    private _accountService: AccountService,
    public _commonService: CommonService
    ) { }

  ngOnInit() {
    this.getUserID();
  }

  public getUserID() {
    const token = localStorage.getItem('token') || '{}';
    const tokenPayload = this.jwtHelper.decodeToken(token);
    this.userID = tokenPayload.userID;
    return this.userID;
  }

  public getAdminID() {
    const token = localStorage.getItem('token') || '{}';
    const tokenPayload = this.jwtHelper.decodeToken(token);
    this.adminID = tokenPayload.adminID;
    console.log(this.adminID)
    return this.adminID;
  }

  getName() {
    const token = localStorage.getItem('token') || '{}';
    const tokenPayload = this.jwtHelper.decodeToken(token);
    return this.userName = tokenPayload.userName;
  }

  getAdminName() {
    const token = localStorage.getItem('token') || '{}';
    const tokenPayload = this.jwtHelper.decodeToken(token);
    return this.adminName = tokenPayload.adminName;
  }

  loggedOut() {
    this._userService.loggedOut();
  }

  adminLoggedOut() {
    this._accountService.loggedOut();
  }

}
