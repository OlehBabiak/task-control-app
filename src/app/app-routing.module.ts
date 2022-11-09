import {NgModule} from '@angular/core';
import {PreloadingStrategy, RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './components/home/home.component';

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
  {path: 'home', component: HomeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadingStrategy})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
