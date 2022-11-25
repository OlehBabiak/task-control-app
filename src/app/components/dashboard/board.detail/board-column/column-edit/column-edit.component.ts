import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {BoardService} from '../../../../../services/board.service';
import {DataStorageService} from '../../../../../shared/data-storage/data-storage.service';
import {BoardModel} from '../../../../../shared/board-model';
import {ErrorModel} from '../../../../../shared/errors/error-model';
import {Store} from '@ngrx/store';
import * as fromError from '../../../store/reducers/error.reducer';
import * as ErrorActions from '../../../store/actions/error.actions';

@Component({
  selector: 'app-column-edit',
  templateUrl: './column-edit.component.html',
  styleUrls: ['./column-edit.component.scss']
})
export class ColumnEditComponent implements OnInit {
  id: string;
  error: ErrorModel | null

  constructor(
    private route: ActivatedRoute,
    private boardService: BoardService,
    private router: Router,
    private dataStorage: DataStorageService,
    private errStore: Store<fromError.ErrorState>
  ) {
  }

  ngOnInit(): void {
    this.route.parent.params
      .subscribe((params: Params) => {
        this.id = params.id
      })
  }

  private transformColumnName(value: string) {
    return value.split(' ').map(value =>
      value.charAt(0).toUpperCase() + value.slice(1)
    ).join('')
  }

  onSubmit(form: NgForm) {
    const colName = this.transformColumnName(form.value.name)
    this.dataStorage.createColumn(this.id, colName)
      .subscribe({
        next: (res: BoardModel) => this.boardService.setBoard(res),
        error: (err) => {
          this.errStore.dispatch(new ErrorActions.SetError(err))
        }
      })
    this.router.navigate(['../'], {relativeTo: this.route})
  }
}
