import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MaxMoney } from '../models/max-money';
import { MinMoney } from '../models/min-money';
import { MoneyService } from '../service/money.service';

@Component({
  selector: 'app-money',
  templateUrl: './money.component.html',
  styleUrls: ['./money.component.css']
})
export class MoneyComponent implements OnInit {

  public MinMoney!: FormGroup;
  public MaxMoney!: FormGroup;
  public minMoney!: FormControl;
  public maxMoney!: FormControl;
  _minMoney!: MinMoney;
  _maxMoney!: MaxMoney;
  public minMoneyValue!: MinMoney[];
  public maxMoneyValue!: MaxMoney[];

  private createMinMoneyForm(): void {
    this.MinMoney = new FormGroup( {
      minMoney: this.minMoney
    });
  }

  private createMaxMoneyForm(): void {
    this.MaxMoney = new FormGroup( {
      maxMoney: this.maxMoney
    });
  }

  private minMoneyFormControls(): void {
    this.minMoney = new FormControl('', [
      Validators.required,
      Validators.min(0),
      Validators.max(500000),
      Validators.pattern('[0-9]*')
    ]);
  }

  private maxMoneyFormControls(): void {
    this.maxMoney = new FormControl('', [
      Validators.required,
      Validators.min(0),
      Validators.max(500000),
      Validators.pattern('[0-9]*')
    ]);
  }

  constructor(private _moneyService: MoneyService, private router: Router) { }

  ngOnInit() {
    this.minMoneyFormControls();
    this.maxMoneyFormControls();
    this.createMinMoneyForm();
    this.createMaxMoneyForm();
    this.getMinMoney();
    this.getMaxMoney();
  }

  onSubmitMinMoney(form : any ) {
    //console.log(form)

    this._minMoney = new MinMoney();
    //console.log(this._minMoney);

    this._minMoney.minMoneyName = form.minMoney;
    //console.log(this._minMoney.minMoneyName)

    this._moneyService._addMinMoney(this._minMoney)
    .subscribe(data => {
      console.log(data);
      this.getMinMoney();
    },
    err => {
      console.log(err);
    });
  }

  onSubmitMaxMoney(obj: any) {
    console.log(obj);

    this._maxMoney = new MaxMoney();
    console.log(this._maxMoney);

    this._maxMoney.maxMoneyName = obj.maxMoney;
    console.log(this._maxMoney.maxMoneyName);

    this._moneyService._addMaxMoney(this._maxMoney)
    .subscribe(data => {
      console.log(data);
      this.getMaxMoney();
    },
    err => {
      console.log(err);
    });
  }

  private getMinMoney() {
    this._moneyService._getMinMoney()
    .subscribe(data => {
      console.log(data);
      this.minMoneyValue = data;
    },
    err => {
      console.log(err);
    });
  }

  private getMaxMoney() {
    this._moneyService._getMaxMoney()
    .subscribe(data => {
      console.log(data);
      this.maxMoneyValue = data;
    },
    err => {
      console.log(err);
    });
  }

  deleteMinMoney(ID: string) {
    this._moneyService._deleteMinMoney(ID)
    .subscribe(data => {
      console.log(data);
      this.getMinMoney();
    },
    err => {
      console.log(err);
    });
  }

  deleteMaxMoney(ID: string) {
    this._moneyService._deleteMaxMoney(ID)
    .subscribe(data => {
      console.log(data);
      this.getMaxMoney();
    },
    err => {
      console.log(err);
    });
  }

}
