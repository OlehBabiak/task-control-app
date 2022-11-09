import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from './dashboard.component';
import {BoardDetailComponent} from './board.detail/board.detail.component';
import {ColumnEditComponent} from './board.detail/board-column/column-edit/column-edit.component';
import {BoardsResolver} from '../../services/boards.resolver';
import {BoardResolver} from '../../services/board.resolver';
import {AuthGuard} from '../auth/auth.guard';

const routes: Routes = [
  {path: '',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    resolve: {boards: BoardsResolver}},
  {path: ':id',
    component: BoardDetailComponent,
    canActivate: [AuthGuard],
    resolve: {data: BoardResolver},
    children: [
      {path: 'new', component: ColumnEditComponent},
    ]
  },
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class DashboardRoutingModule {
}
