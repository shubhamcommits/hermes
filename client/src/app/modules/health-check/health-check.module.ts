import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HealthCheckRoutingModule } from './health-check-routing.module';
import { HealthCheckHeaderComponent } from './health-check-header/health-check-header.component';
import { SharedModule } from '../shared/shared.module';
import { AppsListComponent } from './apps-list/apps-list.component';
import { AppCardComponent } from './apps-list/app-card/app-card.component';
import { CreateAppComponent } from './apps-list/create-app/create-app.component';
import { AppDetailsComponent } from './apps-list/app-details/app-details.component';
import { CreateServiceComponent } from './apps-list/app-details/create-service/create-service.component';
import { ServiceDetailsComponent } from './apps-list/service-details/service-details.component';
import { CreateApiComponent } from './apps-list/service-details/create-api/create-api.component';
import { ApiDetailsComponent } from './apps-list/service-details/api-details/api-details.component';
import { CreateApiModalComponent } from './apps-list/service-details/create-api/create-api-modal/create-api-modal.component';


@NgModule({
  declarations: [
    HealthCheckHeaderComponent,
    AppsListComponent,
    AppCardComponent,
    CreateAppComponent,
    AppDetailsComponent,
    CreateServiceComponent,
    ServiceDetailsComponent,
    CreateApiComponent,
    ApiDetailsComponent,
    CreateApiModalComponent
  ],
  imports: [
    CommonModule,
    HealthCheckRoutingModule,
    SharedModule
  ]
})
export class HealthCheckModule { }
