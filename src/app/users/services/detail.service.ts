import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { House } from '../models/ads';

@Injectable({
  providedIn: 'root'
})
export class DetailService {

  constructor(private http: HttpClient, private router: Router) { }

  _detailHouseAdsInfo(adsID: string): Observable<House> {
    return this.http.get<House>(`http://localhost:3000/houseads/${adsID}`);
  }
  
}
