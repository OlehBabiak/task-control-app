import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./home/home.component";
import * as path from "path";
import {AuthComponent} from "./auth/auth.component";

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: "full"},
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard-routing/dashboard-routing.module')
      .then(module => module.DashboardRoutingModule),
  },
  // {path: 'archive'},
  {path: 'home', component: HomeComponent},
  {path: 'auth', component: AuthComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
