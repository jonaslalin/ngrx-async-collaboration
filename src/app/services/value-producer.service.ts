import { Injectable } from '@angular/core';
import { of, throwError } from 'rxjs';
import { delay as delayFn, mergeMap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ValueProducerService {
  counter = 0;

  getValue(delay: number, errorProbability: number) {
    return of(this.counter++).pipe(
      delayFn(delay),
      mergeMap(value => {
        if (Math.random() < errorProbability) {
          return throwError('It borked!');
        }
        return of(value);
      })
    );
  }
}
