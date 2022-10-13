import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {DashboardComponent} from "../dashboard.component";
import {BoardEditComponent} from "../board-edit/board-edit.component";
import {BoardDetailComponent} from "../board.detail/board.detail.component";

const routes: Routes = [
  {path: '', component: DashboardComponent},
  {path: 'new', component: BoardEditComponent},
  {path: ':id', component: BoardDetailComponent},
  {path: ':id/edit', component: BoardEditComponent},
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
