import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Service, services } from '../models';
import * as fromStore from '../store';

@Component({
  selector: 'app-root',
  template: `
    <div class="container mt-4">
      <app-service
        *ngFor="let service of services"
        [service]="service"
        [pending]="(pendingByService$ | async)[service]"
        [value]="(valueByService$ | async)[service]"
        [error]="(errorByService$ | async)[service]"
        (getValue)="onGetValue(service, $event)"
      ></app-service>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  services = services;
  pendingByService$ = this.store.select(
    fromStore.ServiceSelectors.getPendingByService
  );
  valueByService$ = this.store.select(
    fromStore.ServiceSelectors.getValueByService
  );
  errorByService$ = this.store.select(
    fromStore.ServiceSelectors.getErrorByService
  );

  constructor(private store: Store<fromStore.State>) {}

  onGetValue(service: Service, { delay, errorProbability }) {
    this.store.dispatch(
      fromStore.ServiceActions.getValue(service)({
        delay,
        errorProbability
      })
    );
  }
}
