import { Component, OnInit } from '@angular/core';
import { LocationService } from '../service/location.service';
import { Division } from '../models/division';
import { Location } from '../models/location';
import { Router } from '@angular/router';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent implements OnInit {

  public division!: Division[];
  _location! : Location;
  getLocationData! : Location[];
  locationNameData! : Location[];

  constructor(private _locationService: LocationService, private router: Router) { }

  ngOnInit(): void {
    this.getdivision();
    this.getlocation();
  }


  onSubmitAddLocation(form: any) {
    console.log(form);

    this._location = new Location();
    console.log(this._location);

    this._location.divisionName = form.inputState;
    this._location.locationName = form.district;
    console.log(this._location.locationName)

    this._locationService._addLocation(this._location)
    .subscribe(data => {
      console.log(data);
      this.getlocation();
    },
    err => {
      console.log(err);
    });
  }

  mySelect : any = '';

  selectlocation(divisionName: string){
    //console.log("state",divisionName = this.mySelect)

      this._locationService._selectLocation(divisionName).subscribe((data) => {
        console.log(data);
        this.locationNameData = data;
      },
      err => {
        console.log(err);
      });

    
  }

  private getlocation() {
    this._locationService._getLocation()
    .subscribe(data => {
      console.log(data);
      this.getLocationData = data;
    },
    err => {
      console.log(err);
    });
  }

  deletelocation(ID: string) {
    this._locationService._deleteLocation(ID)
    .subscribe(data => {
      console.log(data);
      this.getlocation();
    },
    err => {
      console.log(err);
    });
  }



  private getdivision() {
    this._locationService._getDivision()
    .subscribe(data => {
      console.log(data);
      this.division = data;
    },
    err => {
      console.log(err);
    });
  }
  
}
