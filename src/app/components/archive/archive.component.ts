import {Component, OnDestroy, OnInit} from '@angular/core';
import {DataStorageService} from '../../shared/data-storage/data-storage.service';
import {ActivatedRoute, Router} from '@angular/router';
import {BoardService} from '../../services/board.service';
import {ColumnTaskModel} from '../../shared/column.task-model';
import {Observable, Subscription} from 'rxjs';
import {ErrorModel} from "../../shared/errors/error-model";

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.scss']
})
export class ArchiveComponent implements OnInit, OnDestroy {

  tasks$: Observable<ColumnTaskModel[]>;
  error: ErrorModel | null;
  private errorSubscription: Subscription;

  constructor(
    private dataStorage: DataStorageService,
    private boardService: BoardService,
    private route: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.dataStorage.getArchiveTask('archive')
      .subscribe({
        next: (res: ColumnTaskModel[]) => {
          this.boardService.setTask(res)
        },
        error: (err) => {
          this.dataStorage.errorSubj.next(err)
        }
      })

    this.tasks$ = this.boardService.tasksChanged;

    this.errorSubscription = this.dataStorage
      .errorSubj
      .subscribe(err => {
        this.error = err
      })
  };

  onErrorHide(event: null) {
    this.error = event
  };

  ngOnDestroy() {
    if (this.errorSubscription) {
      this.errorSubscription.unsubscribe()
    }
  }

  onDetailShow(index: string) {
    this.router.navigate([index], {relativeTo: this.route})
  }
}
