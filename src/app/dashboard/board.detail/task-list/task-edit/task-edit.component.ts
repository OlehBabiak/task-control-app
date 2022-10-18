import {Component, Input, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {ModalService} from "../../../../services/modal.service";
import {NgForm} from "@angular/forms";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {BoardService} from "../../../../services/board.service";

@Component({
  selector: 'app-task-edit',
  templateUrl: './task-edit.component.html',
  styleUrls: ['./task-edit.component.scss']
})
export class TaskEditComponent implements OnInit {
  display$: Observable<'open' | 'close' | 'openTask' | 'closeTask'>;
  editMode = this.modalService.boardIndex
  status: string
  id: number;
  qq = true

  constructor(
    public modalService: ModalService,
    private route: ActivatedRoute,
    private boardService: BoardService,
    private router: Router
  ) {
  }

  ngOnInit():void {
    this.route.params
      .subscribe((params: Params) => {
        this.status = params.id
      })
    this.route.parent.params
      .subscribe((params: Params) => {
        this.id = +params.id
      })
    this.display$ = this.modalService.watch();
  }

  onSubmit(form:NgForm) {

    this.boardService.addTask(this.id, form.value.name, this.status)
    this.modalService.close('closeTask');
    this.router.navigate(['../'], {relativeTo: this.route})
  }

  onClose() {
    this.modalService.close('closeTask');
    this.router.navigate(['../'], {relativeTo: this.route})
  }
}
