import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoaderService } from 'src/app/core/services/loader/loader.service';

@Component({
  selector: 'qdo365-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnInit {

  @Input() config: any = {};
	@Input() message: any = {};
	type: string = 'spinner';
	value: number = 0;
  size: number = 30;
  text: string | null = 'Loading...';
  fullscreen: boolean = false;
  randomColorInterval: any = null;
  subscriptions: Subscription[] = [];

  constructor(
    private loaderService: LoaderService
  ) { }

  ngOnInit(): void {
    const loaderService = this.loaderService.loaderConfig.subscribe(res=>{
      console.log(res);
      this.initConfig(res);
    });
    this.setSubscription(loaderService);
  }

  initConfig(config: { hasOwnProperty?: any; type?: any; value?: any; size?: any; text?: any; fullscreen?: any; }) {
    if (Object.keys(config).length > 0) {
			if (config.hasOwnProperty('type') && config.type) {
				this.type = config.type;
			}
			if (config.hasOwnProperty('value') && config.value) {
        console.log('value', config.value);

				this.value = config.value;
			}
			if (config.hasOwnProperty('size') && config.size) {
				this.size = config.size;
      }
      if (config.hasOwnProperty('text') && config.text) {
				this.text = config.text;
      }
      if (config.hasOwnProperty('fullscreen') && config.fullscreen) {
				this.fullscreen = config.fullscreen;
			}
		}
  }

  ngOnChanges(data: { config: { currentValue: any; }; }) {
    const config = data.config.currentValue;
    this.initConfig(config);
  }

  setSubscription(request: Subscription): void {
    this.subscriptions.push(request);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }


}
