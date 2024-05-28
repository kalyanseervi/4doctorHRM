import { NgFor } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-checkinout',
  standalone: true,
  imports: [[NgFor]],
  templateUrl: './checkinout.component.html',
  styleUrl: './checkinout.component.css'
})
export class CheckinoutComponent {
  checkIn() {
    console.log('Check In');
  }

  checkOut() {
    console.log('Check Out');
  }

}
