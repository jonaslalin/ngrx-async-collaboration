import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { Service, services } from '../../models';
import { ValueProducerService } from '../../services';
import { ServiceActions } from '../actions';

@Injectable()
export class ServiceEffects {
  constructor(
    private action$: Actions,
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
        switchMap(({ delay, errorProbability }) =>
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
