import {Component, OnDestroy, OnInit} from '@angular/core';
import {DataStorageService} from "../shared/data-storage/data-storage.service";
import {ActivatedRoute,UrlSegment} from "@angular/router";
import {BoardService} from "../services/board.service";
import {ColumnTaskModel} from "../shared/column.task-model";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.scss']
})
export class ArchiveComponent implements OnInit, OnDestroy {

  urlSegment: string
  tasks: ColumnTaskModel[]
  private subscription: Subscription

  constructor(
    private dataStorage: DataStorageService,
    private boardService: BoardService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.route.url
      .subscribe((url: UrlSegment[]) => {
        this.urlSegment = url[0].path
      })

    this.dataStorage.getArchiveTask(this.urlSegment)
      .subscribe({
        next: (res: ColumnTaskModel[]) => this.boardService.setTask(res),
        error: (err) => {
          this.dataStorage.errorSubj.next(err)
        }
      })

    this.subscription = this.boardService
      .tasksChanged
      .subscribe((tasks: ColumnTaskModel[]) => {
        console.log(tasks)
        this.tasks = tasks
      })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }
}
