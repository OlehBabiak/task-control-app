import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {ColumnTaskModel} from '../../../shared/column.task-model';
import {DataStorageService} from '../../../shared/data-storage/data-storage.service';
import {Store} from '@ngrx/store';
import * as fromError from '../../dashboard/store/reducers/error.reducer';

@Component({
  selector: 'app-archive-task-detail',
  templateUrl: './archive-task-detail.component.html',
  styleUrls: ['./archive-task-detail.component.scss']
})
export class ArchiveTaskDetailComponent implements OnInit {
  task: ColumnTaskModel;
  id: string;
  isLoading = false;

  @Input() index: number;

  constructor(
    private dataStorage: DataStorageService,
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromError.ErrorState>
  ) {
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.route.params
      .subscribe((params: Params) => {
        this.id = params['id']
      })

    this.dataStorage.getTaskById(this.id)
      .subscribe({
        next: (res: ColumnTaskModel) => {
          this.isLoading = false;
          this.task = res;
        },
        error: (err) => {
          this.isLoading = false;
          this.store.dispatch(err);
        }
      })
  }

  onGoBack() {
    this.router.navigate(['../'], {relativeTo: this.route})
  }
}
