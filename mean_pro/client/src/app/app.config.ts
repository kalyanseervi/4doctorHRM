import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { routes } from './app.routes';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router'; // Import RouterModule
import { UserService } from './services/user.service';
import { RegistrService } from './services/registr.service';


export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideClientHydration(),provideHttpClient(withFetch())]
};
@NgModule({

  imports: [CommonModule, HttpClientModule,RouterModule.forRoot(routes), BrowserModule,],
  providers: [UserService,RegistrService],
  exports: [RouterModule]

})

export class AppModule {}