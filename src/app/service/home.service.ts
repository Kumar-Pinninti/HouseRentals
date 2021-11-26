import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Search } from '../model/search';
import { House } from '../users/models/ads';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http: HttpClient, private router: Router) { }

  _getHouseAdsInfo(): Observable<House[]> {
    return this.http.get<House[]>('http://localhost:3000/houseads/all/');
  }

  _searchAds(_search: Search): Observable<House[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.post<House[]>('http://localhost:3000/houseads/search', _search, httpOptions);
  }

  getData() {
    return this.http.get('https://www.miljolare.no/ws/nml/pnc/?service=get_scheme');
  }

}
