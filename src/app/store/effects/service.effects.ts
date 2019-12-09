import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { ValueProducerService } from '../../services';
import { ServiceActions } from '../actions';

@Injectable()
export class ServiceEffects {
  getValueA$ = this.getValue('A', 0.1);
  getValueB$ = this.getValue('B', 0.2);
  getValueC$ = this.getValue('C', 0.5);
  getValueD$ = this.getValue('D', 0.0);

  constructor(
    private action$: Actions,
    private valueProducer: ValueProducerService
  ) {}

  private getValue(name: string, errorThreshold: number) {
    return createEffect(() =>
      this.action$.pipe(
        ofType(ServiceActions.getValue(name)),
        switchMap(({ delay }) =>
          this.valueProducer.getValue(delay, errorThreshold).pipe(
            map(value => ServiceActions.getValueSuccess(name)({ value })),
            catchError(error =>
              of(ServiceActions.getValueFailure(name)({ error }))
            )
          )
        )
      )
    );
  }
}
