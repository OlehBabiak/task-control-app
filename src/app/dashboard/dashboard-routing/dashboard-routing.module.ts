import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {DashboardComponent} from "../dashboard.component";

const routes: Routes = [
  {path: '', component: DashboardComponent},
//   children: [
//   {path: 'new', component: RecipeEditComponent},
//   {path: ':id', component: RecipeDetailComponent, resolve: [RecipeResolver]},
//   {path: ':id/edit', component: RecipeEditComponent, resolve: [RecipeResolver]},
// ]
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
