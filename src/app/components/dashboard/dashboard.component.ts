import {Component} from '@angular/core';
import {ModalService} from '../../services/modal.service';
import {BOARDS_SORT_VALUES} from '../../constants/constants';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  sortValues: string[] = BOARDS_SORT_VALUES;
  filter: string = '';
  sort: string = ''

  constructor(private modalService: ModalService) {
  }

  onModalOpen() {
    this.modalService.open(null, 'open')
  }

  sortValueChange(e) {
    this.sort = e.target.value
  }

  filterChange(e) {
    this.filter = e.target.value
  }
}
