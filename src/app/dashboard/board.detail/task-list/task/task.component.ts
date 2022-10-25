import {Component, Input, OnInit} from '@angular/core';
import {ColumnTaskModel} from "../../../../shared/column.task-model";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {ModalService} from "../../../../services/modal.service";

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {
  @Input() task: ColumnTaskModel;
  @Input() index: number;
  @Input() columnName: string

  constructor(private router: Router, private route: ActivatedRoute, private modalService: ModalService) {
  }

  ngOnInit(): void {

  }

  onShowDetail() {
    this.router.navigate([`${this.columnName}/${this.index}`], {relativeTo: this.route})
    // this.modalService.open(this.index,'openTask')
  }
}
