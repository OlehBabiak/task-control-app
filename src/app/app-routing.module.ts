import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";

const routes: Routes = [
  {path: '', redirectTo: '/recipes', pathMatch: "full"},
  {path: 'dashboard', loadChildren: () => import('./dashboard/dashboard-routing/dashboard-routing.module').then(module => module.DashboardRoutingModule)},
  // {path: 'archive'},
  {path: 'home', component: HomeComponent},
  // {path: 'auth', component: AuthComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
