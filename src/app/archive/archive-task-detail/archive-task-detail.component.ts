import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {ColumnTaskModel} from "../../shared/column.task-model";
import {DataStorageService} from "../../shared/data-storage/data-storage.service";

@Component({
  selector: 'app-archive-task-detail',
  templateUrl: './archive-task-detail.component.html',
  styleUrls: ['./archive-task-detail.component.scss']
})
export class ArchiveTaskDetailComponent implements OnInit {
  task: ColumnTaskModel
  id: string

  @Input() index: number

  constructor(private dataStorage: DataStorageService, private route: ActivatedRoute,) {
  }

  ngOnInit(): void {
    this.route.params
      .subscribe((params: Params) => {
        this.id = params['id']
      })

    this.dataStorage.getTaskById(this.id)
      .subscribe({
        next: (res: ColumnTaskModel) => console.log(res),
        error: (err) => {
          this.dataStorage.errorSubj.next(err)
        }
      })
  }

}
