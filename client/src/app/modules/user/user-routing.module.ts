import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavbarComponent } from '../shared/components/navbar/navbar.component';
import { UserHomeComponent } from './user-home/user-home.component';

const routes: Routes = [
  {
    path: '', component: NavbarComponent, children: [

      { path: 'home', component: UserHomeComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }


