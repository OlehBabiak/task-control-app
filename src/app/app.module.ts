import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppRoutingModule} from './app-routing.module';

import {AppComponent} from './app.component';
import {HeaderComponent} from './components/header/header/header.component';
import {HomeComponent} from './components/home/home.component';
import {NewBoardModalComponent} from './components/dashboard/dashboard-list/new-board.modal/new-board.modal.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AuthInterceptor} from './interceptors/auth.interceptor';
import { FooterComponent } from './components/footer/footer/footer.component';
import {DashboardModule} from "./components/dashboard/dashboard/dashboard.module";
import {AuthModule} from "./components/auth/auth.module";
import {ArchiveModule} from "./components/archive/archive/archive.module";
import {SharedModule} from "./shared/shared.module";

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    HomeComponent,
    NewBoardModalComponent,
  ],
  imports: [
    AppRoutingModule,
    AuthModule,
    ArchiveModule,
    SharedModule,
    BrowserAnimationsModule,
    BrowserModule,
    DashboardModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
