import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  boardIndex: string | null = null;

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

  open(index: string | null, openValue) {
    console.log('index: ', index)
    this.boardIndex = index;
    this.display.next(openValue);
  }

  close(closeValue) {
    this.display.next(closeValue);
  }
}
