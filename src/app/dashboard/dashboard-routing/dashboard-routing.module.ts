import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {DashboardComponent} from "../dashboard.component";
import {BoardDetailComponent} from "../board.detail/board.detail.component";
import {ColumnEditComponent} from "../board.detail/board-column/column-edit/column-edit.component";
import {TaskEditComponent} from "../board.detail/task-list/task-edit/task-edit.component";
import {BoardsResolver} from "../../services/boards.resolver";
import {BoardResolver} from "../../services/board.resolver";

const routes: Routes = [
  {path: '', component: DashboardComponent, resolve: {boards: BoardsResolver}},
  {path: ':id', component: BoardDetailComponent, resolve: {data: BoardResolver},
    // children: [
    //   {path: 'new', component: ColumnEditComponent},
    //   {path: ':id', component: TaskEditComponent},
    //   {path: ':id/:id', component: TaskEditComponent}
    // ]
  },
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class DashboardRoutingModule {
}
