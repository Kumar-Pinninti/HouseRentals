import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HouseImage } from '../models/houseImage';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private http: HttpClient, private router: Router) { }

  _uploadImage(fd: any, userId: string) {
    const httpOptions = {
      headers: new HttpHeaders({
      })
    };
    return this.http.post('http://localhost:3000/houseimg/create/', fd, httpOptions);
  }

  _uploadCoverImage(fd: any, id: string) {
    const httpOptions = {
      headers: new HttpHeaders({
      })
    };

    console.log("cover", fd)
    return this.http.patch(`http://localhost:3000/coverimg/update/${id}`, fd, httpOptions);
  }

  getImage(id: string): Observable<HouseImage[]> {
    return this.http.get<HouseImage[]>(`http://localhost:3000/houseimg/${id}`);
  }
  
}
