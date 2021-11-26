import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Login } from '../models/login';
import { Register } from '../models/register';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  hide = true;
  hide1 = true;
  public Register!: FormGroup;
  public name!: FormControl;
  public email!: FormControl;
  public password!: FormControl;
  public confirmPassword!: FormControl;
  register!: Register;
  login!: Login;

  private createFormGroup(): void {
    this.Register = new  FormGroup( {
      name: this.name,
      email: this.email,
      password: this.password,
      confirmPassword: this.confirmPassword
    });
  }

  private createFormControls(): void {
    this.name = new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(30)
    ]);
    this.email = new FormControl('', [
      Validators.required,
      Validators.email,
      Validators.minLength(6),
      Validators.maxLength(60)
    ]);
    this.password = new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(30)
    ]);
    this.confirmPassword = new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(100)
    ]);
  }

  constructor(private _userService: UserService, private router: Router) { }

  ngOnInit() {
    this.createFormControls();
    this.createFormGroup();
  }

  onSubmit(form: any) {

    this.register = new Register();

    this.register.userName = form.eun;
    this.register.userEmail = form.email;
    this.register.userPassword = form.password;
    this.register.userConfirmPassword = form.ecp;

    this.login = new Login();
    this.login.userEmail = form.email;
    this.login.userPassword = form.password;

    this._userService.userRegister(this.register)
    .subscribe(data => {
      console.log(data);
      this._userService.userLogin(this.login)
    .subscribe(loginData => {
      console.log(loginData);
      this.router.navigate(['/user']);
    },
    err => {
      console.log(err);
    });
    },
    err => {
      console.log(err);
    });
  }

}
