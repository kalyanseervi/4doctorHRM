
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  loggedUser: any;
  checkInOutHistory: any[] = [];
  errorMessage: string | null = null;
  userImage: string | undefined;
  filter: string = '';
  successMessage: string | null = null;

  hoursDisplay: string = '';
  minutesDisplay: string = '';
  secondsDisplay: string = '';
  suffix: string = '';

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.getLoggedUser();
    this.getCheckInOutHistory();
    this.updateClock();
    setInterval(() => this.updateClock(), 1000);
  }

  getLoggedUser(): void {
    this.userService.getLoggedUser().subscribe({
      next: (user) => this.loggedUser = user,
      error: (err: HttpErrorResponse) => this.handleError(err)
    });
  }

  getCheckInOutHistory(): void {
    this.userService.getCheckInOutHistory().subscribe({
      next: (history) => this.checkInOutHistory = history,
      error: (err: HttpErrorResponse) => this.handleError(err)
    });
  }

  checkIn(): void {
    this.userService.checkIn().subscribe({
      next: () => {
        this.getCheckInOutHistory();
        this.errorMessage = 'Checked in successfully!';
      },
      error: (err: HttpErrorResponse) => this.handleError(err)
    });
  }

  checkOut(): void {
    this.userService.checkOut().subscribe({
      next: () => {
        this.getCheckInOutHistory();
        this.errorMessage = 'Checked out successfully!';
      },
      error: (err: HttpErrorResponse) => this.handleError(err)
    });
  }
  private updateClock(): void {
    const date = new Date();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();

    this.suffix = this.timeSuffix(hours);
    hours = this.twelveHour(hours);

    this.hoursDisplay = this.leadingZeros(hours);
    this.minutesDisplay = this.leadingZeros(minutes);
    this.secondsDisplay = this.leadingZeros(seconds);
  }

  private leadingZeros(num: number): string {
    return num < 10 ? '0' + num : num.toString();
  }

  private timeSuffix(hours: number): string {
    return hours < 12 ? 'AM' : 'PM';
  }

  private twelveHour(hours: number): number {
    return hours % 12 === 0 ? 12 : hours % 12;
  }

  handleError(error: HttpErrorResponse): void {
    console.error('Error:', error);
    this.errorMessage = error.message;
  }


}
