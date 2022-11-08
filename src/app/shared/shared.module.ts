import {NgModule} from "@angular/core";
import {ErrorPageComponent} from "./errors/error-page/error-page.component";
import {LoadingSpinnerComponent} from "./loading-spinner/loading-spinner.component";
import {PlaceholderDirective} from "./placeholder/placeholder.directive";
import {CommonModule} from "@angular/common";
import {TruncatePipe} from "../pipes/truncate.pipe";
import {UsernameTransformPipe} from "../pipes/username-transform.pipe";

@NgModule({
  declarations: [
    ErrorPageComponent,
    LoadingSpinnerComponent,
    PlaceholderDirective,
    TruncatePipe,
    UsernameTransformPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ErrorPageComponent,
    LoadingSpinnerComponent,
    PlaceholderDirective,
    CommonModule,
    UsernameTransformPipe,
    TruncatePipe
  ],
  entryComponents: [
    ErrorPageComponent
  ]
})
export class SharedModule {
}
