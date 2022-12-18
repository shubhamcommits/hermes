import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { HomeHeaderComponent } from './home-header/home-header.component';

import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { ConfirmationPageComponent } from './confirmation-page/confirmation-page.component';

@NgModule({
  declarations: [
    LandingPageComponent,
    LoginComponent,
    SignUpComponent,
    HomeHeaderComponent,
    ConfirmationPageComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class HomeModule { }
