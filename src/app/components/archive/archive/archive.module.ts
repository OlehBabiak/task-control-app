import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {ArchiveComponent} from "../archive.component";
import {ArchiveTaskDetailComponent} from "../archive-task-detail/archive-task-detail.component";
import {ArchiveRoutingModule} from "../archive-routing/archive-routing.module";
import {SharedModule} from "../../../shared/shared.module";



@NgModule({
  declarations: [
    ArchiveComponent,
    ArchiveTaskDetailComponent,
  ],
  imports: [
    CommonModule,
    ArchiveRoutingModule,
    SharedModule
  ]
})
export class ArchiveModule { }
