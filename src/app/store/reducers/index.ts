import { InjectionToken } from '@angular/core';
import { ActionReducerMap } from '@ngrx/store';
import { Service, servicesReduce } from '../../models';
import * as fromService from './service.reducer';

export type ServiceState = {
  [S in Service]: fromService.State;
};

export type State = ServiceState;

export const reducers: ActionReducerMap<State> = servicesReduce(
  fromService.reducer
);

export const reducersToken = new InjectionToken<ActionReducerMap<State>>(
  'Reducers Token'
);
