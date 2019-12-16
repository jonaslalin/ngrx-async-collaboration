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
        [delay]="(delayByService$ | async)[service]"
        [errorProbability]="(errorProbabilityByService$ | async)[service]"
        [pending]="(pendingByService$ | async)[service]"
        [value]="(valueByService$ | async)[service]"
        [error]="(errorByService$ | async)[service]"
        (delayChange)="onDelayChange(service, $event)"
        (errorProbabilityChange)="onErrorProbabilityChange(service, $event)"
        (getValue)="onGetValue(service)"
      ></app-service>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  services = services;
  delayByService$ = this.store.select(
    fromStore.ServiceSelectors.getDelayByService
  );
  errorProbabilityByService$ = this.store.select(
    fromStore.ServiceSelectors.getErrorProbabilityByService
  );
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

  onDelayChange(service: Service, delay: number) {
    this.store.dispatch(
      fromStore.ServiceActions.updateDelay(service)({ delay })
    );
  }

  onErrorProbabilityChange(service: Service, errorProbability: number) {
    this.store.dispatch(
      fromStore.ServiceActions.updateErrorProbability(service)({
        errorProbability
      })
    );
  }

  onGetValue(service: Service) {
    this.store.dispatch(fromStore.ServiceActions.getValue(service)());
  }
}
