import {Component, Input, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {ModalService} from "../../../../services/modal.service";
import {FormArray, FormControl, FormGroup, NgForm} from "@angular/forms";
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
  boardId: number;
  taskForm: FormGroup

  constructor(
    public modalService: ModalService,
    private route: ActivatedRoute,
    private boardService: BoardService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.route.params
      .subscribe((params: Params) => {
        console.log('status ', params)
        this.status = params.id
      })
    this.route.parent.params
      .subscribe((params: Params) => {
        console.log('id ', +params.id)
        this.boardId = +params.id
      })
    console.log(this.route)
    this.display$ = this.modalService.watch();
    this.initForm()
  }

  private initForm() {
    this.taskForm = new FormGroup({
      'name': new FormControl(null),
      'description': new FormControl(null),
      'comments': new FormArray([])
    })
  }

  onAddComment() {
    console.log('comm added')
    const formGroup = new FormGroup({
      'comment': new FormControl(null),
    });
    (<FormArray>this.taskForm.get('comments')).push(formGroup)
  }

  get controls() {
    return (this.taskForm.get('comments') as FormArray).controls;
  }

  onDeleteIngredient(index: number) {
    (<FormArray>this.taskForm.get('comments')).removeAt(index)
  }

  onDeleteIngredients() {
    (<FormArray>this.taskForm.get('comments')).clear()
  }

  onSubmit() {
    if (this.editMode === null) {
      this.boardService.addTask(this.boardId, this.taskForm.value, this.status)
      this.router.navigate(['../'], {relativeTo: this.route})
    } else {
      this.boardService.updateTask()
      this.router.navigate(['../../'], {relativeTo: this.route})
    }

    this.modalService.close('closeTask');
  }

  onClose() {
    this.modalService.close('closeTask');
    if (this.editMode === null) {
      this.router.navigate(['../'], {relativeTo: this.route})
    } else {
      this.router.navigate(['../../'], {relativeTo: this.route})
    }
  }

}


