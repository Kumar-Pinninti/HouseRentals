import { Admins } from './../models/admin';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AdminRegister } from '../models/admin-register';
import { AdminLogin } from '../models/admin-login';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http: HttpClient, private router: Router) { }

  _adminRegister(_register: AdminRegister) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.post('http://localhost:3000/admin/register', _register, httpOptions);
  }

  _adminLogin(_login: AdminLogin) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    console.log("this",_login, httpOptions)
    return this.http.post('http://localhost:3000/admin/login', _login, httpOptions);
  }

  _getAllAdmin(): Observable<AdminRegister[]> {
    return this.http.get<AdminRegister[]>('http://localhost:3000/admin/all');
  }

  _deleteAdmin(id: string) {
    return this.http.delete(`http://localhost:3000/admin/delete/${id}`);
  }

  setToken(auth: any) {
    console.log("token",auth.token)
    localStorage.setItem('token', auth.token);
  }

  _getAdminInfo(id: string): Observable<Admins> {
    return this.http.get<Admins>(`http://localhost:3000/admin/${id}`);
  }

  updateAdmin(id: string, register: AdminRegister) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.patch(`http://localhost:3000/admin/update/${id}`, register, httpOptions);
  }

  loggedOut() {
    localStorage.removeItem('token');
    this.router.navigate(['/']);
  }
}
