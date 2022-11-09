import {NgModule} from '@angular/core';
import {DragDropModule} from "@angular/cdk/drag-drop";

import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatIconModule} from "@angular/material/icon";
import {DashboardListComponent} from "./dashboard-list/dashboard-list.component";
import {DashboardComponent} from "./dashboard.component";
import {BoardItemComponent} from "./dashboard-list/board-item/board-item.component";
import {BoardDetailComponent} from "./board.detail/board.detail.component";
import {TaskListComponent} from "./board.detail/task-list/task-list.component";
import {TaskComponent} from "./board.detail/task-list/task/task.component";
import {TaskEditComponent} from "./board.detail/task-list/task-edit/task-edit.component";
import {DashboardRoutingModule} from "./dashboard-routing.module";
import {ColumnEditComponent} from "./board.detail/board-column/column-edit/column-edit.component";
import {SharedModule} from "../../shared/shared.module";
import {CommonModule} from "@angular/common";


@NgModule({
  declarations: [
    BoardItemComponent,
    BoardDetailComponent,
    ColumnEditComponent,
    DashboardListComponent,
    DashboardComponent,
    TaskComponent,
    TaskEditComponent,
    TaskListComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    DragDropModule,
    MatIconModule,
    MatCheckboxModule,
    SharedModule
  ]
})
export class DashboardModule {
}
