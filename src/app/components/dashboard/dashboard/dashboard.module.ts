import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DashboardListComponent} from "../dashboard-list/dashboard-list.component";
import {DashboardComponent} from "../dashboard.component";
import {BoardItemComponent} from "../dashboard-list/board-item/board-item.component";
import {BoardDetailComponent} from "../board.detail/board.detail.component";
import {TaskListComponent} from "../board.detail/task-list/task-list.component";
import {TaskComponent} from "../board.detail/task-list/task/task.component";
import {TaskEditComponent} from "../board.detail/task-list/task-edit/task-edit.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {DashboardRoutingModule} from "../dashboard-routing/dashboard-routing.module";
import {ColumnEditComponent} from "../board.detail/board-column/column-edit/column-edit.component";
import {ErrorPageComponent} from "../../../shared/errors/error-page/error-page.component";
import {DragDropModule} from "@angular/cdk/drag-drop";
import {MatIconModule} from "@angular/material/icon";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {TruncatePipe} from "../../../pipes/truncate.pipe";


@NgModule({
  declarations: [
    ErrorPageComponent,
    BoardItemComponent,
    BoardDetailComponent,
    ColumnEditComponent,
    DashboardListComponent,
    DashboardComponent,
    TaskComponent,
    TaskEditComponent,
    TaskListComponent,
    TruncatePipe,
  ],
  imports: [
    BrowserAnimationsModule,
    DashboardRoutingModule,
    DragDropModule,
    FormsModule,
    CommonModule,
    MatIconModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    ReactiveFormsModule
  ]
})
export class DashboardModule {
}
