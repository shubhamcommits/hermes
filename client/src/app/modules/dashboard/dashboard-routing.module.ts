import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardHeaderComponent } from 'src/app/modules/dashboard/dashboard-header/dashboard-header.component';
import { DashboardHomeComponent } from 'src/app/modules/dashboard/dashboard-header/dashboard-home/dashboard-home.component';
import { NavbarComponent } from '../shared/components/navbar/navbar.component';

const routes: Routes = [
  {
    path: '', component: NavbarComponent, children: [

      // Dashboard Home
      { path: 'home', component: DashboardHomeComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
