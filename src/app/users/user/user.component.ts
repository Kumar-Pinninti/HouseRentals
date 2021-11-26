import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { House } from '../models/ads';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  jwtHelper = new JwtHelperService();
  public userID!: string;
  //galleryOptions: NgxGalleryOptions[];
  //galleryImages: NgxGalleryImage[];
  public _house!: House[];

  constructor(private _userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.getUserID();
    this.getUserAds(this.userID);
  }

  onSubmit() {

  }

  private getUserID() {
    const token = localStorage.getItem('token') || '{}';
    const tokenPayload = this.jwtHelper.decodeToken(token);
    this.userID = tokenPayload.userID;
  }

  private getUserAds(userID: string) {
    this._userService._getHouseAdsInfo(userID)
      .subscribe(data => {
        console.log(data);
        this._house = data;
      },
      err => {
        console.log(err);
      });
  }

}
