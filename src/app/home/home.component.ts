import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Division } from '../admins/models/division';
import { Location } from '../admins/models/location';
import { MaxArea } from '../admins/models/max-area';
import { MaxMoney } from '../admins/models/max-money';
import { MinArea } from '../admins/models/min-area';
import { MinMoney } from '../admins/models/min-money';
import { RoomNumber } from '../admins/models/room';
import { AreaService } from '../admins/service/area.service';
import { LocationService } from '../admins/service/location.service';
import { MoneyService } from '../admins/service/money.service';
import { RoomService } from '../admins/service/room.service';
import { Search } from '../model/search';
import { HomeService } from '../service/home.service';
import { House } from '../users/models/ads';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public Search!: FormGroup;
  public district!: FormControl;
  public location!: FormControl;
  public minMoney!: FormControl;
  public maxMoney!: FormControl;
  public minArea!: FormControl;
  public maxArea!: FormControl;
  public roomNumber!: FormControl;
  public search!: Search;
  public customFile!: string;
  public moneySelect!: number;
  public areaSelect!: number;
  public _location!: Location[];
  public _division!: Division[];
  public minMoneyValue!: MinMoney[];
  public maxMoneyValue!: MaxMoney[];
  public _minArea!: MinArea[];
  public _maxArea!: MaxArea[];
  public getRoomNumber!: RoomNumber[];
  public _house!: House[];
  public _search!: House[];

  private createForm(): void {
    this.Search = new FormGroup( {
      district: this.district,
      location: this.location,
      minMoney: this.minMoney,
      maxMoney: this.maxMoney,
      minArea: this.minArea,
      maxArea: this.maxArea,
      roomNumber: this.roomNumber,

    });
  }

  private CreateFormControls(): void {
    this.district = new FormControl('', [
      Validators.required
    ]);

    this.location = new FormControl('', [
      Validators.required
    ]);

    this.minMoney = new FormControl('', [
      Validators.required
    ]);

    this.maxMoney = new FormControl('', [
      Validators.required
    ]);

    this.minArea = new FormControl('', [
      Validators.required
    ]);

    this.maxArea = new FormControl('', [
      Validators.required
    ]);

    this.roomNumber = new FormControl('', [
      Validators.required
    ]);
  }

  constructor(
    private router: Router,
    private _locationService: LocationService,
    private _moneyService: MoneyService,
    private _areaService: AreaService,
    private _roomService: RoomService,
    private _homeService: HomeService
  ) { }

  ngOnInit() {
    this.CreateFormControls();
    this.createForm();
    this.getDivision();
    this.getMinMoney();
    this.getMinArea();
    this.getRoom();
    this.getInfo();
    this.getRoomInfo();
    this._homeService.getData()
    .subscribe(data => {
      console.log(data);
    },
    err => {
      console.log(err);
    });
  }

  onSubmit(form: any) {
    this.search = new Search();
    this.search.district = form.division;
    this.search.location = form.location;
    this.search.minMoney = form.minMoney;
    this.search.minArea = form.minArea;
    this.search.roomNumber = form.roomNum;

    if (form.maxMoney > 0) {
      this.search.maxMoney = form.maxMoney;
    } else {
      this.search.maxMoney = 50000;
    }
    if (form.maxArea > 0) {
      this.search.maxArea = form.maxArea;
    } else {
      this.search.maxArea = 4200;
    }

    console.log("search ads", this.search);
    
    this._homeService._searchAds(this.search)
    .subscribe(data => {
      console.log(data);
      this._search = data;
      this.router.navigate(['']);

    },
    err => {
      console.log(err);
    });
  }

  private getInfo() {
    this.location.setValue('0');
    this.maxMoney.setValue('0');
    this.maxArea.setValue('0');
  }

  private getRoomInfo() {
    this._homeService._getHouseAdsInfo()
    .subscribe(data => {
      console.log(data);
      this._house = data;
    },
    err => {
      console.log(err);
    });
  }

  private getDivision() {
    this._locationService._getDivision()
    .subscribe(data => {
      console.log(data);
      this._division = data;
    },
    err => {
      console.log(err);
    });
  }

  mySelect: any = '';

  onNameSelected(event: any) {
    this.customFile = event.division;
    console.log(this.customFile);
    this._getLocation(this.customFile);
  }

  private _getLocation(location: string) {
    this._locationService._selectLocation(location)
    .subscribe(data => {
      console.log(data);
      this._location = data;
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

  myMoney: any = "";
  
  onMoneySelected(event: any) {
    this.moneySelect = event.minMoney;
    console.log("money",this.moneySelect);
    this._getMaxMoney(this.moneySelect);
  }

  private _getMaxMoney(money: number) {
    this._moneyService._getMaxMoney()
    .subscribe(data => {
      console.log(data);
      this.maxMoneyValue = data;
    },
    err => {
      console.log(err);
    });
  }

  private getMinArea() {
    this._areaService._getMinArea()
    .subscribe(data => {
      console.log(data);
      this._minArea = data;
    },
    err => {
      console.log(err);
    });
  }

  myArea: any = "";
  onAreaSelected(event: any) {
    this.areaSelect = event.minArea;
    console.log("area is",this.areaSelect);
    this._getMaxArea(this.areaSelect);
  }

  private _getMaxArea(area: number) {
    this._areaService.selectedMaxArea(area)
    .subscribe(data => {
      console.log(data);
      this._maxArea = data;
    },
    err => {
      console.log(err);
    });
  }

  private getRoom() {
    this._roomService._getRoom()
    .subscribe(data => {
      console.log(data);
      this.getRoomNumber = data;
    },
    err => {
      console.log(err);
    });
  }

}
