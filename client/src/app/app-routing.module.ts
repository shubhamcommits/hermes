import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavigationGuard } from 'src/app/modules/shared/guards/navigation.guard';
import { PageNotFoundComponent } from 'src/app/page-not-found/page-not-found.component';
import { AuthGuard } from './modules/shared/guards/auth.guard';

const routes: Routes = [
  // MAIN OR DEFAULT ROUTE
  {
    path: '',
    redirectTo: 'home/main',
    pathMatch: 'full'
  },

  // 'home' ROUTE
  {
    path: 'home',
    loadChildren: () => import('src/app/modules/home/home.module')
      .then((module) => module.HomeModule),
    canActivate: [NavigationGuard],
  },

  // 'dashboard' ROUTE
  {
    path: 'dashboard',
    loadChildren: () => import('src/app/modules/dashboard/dashboard.module')
      .then((module) => module.DashboardModule),
    canActivate: [AuthGuard],

  },
  // 'user' ROUTE
  {
    path: 'user',
    loadChildren: () => import('src/app/modules/user/user.module')
      .then((module) => module.UserModule),
    canActivate: [AuthGuard],
  },


  // 'health-check' ROUTE
  {
    path: 'health-check',
    loadChildren: () => import('src/app/modules/health-check/health-check.module')
      .then((module) => module.HealthCheckModule),
    canActivate: [AuthGuard],
  },

  // NOT FOUND ROUTE
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
