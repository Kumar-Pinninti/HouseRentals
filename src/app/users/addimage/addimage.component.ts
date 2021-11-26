import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ImageService } from '../services/image.service';

@Component({
  selector: 'app-addimage',
  templateUrl: './addimage.component.html',
  styleUrls: ['./addimage.component.css']
})
export class AddimageComponent implements OnInit {

  filesToUpload: Array<File> = [];
  public adsID!: string;
  public formData!: any;
  public storeFile!: Array<File>;
  public changeImage!: FormControl;
  public houseImage!: FormControl;
  public customFile!: File;

  private CreateFormControls(): void {
    this.changeImage = new FormControl('', [
      Validators.required
    ]);
    this.houseImage = new FormControl('', [
      Validators.required
    ]);
  }
  constructor(private _imageService: ImageService, private router: Router, private activeRoute: ActivatedRoute) { }

  ngOnInit() {
    alert("currently under maintainence");
    this.CreateFormControls();
    this.getHouseAdsID();
  }

  private getHouseAdsID() {
    this.activeRoute.params.subscribe(param => {
      this.adsID = param['id'];
      console.log(this.adsID);
    },
    err => {
      console.log(err);
    });
  }

  fileChangeEvent1(fileInput: any) {
    this.customFile = fileInput.target.files[0];
    // this.product.photo = fileInput.target.files[0]['name'];
    console.log("image",this.customFile);
  }


  upload1() {
    const fd = new FormData();
      fd.append('small', this.customFile, this.customFile.name);
      fd.append('houseAdsID', this.adsID);
      this._imageService._uploadCoverImage(fd, this.adsID).subscribe(data => {
        // console.log(data["message"]);
      console.log(data);
      this.router.navigate(['user']);
      }, err => {
        console.log(err);
      });
  }

//   fileChangeEvent2(fileInput: any) {
//     this.filesToUpload = <Array<File>>fileInput.target.files;
//     // this.product.photo = fileInput.target.files[0]['name'];
// }

//   upload2() {
//     for (let i = 0; i < this.filesToUpload.length; i++) {
//       const fd = new FormData();
//       fd.append('small', this.filesToUpload[i], this.filesToUpload[i][name]);
//       fd.append('houseAdsID', this.adsID);
//       this._imageService._uploadImage(fd, this.adsID)
//       .subscribe(data => {
//         console.log(data);
//         this.router.navigate(['user']);
//       },
//       err => {
//         console.log(err);
//       });
//     }
//   }

}
