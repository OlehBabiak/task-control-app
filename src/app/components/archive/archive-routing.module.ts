import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {ArchiveTaskDetailComponent} from './archive-task-detail/archive-task-detail.component';
import {ArchiveComponent} from './archive.component';
import {AuthGuard} from '../auth/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: ArchiveComponent,
    canActivate: [AuthGuard]
  },
  {path: ':id', component: ArchiveTaskDetailComponent}
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class ArchiveRoutingModule {
}
