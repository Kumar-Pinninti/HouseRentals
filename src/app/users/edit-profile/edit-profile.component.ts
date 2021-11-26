import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Login } from '../models/login';
import { Register } from '../models/register';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  hide = true;
  hide1 = true;
  public Register!: FormGroup;
  public name!: FormControl;
  public email!: FormControl;
  public password!: FormControl;
  public confirmPassword!: FormControl;
  register!: Register;
  public login!: Login;
  public userID!: string;

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
      Validators.maxLength(30)
    ]);
  }

  constructor(private _userService: UserService, private router: Router, private activeRoute: ActivatedRoute) { }

  ngOnInit() {
    this.createFormControls();
    this.createFormGroup();
    this.getUserID();
    this.getUserInfo(this.userID);
    this.setFormControlvalue();
  }

  onSubmit(form: any) {

    this.register = new Register();

    this.register.userName = form.eun;
    this.register.userEmail = form.email;
    this.register.userPassword = form.password;
    this.register.userConfirmPassword = form.ecp;

    this._userService.updateUser(this.userID, this.register)
    .subscribe(data => {
      console.log(data);
      this.router.navigate(['user']);
    },
    err => {
      console.log(err);
    });
  }

  private getUserInfo(id: string) {
    this._userService._getUserInfo(id).subscribe(data => {
      this.register = data;
      this.setFormControlvalue();
    },
    err => {
      console.log(err);
    }
    );
  }

  private setFormControlvalue() {
    this.name.setValue(this.register.userName);
    this.email.setValue(this.register.userEmail);
  }

  private getUserID() {
    this.activeRoute.params.subscribe(param => {
      this.userID = param['id'];
      console.log(this.userID);
    },
    err => {
      console.log(err);
    });
  }

}
