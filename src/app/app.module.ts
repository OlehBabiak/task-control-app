import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header/header.component';
import {DashboardListComponent} from './dashboard/dashboard-list/dashboard-list.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {HomeComponent} from './home/home.component';
import {BoardItemComponent} from './dashboard/dashboard-list/board-item/board-item.component';
import {BoardEditComponent} from './dashboard/board-edit/board-edit.component';
import {BoardDetailComponent} from './dashboard/board.detail/board.detail.component';
import {NewBoardModalComponent} from './dashboard/dashboard-list/new-board.modal/new-board.modal.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {TruncatePipe} from './pipes/truncate.pipe';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatIconModule} from '@angular/material/icon';
import {TaskListComponent} from './dashboard/board.detail/task-list/task-list.component';
import {ColumnEditComponent} from './dashboard/board.detail/board-column/column-edit/column-edit.component';
import {TaskComponent} from './dashboard/board.detail/task-list/task/task.component';
import {TaskEditComponent} from './dashboard/board.detail/task-list/task-edit/task-edit.component';
import { AuthComponent } from './auth/auth/auth.component';
import {LoadingSpinnerComponent} from "./shared/loading-spinner/loading-spinner.component";
import {HttpClientModule} from "@angular/common/http";
import {DragDropModule} from "@angular/cdk/drag-drop";
import { ErrorPageComponent } from './shared/errors/error-page/error-page.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DashboardListComponent,
    DashboardComponent,
    HomeComponent,
    BoardItemComponent,
    BoardEditComponent,
    BoardDetailComponent,
    NewBoardModalComponent,
    TruncatePipe,
    TaskListComponent,
    ColumnEditComponent,
    TaskComponent,
    TaskEditComponent,
    AuthComponent,
    LoadingSpinnerComponent,
    ErrorPageComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    MatIconModule,
    ReactiveFormsModule,
    HttpClientModule,
    DragDropModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
