import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { RoomNumber } from '../models/room';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  constructor(private http: HttpClient, private router: Router) { }

  _addRoom(_room: RoomNumber) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    console.log("alllll",_room, httpOptions)

    return this.http.post('http://localhost:3000/room/create', _room, httpOptions);
  }

  _getRoom(): Observable<RoomNumber[]> {
    return this.http.get<RoomNumber[]>('http://localhost:3000/room/all');
  }

  _deleteRoom(id: string) {
    return this.http.delete(`http://localhost:3000/room/delete/${id}`);
  }
}
