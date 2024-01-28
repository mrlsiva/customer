import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ToastrComponent } from 'src/app/shared/components/toastr/toastr.component';
import { ToastExtraConfig } from 'src/app/shared/interface/toast-extra-config';

@Injectable({
  providedIn: 'root'
})
export class AppToastrService {

  config = {
		disableTimeOut: false,
		tapToDismiss: false,
    closeButton: true,
    timeOut: 3000,
		extra: {
			showProfile: false,
			messageType: 'info',
			showTitle: true,
		},
		toastComponent: ToastrComponent,
	};
  constructor(private toastr: ToastrService) {}

	private notification(title: string, message: any, config?: any ) {
    /** Combain existing extra config with the received extra config */
		const dataConfig = config
			? Object.assign({}, this.config.extra, config)
      : this.config.extra;
    this.config.extra = dataConfig

    /** Overwrite the global config */
    for (const key in dataConfig) {
      if (key != 'extra' && this.config.hasOwnProperty(key)) {
        (this.config as any)[key] = dataConfig[key]
      }
    };

    /** Execute toastr */
		this.toastr.show(
			message,
			this.config.extra.showTitle ? title.toLowerCase() : '',
			this.config
		);
  }

  /** Success Toastr */
	success(message: any, config?: ToastExtraConfig): void {
		this.notification('success', message, config);
  }

  /** Error Toastr */
  error(message: any, config?: ToastExtraConfig): void {
		this.notification('error', message, config);
  }

  /** Info Toastr */
  info(message: any, config?: ToastExtraConfig): void {
		this.notification('info', message, config);
	}
}
