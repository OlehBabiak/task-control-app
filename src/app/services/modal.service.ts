import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  boardIndex: number;

  constructor() {
  }

  private display: BehaviorSubject<'open' | 'close'> =
    new BehaviorSubject('close');

  watch(): Observable<'open' | 'close'> {
    return this.display.asObservable();
  }

  open(index: number | null) {

    this.boardIndex = index;
    this.display.next('open');
  }

  close() {
    this.display.next('close');
  }
}
