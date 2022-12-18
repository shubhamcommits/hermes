import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfirmationPageComponent } from './confirmation-page/confirmation-page.component';
import { HomeHeaderComponent } from './home-header/home-header.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';

const routes: Routes = [
  {
    path: '', component: HomeHeaderComponent, children: [
      { path: 'main', component: LandingPageComponent },
      { path: 'sign-up', component: SignUpComponent },
      { path: 'login', component: LoginComponent },
      { path: 'confirm', component: ConfirmationPageComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
