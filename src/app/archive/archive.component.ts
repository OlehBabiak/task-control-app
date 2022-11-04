import {Component, OnDestroy, OnInit} from '@angular/core';
import {DataStorageService} from '../shared/data-storage/data-storage.service';
import {ActivatedRoute, Router} from '@angular/router';
import {BoardService} from '../services/board.service';
import {ColumnTaskModel} from '../shared/column.task-model';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.scss']
})
export class ArchiveComponent implements OnInit, OnDestroy {

  tasks: ColumnTaskModel[]
  isLoading = false;
  private subscription: Subscription

  constructor(
    private dataStorage: DataStorageService,
    private boardService: BoardService,
    private route: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.isLoading = true
    this.dataStorage.getArchiveTask('archive')
      .subscribe({
        next: (res: ColumnTaskModel[]) => {
          this.isLoading = false;
          this.boardService.setTask(res)
        },
        error: (err) => {
          this.isLoading = false;
          this.dataStorage.errorSubj.next(err)
        }
      })

    this.subscription = this.boardService
      .tasksChanged
      .subscribe((tasks: ColumnTaskModel[]) => {
        this.tasks = tasks
      })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }

  onDetailShow(index: string) {
    this.router.navigate([index], {relativeTo: this.route})
  }
}
