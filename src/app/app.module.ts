import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HeaderComponent} from './components/header/header/header.component';
import {DashboardListComponent} from './components/dashboard/dashboard-list/dashboard-list.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {HomeComponent} from './components/home/home.component';
import {BoardItemComponent} from './components/dashboard/dashboard-list/board-item/board-item.component';
import {BoardDetailComponent} from './components/dashboard/board.detail/board.detail.component';
import {NewBoardModalComponent} from './components/dashboard/dashboard-list/new-board.modal/new-board.modal.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TruncatePipe} from './pipes/truncate.pipe';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatIconModule} from '@angular/material/icon';
import {TaskListComponent} from './components/dashboard/board.detail/task-list/task-list.component';
import {ColumnEditComponent} from './components/dashboard/board.detail/board-column/column-edit/column-edit.component';
import {TaskComponent} from './components/dashboard/board.detail/task-list/task/task.component';
import {TaskEditComponent} from './components/dashboard/board.detail/task-list/task-edit/task-edit.component';
import {AuthComponent} from './components/auth/auth.component';
import {LoadingSpinnerComponent} from './shared/loading-spinner/loading-spinner.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {ErrorPageComponent} from './shared/errors/error-page/error-page.component';
import {AuthInterceptor} from './interceptors/auth.interceptor';
import {ArchiveComponent} from './components/archive/archive.component';
import {UsernameTransformPipe} from './pipes/username-transform.pipe';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {ArchiveTaskDetailComponent} from './components/archive/archive-task-detail/archive-task-detail.component';
import { FooterComponent } from './components/footer/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DashboardListComponent,
    DashboardComponent,
    HomeComponent,
    BoardItemComponent,
    BoardDetailComponent,
    NewBoardModalComponent,
    TruncatePipe,
    TaskListComponent,
    ColumnEditComponent,
    TaskComponent,
    TaskEditComponent,
    AuthComponent,
    LoadingSpinnerComponent,
    ErrorPageComponent,
    ArchiveComponent,
    UsernameTransformPipe,
    ArchiveTaskDetailComponent,
    FooterComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    MatIconModule,
    ReactiveFormsModule,
    HttpClientModule,
    DragDropModule,
    MatCheckboxModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
