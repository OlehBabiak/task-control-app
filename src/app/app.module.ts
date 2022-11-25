import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {StoreModule} from '@ngrx/store'

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HeaderComponent} from './components/header/header/header.component';
import {NewBoardModalComponent} from './components/dashboard/dashboard-list/new-board.modal/new-board.modal.component';
import {AuthInterceptor} from './interceptors/auth.interceptor';
import {FooterComponent} from './components/footer/footer/footer.component';
import {SharedModule} from "./shared/shared.module";
import {dashboardReducer} from "./components/dashboard/store/reducers/dashboard.reducer";
import {errorReducer} from "./components/dashboard/store/reducers/error.reducer";


@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    NewBoardModalComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    SharedModule,
    StoreModule.forRoot({dashboardList: dashboardReducer, errorItem: errorReducer})
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
  ],
  bootstrap: [AppComponent],
  exports: []
})
export class AppModule {
}
