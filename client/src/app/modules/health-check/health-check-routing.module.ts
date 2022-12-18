import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavbarComponent } from '../shared/components/navbar/navbar.component';
import { AppDetailsComponent } from './apps-list/app-details/app-details.component';
import { AppsListComponent } from './apps-list/apps-list.component';
import { ApiDetailsComponent } from './apps-list/service-details/api-details/api-details.component';
import { ServiceDetailsComponent } from './apps-list/service-details/service-details.component';
import { HealthCheckHeaderComponent } from './health-check-header/health-check-header.component';

const routes: Routes = [
  {
    path: '', component: NavbarComponent, children: [
      {
        path: '', component: HealthCheckHeaderComponent, children: [
          { path: 'apps', component: AppsListComponent },
          { path: 'apps/:appId', component: AppDetailsComponent },
          { path: 'apps/:appId/services/:serviceId', component: ServiceDetailsComponent },
          { path: 'apps/:appId/services/:serviceId/api/:apiId', component: ApiDetailsComponent }
        ]
      },

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HealthCheckRoutingModule { }
