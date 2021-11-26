import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Division } from '../models/division';

@Injectable({
  providedIn: 'root'
})
export class DivisonService {

  constructor(private http: HttpClient, private router: Router) { }
  
  _addDivision(_division: Division) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.post('http://localhost:3000/division/create', _division, httpOptions);
  }

  _getDivision(): Observable<Division[]> {
    return this.http.get<Division[]>('http://localhost:3000/division/all');
  }

  _deleteDivision(id: string) {
    return this.http.delete(`http://localhost:3000/division/delete/${id}`);
  }
  
}
