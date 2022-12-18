import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardHeaderComponent } from './dashboard-header/dashboard-header.component';
import { DashboardHomeComponent } from './dashboard-header/dashboard-home/dashboard-home.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    DashboardHeaderComponent,
    DashboardHomeComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule
  ],
  providers: [ ]
})
export class DashboardModule { }
