import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {BoardService} from "../../../services/board.service";

@Component({
  selector: 'app-column-edit',
  templateUrl: './column-edit.component.html',
  styleUrls: ['./column-edit.component.scss']
})
export class ColumnEditComponent implements OnInit {
  @ViewChild('form', {static: false}) addColumnForm: NgForm;
  id: number;

  constructor(private route: ActivatedRoute, private boardService: BoardService, private router: Router) {
  }

  ngOnInit(): void {
    this.route.parent.params
      .subscribe((params: Params) => {
        this.id = +params.id
      })
  }

  onSubmit() {
    this.router.navigate(['../'], {relativeTo: this.route})
    this.boardService.addBoardColumn(this.id, this.addColumnForm.value)
  }
}
