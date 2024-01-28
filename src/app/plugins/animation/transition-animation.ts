import { animation, style, animate, trigger, transition, useAnimation } from '@angular/animations';

export const transitionAnimation = [
	trigger(
		'fadeAnimation', [
		transition(':enter', [
			style({ opacity: 0}),
			animate('250ms', style({ opacity: 1 }))
		]),
		transition(':leave', [
			style({ color:'green', opacity: 1}),
			animate('500ms', style({ opacity: 0 }))
		])
	]
	)
];
