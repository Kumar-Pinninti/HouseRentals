import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RoomNumber } from '../models/room';
import { RoomService } from '../service/room.service';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit {

  public RoomNumber!: FormGroup;
  public roomNumber!: FormControl;
  _roomNumber!: RoomNumber;
  public getRoomNumber!: RoomNumber[];

  private createRoomForm(): void {
    this.RoomNumber = new FormGroup( {
      roomNumber: this.roomNumber
    });
  }

  private roomFormControls(): void {
    this.roomNumber = new FormControl('', [
      Validators.required,
      Validators.min(0),
      Validators.max(100),
      Validators.pattern('[0-9]*')
    ]);
  }

  constructor(private _roomService: RoomService, private router: Router) { }

  ngOnInit() {
    this.roomFormControls();
    this.createRoomForm();
    this.getRoom();
  }

  onSubmitAddRoom(form: any) {
    console.log(form);

    this._roomNumber = new RoomNumber();
    console.log(this._roomNumber);

    this._roomNumber.roomNum = form.room;
    console.log(this._roomNumber.roomNum)

    this._roomService._addRoom(this._roomNumber)
    .subscribe(data => {
      console.log(data);
      this.getRoom();
    },
    err => {
      console.log(err);
    });
  }

  private getRoom() {
    this._roomService._getRoom()
    .subscribe(data => {
      console.log(data);
      this.getRoomNumber = data;
    },
    err => {
      console.log(err);
    });
  }

  deleteRoom(ID: string) {
    this._roomService._deleteRoom(ID)
    .subscribe(data => {
      console.log(data);
      this.getRoom();
    },
    err => {
      console.log(err);
    });
  }

}
