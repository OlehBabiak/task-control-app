import {Component, Input, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {ModalService} from "../../../../services/modal.service";
import {FormArray, FormControl, FormGroup, NgForm} from "@angular/forms";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {BoardService} from "../../../../services/board.service";
import {DataStorageService} from "../../../../shared/data-storage/data-storage.service";
import {ColumnTaskModel} from "../../../../shared/column.task-model";
import {BoardModel} from "../../../../shared/board-model";

@Component({
  selector: 'app-task-edit',
  templateUrl: './task-edit.component.html',
  styleUrls: ['./task-edit.component.scss']
})
export class TaskEditComponent implements OnInit {
  display$: Observable<'open' | 'close' | 'openTask' | 'closeTask'>;
  editMode = this.modalService.boardIndex
  status: string
  boardId: string;
  taskForm: FormGroup

  constructor(
    public modalService: ModalService,
    private route: ActivatedRoute,
    private boardService: BoardService,
    private dataStorage: DataStorageService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    if (this.modalService.column) {
      this.status = this.modalService.column.name;
      this.boardId = this.modalService.column.boardID
    }

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
    if (this.modalService.boardIndex === null) {
      const {boardID, name} = this.modalService.column
      const newTask = new ColumnTaskModel(boardID, this.taskForm.value.name, name)
      this.dataStorage.createTask(newTask)
        .subscribe({
          next: (res: BoardModel) => this.boardService.setBoard(res),
          error: (err) => {
            this.dataStorage.errorSubj.next(err)
          }
        })
    } else {
      const {status, _id, boardID} = this.modalService.task
      const updatedTask = new ColumnTaskModel(boardID, this.taskForm.value.name, status, this.taskForm.value.description, _id, this.taskForm.value.comments)
      this.dataStorage.updateTask(updatedTask)
        .subscribe({
          next: (res: BoardModel) => this.boardService.setBoard(res),
          error: (err) => {
            this.dataStorage.errorSubj.next(err)
          }
        })
    }
    this.modalService.close('closeTask');
  }

  onClose() {
    this.modalService.close('closeTask');
  }

}


