import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Division } from '../models/division';
import { DivisonService } from '../service/divison.service';

@Component({
  selector: 'app-division',
  templateUrl: './division.component.html',
  styleUrls: ['./division.component.css']
})
export class DivisionComponent implements OnInit {

  public Division!: FormGroup;
  public division!: FormControl;
  _division!: Division;
  public getDivisionNumber!: Division[];

  private createdivisionForm(): void {
    this.Division = new FormGroup( {
      division: this.division
    });
  }

  private divisionFormControls(): void {
    this.division = new FormControl('', [
      Validators.required,
      Validators.min(0),
      Validators.max(100),
      Validators.pattern('[0-9]*')
    ]);
  }

  constructor(private _divisionService: DivisonService, private router: Router) { }

  ngOnInit() {
    this.divisionFormControls();
    this.createdivisionForm();
    this.getdivision();
  }

  onSubmitAddDivision(form: any) {
    console.log(form);

    this._division = new Division();
    console.log(this._division);

    this._division.divisionName = form.division;
    console.log(this._division.divisionName)

    this._divisionService._addDivision(this._division)
    .subscribe(data => {
      console.log(data);
      this.getdivision();
    },
    err => {
      console.log(err);
    });
  }

  private getdivision() {
    this._divisionService._getDivision()
    .subscribe(data => {
      console.log(data);
      this.getDivisionNumber = data;
    },
    err => {
      console.log(err);
    });
  }

  deletedivision(ID: string) {
    this._divisionService._deleteDivision(ID)
    .subscribe(data => {
      console.log(data);
      this.getdivision();
    },
    err => {
      console.log(err);
    });
  }

}
