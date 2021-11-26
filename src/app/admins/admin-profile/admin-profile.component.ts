import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from '../service/account.service';
import { AdminRegister } from '../models/admin-register';

@Component({
  selector: 'app-admin-profile',
  templateUrl: './admin-profile.component.html',
  styleUrls: ['./admin-profile.component.css']
})
export class AdminProfileComponent implements OnInit {

  
  hide = true;
  hide1 = true;
  public Register!: FormGroup;
  public adminName!: FormControl;
  public adminEmail!: FormControl;
  public adminPassword!: FormControl;
  public adminConfirmPassword!: FormControl;
  register!: AdminRegister;
  public adminList!: AdminRegister[];
  public len!: number;

  private createFormGroup(): void {
    this.Register = new  FormGroup( {
      adminName: this.adminName,
      adminEmail: this.adminEmail,
      adminPassword: this.adminPassword,
      adminConfirmPassword: this.adminConfirmPassword
    });
  }

  private createFormControls(): void {
    this.adminName = new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(30)
    ]);
    this.adminEmail = new FormControl('', [
      Validators.required,
      Validators.email,
      Validators.minLength(6),
      Validators.maxLength(60)
    ]);
    this.adminPassword = new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(100)
    ]);
    this.adminConfirmPassword = new FormControl('', [
      Validators.required
    ]);
  }

  constructor(private _accountService: AccountService, private router: Router) { }

  ngOnInit() {
    // this.createFormControls();
    // this.createFormGroup();
    this.getAllAdmin();
  }

  onSubmit(form: any) {
    console.log(form)
    this.register = new AdminRegister();
    console.log(this.register)
    this.register.adminName = form.eun;
    this.register.adminEmail = form.email;
    this.register.adminPassword = form.password;
    this.register.adminConfirmPassword = form.ecp;
    console.log("all", this.register.adminName, this.register.adminEmail)
    this._accountService._adminRegister(this.register)
    .subscribe(data => {
      console.log(data);
      this.router.navigate(['admindah']);
    },
    error => {
      console.error(error);
    }
    );
  }

  private getAllAdmin() {
    this._accountService._getAllAdmin()
    .subscribe(data => {
      this.adminList = data;
      this.len = this.adminList.length;
      console.log(this.adminList);
    },
    err => {
      console.log(err);
    }
      );
  }

  deleteAdmin(ID: any) {
    this._accountService._deleteAdmin(ID)
    .subscribe(data => {
      this.getAllAdmin();
    },
    err => {
      console.log(err);
    });
  }

}