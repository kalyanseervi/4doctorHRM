
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { CommonModule, NgIf } from '@angular/common';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
@Component({
  selector: 'app-user-analysis',
  standalone: true,
  imports: [NgIf, CommonModule,CanvasJSAngularChartsModule],
  templateUrl: './user-analysis.component.html',
  styleUrls: ['./user-analysis.component.css']
})
export class UserAnalysisComponent implements OnInit {
  checkinCheckoutData: any[] = [];
  userId: string =""
  averageCheckIns: number = 0;
  totalLeaveDays: number = 0;
  totalWorkingTime: number = 0;
  totalDaysJoined: number = 0;
  errorMessage: string | null = null;

  // Chart data chart:-A
  chart: any;
  dps: { x: number, y: number }[] = [];
  chartOptions: any;

  constructor(private userService: UserService) {
    // chart:-A
    this.chartOptions = {
      exportEnabled: true,
     animationEnabled: true,
      data: [{
        type: "line",
        dataPoints: this.dps
      }]
    };
  }

  ngOnInit(): void {
    this.userService.getLoggedUser().subscribe({
      next: (data: any) => {
        this.userId = data.userId; // Assuming loggedUser has userId
        this.loadCheckinCheckoutData();
      },
      error: (err) => {
        this.errorMessage = 'Failed to load logged user data';
        console.error(this.errorMessage, err);
      }
    });
  }

  loadCheckinCheckoutData(): void {
    this.userService.getCheckInOutHistory().subscribe({
      next: (data: any[]) => {
        this.checkinCheckoutData = data;
        this.computeAnalysis();
      },
      error: (err) => {
        this.errorMessage = 'Failed to load check-in/out data';
        console.error(this.errorMessage, err);
      }
    });
  }

  computeAnalysis(): void {
    const today = new Date();
    const checkInDates = this.checkinCheckoutData.map(entry => new Date(entry.checkInDateTime));
    const checkOutDates = this.checkinCheckoutData.filter(entry => entry.checkOutDateTime).map(entry => new Date(entry.checkOutDateTime));
    const totalCheckIns = checkInDates.length;
    const totalCheckOuts = checkOutDates.length;

    // Calculate total days from joining date
    const joiningDate = checkInDates.length > 0 ? checkInDates[0] : today;
    this.totalDaysJoined = Math.ceil((today.getTime() - joiningDate.getTime()) / (1000 * 60 * 60 * 24));

    // Calculate average check-ins per day
    this.averageCheckIns = totalCheckIns / this.totalDaysJoined;

    // Calculate total leave days (days with no check-in)
    const checkInDays = new Set(checkInDates.map(date => date.toISOString().split('T')[0]));
    this.totalLeaveDays = this.totalDaysJoined - checkInDays.size;

    // Calculate total working time
    const totalDurations = this.checkinCheckoutData
      .filter(entry => entry.checkOutDateTime)
      .map(entry => new Date(entry.checkOutDateTime).getTime() - new Date(entry.checkInDateTime).getTime());

    this.totalWorkingTime = totalDurations.reduce((a, b) => a + b, 0) / (1000 * 60 * 60); // Convert ms to hours
  }

  checkIn(): void {
    this.userService.checkIn().subscribe({
      next: () => {
        this.loadCheckinCheckoutData();
      },
      error: (err) => {
        this.errorMessage = 'Check-in failed';
        console.error(this.errorMessage, err);
      }
    });
  }
// chart code chart:-A
  prepareChartData(): void {
    // Assuming checkinCheckoutData has a date and checkInOutTime properties
    this.dps = this.checkinCheckoutData.map((entry, index) => ({
      x: index + 1,
      y: entry.checkInOutTime
    }));
    if (this.chart) {
      this.chart.render();
    }
  }
// chart code chart:-A
  getChartInstance(chart: object) {
    this.chart = chart;
    if (this.dps.length > 0) {
      this.chart.render();
    }
  }

  checkOut(): void {
    this.userService.checkOut().subscribe({
      next: () => {
        this.loadCheckinCheckoutData();
      },
      error: (err) => {
        this.errorMessage = 'Check-out failed';
        console.error(this.errorMessage, err);
      }
    });
  }
}
