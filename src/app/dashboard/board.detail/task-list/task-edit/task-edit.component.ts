import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {ModalService} from "../../../../services/modal.service";

@Component({
  selector: 'app-task-edit',
  templateUrl: './task-edit.component.html',
  styleUrls: ['./task-edit.component.scss']
})
export class TaskEditComponent implements OnInit {
  display$: Observable<'open' | 'close'>;
  constructor( public modalService: ModalService,) { }

  ngOnInit(): void {
    this.display$ = this.modalService.watch();
  }

  onSubmit() {

  }

  onClose() {
    this.modalService.close();
  }
}
