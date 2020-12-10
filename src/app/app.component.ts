import {Component, OnDestroy, OnInit} from '@angular/core';
import { MediaObserver, MediaChange } from '@angular/flex-layout';
import { Subscription } from 'rxjs';
import {AlertService} from '@full-fledged/alerts';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'super-food-frontend';

  mediaSub: Subscription;
  deviceXs: boolean;
  constructor(public mediaObserver: MediaObserver, private alertService: AlertService) { }

  ngOnInit(): void {
    this.mediaSub = this.mediaObserver.media$.subscribe((res: MediaChange) => {
      // console.log(res.mqAlias);
      this.deviceXs = res.mqAlias === 'xs';
    });

    // this.showAlerts();
  }
  showAlerts(): void{
    this.alertService.info('this is an info alert');
    this.alertService.danger('this is a danger alert');
    this.alertService.success('this is a success alert');
    this.alertService.warning('this is a warning alert');
  }
  ngOnDestroy(): void {
    this.mediaSub.unsubscribe();
  }
}
