import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MaxMoney } from '../models/max-money';
import { MinMoney } from '../models/min-money';

@Injectable({
  providedIn: 'root'
})
export class MoneyService {

  constructor(private http: HttpClient, private router: Router) { }

  _addMinMoney(_money: MinMoney) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    console.log("this min", _money, httpOptions)

    return this.http.post('http://localhost:3000/minMoney/create', _money, httpOptions);
  }

  _addMaxMoney(_money: MaxMoney) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.post('http://localhost:3000/maxMoney/maxcreate', _money, httpOptions);
  }

  _getMinMoney(): Observable<MinMoney[]> {
    return this.http.get<MinMoney[]>('http://localhost:3000/minMoney/all');
  }

  _getMaxMoney(): Observable<MaxMoney[]> {
    return this.http.get<MaxMoney[]>('http://localhost:3000/maxMoney/maxall');
  }

  _deleteMinMoney(id: string) {
    return this.http.delete(`http://localhost:3000/minMoney/delete/${id}`);
  }

  _deleteMaxMoney(id: string) {
    return this.http.delete(`http://localhost:3000/maxMoney/delete/${id}`);
  }
}
