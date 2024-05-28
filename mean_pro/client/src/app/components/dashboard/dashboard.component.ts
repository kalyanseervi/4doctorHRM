
import { NavigationStart, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { UserService } from '../../services/user.service';
import { RouterOutlet } from '@angular/router';
import { CommonModule, NgIf } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UserAnalysisComponent } from '../../components/user-analysis/user-analysis.component';
// import { UserAnalysisService } from '../../services/user-analysis.service';
import { UserProfileComponent } from '../user-profile/user-profile.component';
import { CheckinoutComponent } from '../checkinout/checkinout.component';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ RouterOutlet, CommonModule, [NgIf], UserProfileComponent,
    CheckinoutComponent,UserAnalysisComponent ],

  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {

  loggedUser: any;
  successMessage: string | null = null;
  errorMessage: string | null = null;
  userImage: string | undefined;

  checkInSuccess: boolean = false;
  checkOutSuccess: boolean = false;

  hoursDisplay: string = '';
  minutesDisplay: string = '';
  secondsDisplay: string = '';
  suffix: string = '';

  

// abc
  selectedPage: string = 'home';

  navigateTo(page: string) {
    this.selectedPage = page;
  }

  constructor(private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.fetchLoggedUser();
    this.updateClock();
    setInterval(() => this.updateClock(), 1000);

    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        // Remove modal backdrop when navigation starts
        document.body.classList.remove('modal-open');
        const modalBackdrop = document.querySelector('.modal-backdrop');
        if (modalBackdrop) {
          modalBackdrop.remove();
        }
      }
      this.userService.getLoggedUser().subscribe({
        next: (data: any) => {
          this.loggedUser = data;
          this.userImage = data.userImage; // Assuming loggedUser has userImage
        },
        error: (err) => {
          this.errorMessage = 'Failed to load logged user data';
          console.error(this.errorMessage, err);
        }
      });

    });
    // this.userService.getAllData(this.loggedUser).subscribe({
    //   next: (data: any) => {
    //     console.log(data);
    //   },
    //   error: (err: any) => {
    //     console.log(err);
    //   }
    // });

  }




  fetchLoggedUser(): void {
    this.userService.getLoggedUser().pipe().subscribe(
      (data: any) => {
        this.loggedUser = data;
        console.log(this.loggedUser.user._id);
      }, (error) => {
        console.log(error);
      }
    );
  }

  checkIn(): void {
    this.userService.checkIn().pipe(
      catchError(error => {
        this.errorMessage = error;
        throw error;
      })
    ).subscribe(
      () => {
        console.log('Checked in successfully');
        // Optionally, you can perform any additional actions after successful check-in
      }
    );
  }

  checkOut(): void {
    this.userService.checkOut().pipe(
      catchError(error => {
        this.errorMessage = error;
        throw error;
      })
    ).subscribe(
      () => {
        console.log('Checked out successfully');
        // Optionally, you can perform any additional actions after successful check-out
      }
    );
  }

  logout(): void {
    this.userService.logout();
    this.router.navigate(['']);
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
}


