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
import {FormsModule} from "@angular/forms";
import { TruncatePipe } from './pipes/truncate.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatIconModule} from '@angular/material/icon';
import { TaskListComponent } from './dashboard/board.detail/task-list/task-list.component';

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
    TaskListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
