import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, map, switchMap, withLatestFrom } from 'rxjs/operators';
import { Service, services } from '../../models';
import { ValueProducerService } from '../../services';
import { ServiceActions } from '../actions';
import * as fromRoot from '../reducers';
import { ServiceSelectors } from '../selectors';

@Injectable()
export class ServiceEffects {
  constructor(
    private action$: Actions,
    private store: Store<fromRoot.State>,
    private valueProducer: ValueProducerService
  ) {
    services.forEach(
      service => (this[`getValue${service}`] = this.getValue(service))
    );
  }

  private getValue(service: Service) {
    return createEffect(() =>
      this.action$.pipe(
        ofType(ServiceActions.getValue(service)),
        withLatestFrom(
          this.store
            .select(ServiceSelectors.getDelayByService)
            .pipe(map(delayByService => delayByService[service])),
          this.store
            .select(ServiceSelectors.getErrorProbabilityByService)
            .pipe(
              map(
                errorProbabilityByService => errorProbabilityByService[service]
              )
            )
        ),
        switchMap(([action, delay, errorProbability]) =>
          this.valueProducer.getValue(delay, errorProbability).pipe(
            map(value => ServiceActions.getValueSuccess(service)({ value })),
            catchError(error =>
              of(ServiceActions.getValueFailure(service)({ error }))
            )
          )
        )
      )
    );
  }
}
