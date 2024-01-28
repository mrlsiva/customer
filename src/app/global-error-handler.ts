import {ErrorHandler, Injectable} from '@angular/core';
import { ErrorLogService } from './core/services/error-log/error-log.service';

declare global {
	interface Window {
		newrelic:any;
	}
}

@Injectable()
export class GlobalErrorHandler extends ErrorHandler {
    constructor(private errorLogService: ErrorLogService) {
        super();
		}

		override handleError(error: any) {
			super.handleError(error);
			// window.newrelic.noticeError(error)
			this.errorLogService.logError(error);
		}
}
