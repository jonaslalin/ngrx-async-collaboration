import { InjectionToken } from '@angular/core';
import { ActionReducerMap } from '@ngrx/store';
import { Service, services } from '../../models';
import * as fromService from './service.reducer';

export type State = {
  [S in Service]: fromService.State;
};

export const reducers = services.reduce(
  (res, service) => ({ ...res, [service]: fromService.reducer(service) }),
  {}
) as ActionReducerMap<State>;

export const reducersToken = new InjectionToken<ActionReducerMap<State>>(
  'Reducers Token'
);

export const getState = (state: State) => state;
