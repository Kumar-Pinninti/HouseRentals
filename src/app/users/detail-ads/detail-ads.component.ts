import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { House } from '../models/ads';
import { HouseImage } from '../models/houseImage';
import { DetailService } from '../services/detail.service';
import { ImageService } from '../services/image.service';

@Component({
  selector: 'app-detail-ads',
  templateUrl: './detail-ads.component.html',
  styleUrls: ['./detail-ads.component.css']
})
export class DetailAdsComponent implements OnInit {

  public house!: House;
  public houseID!: string;
  public galleryImage!: HouseImage[];
  //galleryOptions: NgxGalleryOptions[];
  //galleryImages: NgxGalleryImage[];

  constructor(private _detailService: DetailService,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private _imageService: ImageService
    ) { }

  ngOnInit() {
    this.getAdsID();
    //this._gallaryOption();
    this._gallaryImage(this.houseID);
    this.detailAdsInfo(this.houseID);
  }

  // private _gallaryOption() {
  //   this.galleryOptions = [
  //     {
  //       width: '600px',
  //       height: '400px',
  //       thumbnailsColumns: 4,
  //       imageAnimation: NgxGalleryAnimation.Slide
  //     },
  //     // max-width 800
  //     {
  //         breakpoint: 800,
  //         width: '100%',
  //         height: '600px',
  //         imagePercent: 80,
  //         thumbnailsPercent: 20,
  //         thumbnailsMargin: 20,
  //         thumbnailMargin: 20
  //     },
  //     // max-width 400
  //     {
  //       breakpoint: 400,
  //       preview: false
  //     }
  //   ];
  // }

  private _gallaryImage(adsID: string) {
    this._imageService.getImage(adsID)
    .subscribe(data => {
      console.log(data);
      this.galleryImage = data;
      console.log(this.galleryImage);
      this.galleryImage = this.galleryImage;
    },
    err => {
      console.log(err);
    }
    );
    
  }

  private getAdsID() {
    this.activeRoute.params.subscribe(param => {
      this.houseID = param['id'];
      console.log(this.houseID);
    },
    err => {
      console.log(err);
    });
  }

  private detailAdsInfo(adsID: string) {
    this._detailService._detailHouseAdsInfo(adsID)
    .subscribe(data => {
      console.log(data);
      this.house = data;
    },
    err => {
      console.log(err);
    });
  }

}
