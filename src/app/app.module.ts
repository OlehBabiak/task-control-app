import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppRoutingModule} from './app-routing.module';

import {AppComponent} from './app.component';
import {HeaderComponent} from './components/header/header/header.component';
import {HomeComponent} from './components/home/home.component';
import {NewBoardModalComponent} from './components/dashboard/dashboard-list/new-board.modal/new-board.modal.component';
import {AuthComponent} from './components/auth/auth.component';
import {LoadingSpinnerComponent} from './shared/loading-spinner/loading-spinner.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {ErrorPageComponent} from './shared/errors/error-page/error-page.component';
import {AuthInterceptor} from './interceptors/auth.interceptor';
import {UsernameTransformPipe} from './pipes/username-transform.pipe';
import { FooterComponent } from './components/footer/footer/footer.component';
import { PlaceholderDirective } from './shared/placeholder/placeholder.directive';
import {DashboardModule} from "./components/dashboard/dashboard/dashboard.module";

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    FooterComponent,
    HeaderComponent,
    HomeComponent,
    LoadingSpinnerComponent,
    NewBoardModalComponent,
    PlaceholderDirective,
    UsernameTransformPipe,
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    DashboardModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    ErrorPageComponent
  ]
})
export class AppModule {
}
