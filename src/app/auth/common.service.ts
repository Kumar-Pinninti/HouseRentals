import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  jwtHelper = new JwtHelperService();
  

  constructor(public auth: AuthService) { }

  isAuthenticated() {
    if (!this.auth.isAuthenticated()) {
      return false;
    }
    return true;
  }

  isUser() {
    const token = localStorage.getItem('token') || '{}';

    const tokenPayload = this.jwtHelper.decodeToken(token);

    if (!this.auth.isAuthenticated() || tokenPayload.userRoll !== 'User') {
      return false;
    }

    return true;
  }

  isAdmin() {
    const token = localStorage.getItem('token') || '{}';

    const tokenPayload = this.jwtHelper.decodeToken(token);

    if (!this.auth.isAuthenticated() || tokenPayload.roll !== 'Admin') {
      return false;
    }

    return true;
  }
}
