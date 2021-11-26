import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminLogin } from '../models/admin-login';
import { AccountService } from '../service/account.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {

  hide = true;
  public loginForm!: FormGroup;
  public email!: FormControl;
  public password!: FormControl;
  login!: AdminLogin;

  private createForm(): void {
    this.loginForm = new FormGroup( {
      email: this.email,
      password: this.password
    });
  }
  private CreateFormControls(): void {
    this.email = new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(60),
      Validators.email
    ]);
    this.password = new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(100)
    ]);
  }
  constructor(private _accountService: AccountService, private router: Router) { }

  ngOnInit() {
    this.CreateFormControls();
    this.createForm();
  }

  loginAccess(form: any){
    console.log(form.email);

    this.login = new AdminLogin();
    console.log(this.login);

    this.login.adminEmail = form.email;
    this.login.adminPassword = form.password;
    console.log(this.login.adminEmail, this.login.adminPassword);

    this._accountService._adminLogin(this.login)
    .subscribe(data => {
      console.log("this",data);
      
      this._accountService.setToken(data);
      this.router.navigate(['admindash']);
      },
      err => {
        console.log(err);
      });
  }


}
