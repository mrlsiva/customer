import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CommonLoggerService } from './core/services/logger/common-logger.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'qdo365-user-frontend';

  constructor(
    private router: Router,
  ) {

    if (environment.production) {
      CommonLoggerService.enableProductionMode();
    }
  }
}
