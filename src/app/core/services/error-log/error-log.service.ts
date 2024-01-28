import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorLogService {

  private subscriptions: Subscription[] = [];

  constructor() { }

  logError(error: any) {
		if (error instanceof HttpErrorResponse) {
			console.error('There was an HTTP error.', error.message, 'Status code:', (<HttpErrorResponse>error).status);
		} else if (error instanceof TypeError) {
			console.error('There was a Type error.', error.message);
		} else if (error instanceof Error) {
			console.error('There was a general error.', error.message);
		} else {
			console.error('Nobody threw an error but something happened!', error);
		}
	}
}
