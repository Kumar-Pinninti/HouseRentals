import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  token!: string;
  tok!: boolean;

  constructor() { }

  jwtHelper = new JwtHelperService();

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('token') || '{}';
    return !this.jwtHelper.isTokenExpired(token);
  }

  public isTokenExit(): boolean {
    this.tok = false;
    this.token = localStorage.getItem('token') || '{}';
    if (this.token != null) {
      this.tok = true;
    }
    return !this.tok;
  }
}
