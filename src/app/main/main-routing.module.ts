import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CcasLiveComponent } from './ccas-live/ccas-live.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CompressorsComponent } from './compressors/compressors.component';
import { EStatusComponent } from './e-status/e-status.component';
import { OverviewComponent } from './overview/overview.component';
// import { AboutComponent } from './about/about.component';

const routes: Routes = [
  { path: 'ccslive', component: CcasLiveComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'overview', component: OverviewComponent },
  { path: 'compressors', component: CompressorsComponent },
  { path: 'e-status', component: EStatusComponent },

  // { path: '**', component: NotFoundComponent },     // wildcard route for 404
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule {}
