import { IndividualConfig } from 'ngx-toastr';

export interface ToastConfig extends IndividualConfig {
	extra?: {
    showProfile?: boolean;
	};
}
