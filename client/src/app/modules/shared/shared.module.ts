import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { RouterModule, Routes } from '@angular/router';

/**
 * Third Party Modules Import
 */

// UI Loader Module
import { NgxUiLoaderModule } from 'ngx-ui-loader';

// Charts Module
import { NgChartsModule, ThemeService } from 'ng2-charts';

// Sweet Alert Module
import { SweetAlert2Module, SweetAlert2LoaderService } from '@sweetalert2/ngx-sweetalert2';

// JSON Viewer Module
import { NgxJsonViewerModule } from 'ngx-json-viewer';

/**
 * Components
 */

// Shared Components
import { CommonTableComponent } from './components/common-table/common-table.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SideBarComponent } from './components/navbar/side-bar/side-bar.component';
import { MainNavbarComponent } from './components/navbar/main-navbar/main-navbar.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { MenuBarComponent } from './components/navbar/menu-bar/menu-bar.component';
import { TransformColumnNamePipe } from './pipes/transform-column-name.pipe';
import { BarGraphComponent } from './components/charts/bar-graph/bar-graph.component';
import { CustomLineGraphComponent } from './components/charts/custom-line-graph/custom-line-graph.component';
import { DoughnutGraphComponent } from './components/charts/doughnut-graph/doughnut-graph.component';
import { HorizontalBarGraphComponent } from './components/charts/horizontal-bar-graph/horizontal-bar-graph.component';

// Routes
const routes: Routes = [];

@NgModule({
  declarations: [
    CommonTableComponent,
    NavbarComponent,
    SideBarComponent,
    MainNavbarComponent,
    SearchBarComponent,
    MenuBarComponent,
    TransformColumnNamePipe,
    BarGraphComponent,
    CustomLineGraphComponent,
    DoughnutGraphComponent,
    HorizontalBarGraphComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    NgChartsModule,
    NgxUiLoaderModule,
    NgxJsonViewerModule,
    SweetAlert2Module.forRoot(),
    RouterModule.forChild(routes),
  ],
  exports: [
    MaterialModule,
    NgChartsModule,
    CommonTableComponent,
    BarGraphComponent,
    CustomLineGraphComponent,
    DoughnutGraphComponent,
    HorizontalBarGraphComponent,
    SweetAlert2Module,
    NgxJsonViewerModule
  ],
  providers: [
    ThemeService,
    SweetAlert2LoaderService
  ]
})
export class SharedModule { }
