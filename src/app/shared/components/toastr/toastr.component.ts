import { Component, OnInit } from '@angular/core';
import {
	animate,
	keyframes,
	state,
	style,
	transition,
	trigger,
} from '@angular/animations';
import {
	Toast,
	ToastrService,
	ToastPackage
} from 'ngx-toastr';
import { ToastConfig } from '../../interface/toast-config';

@Component({
  selector: 'qdo365-toastr',
  templateUrl: './toastr.component.html',
  styleUrls: ['./toastr.component.scss'],
  animations: [
		trigger('flyInOut', [
			state(
				'inactive',
				style({
					opacity: 0,
				})
			),
			transition(
				'inactive => active',
				animate(
					'400ms ease-out',
					keyframes([
						style({
							transform: 'translate3d(100%, 0, 0) skewX(-30deg)',
							opacity: 0,
						}),
						style({
							transform: 'skewX(20deg)',
							opacity: 1,
						}),
						style({
							transform: 'skewX(-5deg)',
							opacity: 1,
						}),
						style({
							transform: 'none',
							opacity: 1,
						}),
					])
				)
			),
			transition(
				'active => removed',
				animate(
					'400ms ease-out',
					keyframes([
						style({
							opacity: 1,
						}),
						style({
							transform: 'translate3d(100%, 0, 0) skewX(30deg)',
							opacity: 0,
						}),
					])
				)
			),
		]),
	],
	preserveWhitespaces: false,
})
export class ToastrComponent extends Toast implements OnInit {

  tConfig!: ToastConfig;
  constructor(
		public override toastrService: ToastrService,
		public override toastPackage: ToastPackage
	) {
		super(toastrService, toastPackage);
	}

	ngOnInit(): void {
		this.tConfig = this.options;
	}

}
