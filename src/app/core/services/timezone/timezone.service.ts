import { Injectable } from '@angular/core';
import * as moment from 'moment-timezone';

@Injectable({
	providedIn: 'root',
})
export class TimezoneService {
	userTimeZone: any = null;
	userTimeZoneCode:any = null;

	constructor() {
		this.userTimeZone = moment.tz.guess();
		this.userTimeZoneCode = this.getTimeZoneCode(this.userTimeZone)
	}

	currentDate(timezone = this.userTimeZone) {
		return moment.tz(new Date().toISOString(), 'YYYY-MM-DD HH:mm:ss', timezone).toDate();
	}

	utcToLocalOld(value: string, format = 'YYYY-MM-DD HH:mm:ss', timezone=null) {
		let date_str = value.replace(' ', 'T');
		let date = moment(date_str + 'Z').tz(timezone ? timezone : this.userTimeZone);
		return new Date(date.format(format.replace(' ', 'T')));
	}

	utcToLocal(value: any, format = 'YYYY-MM-DD HH:mm:ss', timezone=null) {
		return moment.tz(
			value,
			format,
			timezone ? timezone : this.userTimeZone
		).toDate();
	}

	utcToLocalISO(value: string, format = 'YYYY-MM-DD HH:mm:ss', timezone=null) {
		let date_str = value.replace(' ', 'T');
		let date = moment(date_str + 'Z').tz(timezone ? timezone : this.userTimeZone);
		return date.format(format.replace(' ', 'T'));
	}

	momentTime(date: string) {
		return moment(date + 'Z');
	}

	getUtc(	format = 'YYYY-MM-DD HH:mm:ss'){
		let date = moment(new Date).utc();
		return date.format(format);
	}
	getTimeZoneCode(time_zone: any){
		return moment.tz(time_zone).format('z');
	}

	getUtcOffset(time_zone: any){
		return moment.tz(time_zone).format('Z');
	}
}
