import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'auth', loadChildren: () => import('./components/auth/auth.module')
      .then(module => module.AuthModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./components/dashboard/dashboard.module')
      .then(module => module.DashboardModule),
  },
  {
    path: 'archive',
    loadChildren: () => import('./components/archive/archive.module')
      .then(module => module.ArchiveModule)
  },
  {
    path: 'home',
    loadComponent: () => import('./components/home/home.component')
      .then(module => module.HomeComponent)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
