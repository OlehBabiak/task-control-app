import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  boardIndex: number | null = null;

  constructor() {
  }

  private display: BehaviorSubject<
    'open' |
    'close' |
    'openTask' |
    'closeTask'> =
    new BehaviorSubject('close');

  watch(): Observable<'open' | 'close' | 'openTask' | 'closeTask'> {
    return this.display.asObservable();
  }

  open(index: number | null, openValue) {
    this.boardIndex = index;
    this.display.next(openValue);
  }

  close(closeValue) {
    this.display.next(closeValue);
  }
}
