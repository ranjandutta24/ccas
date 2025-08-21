import { NgModule } from '@angular/core';
import { NgApexchartsModule } from 'ng-apexcharts';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { CcasLiveComponent } from './ccas-live/ccas-live.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MainRoutingModule } from './main-routing.module';
import { OverviewComponent } from './overview/overview.component';
import { CompressorsComponent } from './compressors/compressors.component';
import { EStatusComponent } from './e-status/e-status.component';

@NgModule({
  declarations: [
    CcasLiveComponent,
    DashboardComponent,
    OverviewComponent,
    CompressorsComponent,
    EStatusComponent,
  ],
  imports: [CommonModule, MainRoutingModule, NgApexchartsModule],
})
export class MainModule {}
