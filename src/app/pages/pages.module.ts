import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { ProgressComponent } from './progress/progress.component';
import { SharedModule } from '../shared/shared.module';
import { PagesComponent } from './pages.component';
import { FormsModule } from '@angular/forms';
import { ComponentsModule } from '../components/components.module';


@NgModule({
  declarations: [
    PagesComponent,
    DashboardComponent,
    Grafica1Component,
    ProgressComponent,
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    SharedModule,
    FormsModule,
    ComponentsModule,
 
  ],
  exports: [
    DashboardComponent,
    Grafica1Component,
    ProgressComponent,
    PagesComponent
  ]
})
export class PagesModule { }
