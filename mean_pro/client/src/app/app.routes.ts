import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SignupComponent } from './components/signup/signup.component';
import { authGuard } from './guard/1auth.guard';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { UserAnalysisComponent } from './components/user-analysis/user-analysis.component';
// import { CheckinoutComponent } from './components/checkinout/checkinout.component';
// import { authGuard  } from './guard/auth.guard';

export const routes: Routes = [
    { path: '', component: LoginComponent },
    // {path:'dashboard', component:DashboardComponent},
    { path: 'signup', component: SignupComponent },   
    { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard] },
    { path: 'profile', component: UserProfileComponent },
    { path: 'analysis', component: UserAnalysisComponent },
    // { path: 'checkin', component: CheckinoutComponent },
    // { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    { path: '**', redirectTo: '/dashboard' }
];
