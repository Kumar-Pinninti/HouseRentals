import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserGuardService {

  jwtHelper = new JwtHelperService();
  roleMatch!: boolean;

  constructor(public auth: AuthService, public router: Router) { }

  canActivate(route: ActivatedRouteSnapshot): boolean
  {
      const expectedRole = route.data.expectedRole;

      if (this.auth.isTokenExit()) {
        this.router.navigate(['login']);
          return false;
      }
      const token = localStorage.getItem('token') || '{}';

      const tokenPayload = this.jwtHelper.decodeToken(token);
      this.roleMatch = false;
      if (tokenPayload.userRoll === expectedRole) {
        this.roleMatch = true;
      }
      if (!this.auth.isAuthenticated() || !this.roleMatch) {
          this.router.navigate(['login']);
          return false;
      }

      return true;
  }
}
