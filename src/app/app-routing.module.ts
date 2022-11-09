import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './components/home/home.component';

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'auth', loadChildren: () => import('./components/auth/auth.module')
      .then(module => module.AuthModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./components/dashboard/dashboard-routing/dashboard-routing.module')
      .then(module => module.DashboardRoutingModule),
  },
  {
    path: 'archive',
    loadChildren: () => import('./components/archive/archive-routing/archive-routing.module')
      .then(module => module.ArchiveRoutingModule)
  },
  {path: 'home', component: HomeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
