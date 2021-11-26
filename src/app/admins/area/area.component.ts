import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AreaService } from '../service/area.service';
import { MinArea } from '../models/min-area';
import { MaxArea } from '../models/max-area';

@Component({
  selector: 'app-area',
  templateUrl: './area.component.html',
  styleUrls: ['./area.component.css']
})
export class AreaComponent implements OnInit {

  public MinArea!: FormGroup;
  public MaxArea!: FormGroup;
  public minArea!: FormControl;
  public maxArea!: FormControl;
  _minArea!: MinArea;
  _maxArea!: MaxArea;
  public minAreaValue!: MinArea[];
  public maxAreaValue!: MaxArea[];

  private createminAreaForm(): void {
    this.MinArea = new FormGroup( {
      minArea: this.minArea
    });
  }

  private createmaxAreaForm(): void {
    this.MaxArea = new FormGroup( {
      maxArea: this.maxArea
    });
  }

  private minAreaFormControls(): void {
    this.minArea = new FormControl('', [
      Validators.required,
      Validators.min(0),
      Validators.max(500000),
      Validators.pattern('[0-9]*')
    ]);
  }

  private maxAreaFormControls(): void {
    this.maxArea = new FormControl('', [
      Validators.required,
      Validators.min(0),
      Validators.max(500000),
      Validators.pattern('[0-9]*')
    ]);
  }

  constructor(private _areaService: AreaService, private router: Router) { }

  ngOnInit() {
    this.minAreaFormControls();
    this.maxAreaFormControls();
    this.createminAreaForm();
    this.createmaxAreaForm();
    this.getminArea();
    this.getmaxArea();
  }

  onSubmitminArea(form: any) {
    this._minArea = new MinArea();
    this._minArea.minAreaName = form.minArea;
    this._areaService._addMinArea(this._minArea)
    .subscribe(data => {
      console.log(data);
      this.getminArea();
    },
    err => {
      console.log(err);
    });
  }

  onSubmitmaxArea(form: any) {
    this._maxArea = new MaxArea();
    this._maxArea.maxAreaName = form.maxArea;
    this._areaService._addMaxArea(this._maxArea)
    .subscribe(data => {
      console.log(data);
      this.getmaxArea();
    },
    err => {
      console.log(err);
    });
  }

  private getminArea() {
    this._areaService._getMinArea()
    .subscribe(data => {
      console.log(data);
      this.minAreaValue = data;
    },
    err => {
      console.log(err);
    });
  }

  private getmaxArea() {
    this._areaService._getMaxArea()
    .subscribe(data => {
      console.log(data);
      this.maxAreaValue = data;
    },
    err => {
      console.log(err);
    });
  }

  deleteMinArea(ID: string) {
    this._areaService._deleteMinArea(ID)
    .subscribe(data => {
      console.log(data);
      this.getminArea();
    },
    err => {
      console.log(err);
    });
  }

  deleteMaxArea(ID: string) {
    this._areaService._deleteMaxArea(ID)
    .subscribe(data => {
      console.log(data);
      this.getmaxArea();
    },
    err => {
      console.log(err);
    });
  }

}
