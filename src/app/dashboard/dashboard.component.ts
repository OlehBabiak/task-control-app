import { Component, OnInit } from '@angular/core';
import {ModalService} from "../services/modal.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private modalService: ModalService,) { }

  ngOnInit(): void {
  }

  onModalOpen() {
    this.modalService.open(null, 'open')
  }

}
