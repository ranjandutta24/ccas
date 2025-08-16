import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  // {
  //   path: '',
  //   loadChildren: () =>
  //     import('../app/main/main.module').then((m) => m.MainModule),
  // },
  { path: '', pathMatch: 'full', redirectTo: 'main' },
  {
    path: 'main',
    loadChildren: () =>
      import('../app/main/main.module').then((m) => m.MainModule),
  },
  // {
  //   path: 'admin',
  //   loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
  // },
  // fallback
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
