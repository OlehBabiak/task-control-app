import { Injectable } from '@angular/core';
import {HttpErrorResponse} from "@angular/common/http";
import {ErrorModel} from "./error-model";
import {throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor() { }

  handleError(errorRes: HttpErrorResponse) {
    const {error, message} = errorRes;
    let err = new ErrorModel(400, 'An unknown error occurred!');
    if (!error || !message) {
      return throwError(() => err);
    }
    if (typeof error === "string") {
      err.errorCode = errorRes.status;
      err.errorMessage = errorRes.message
      return throwError(() => err);
    } else {
      err.errorCode = errorRes.status;
      err.errorMessage = errorRes.error.message
    }
    return throwError(() => err);
  }
}
