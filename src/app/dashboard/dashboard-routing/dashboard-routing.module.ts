import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {DashboardComponent} from "../dashboard.component";
import {BoardEditComponent} from "../board-edit/board-edit.component";
import {BoardDetailComponent} from "../board.detail/board.detail.component";
import {NewBoardModalComponent} from "../dashboard-list/new-board.modal/new-board.modal.component";

const routes: Routes = [
  {path: '', component: DashboardComponent},
  {path: ':id', component: BoardDetailComponent},
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
