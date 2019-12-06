import { InjectionToken } from '@angular/core';
import { ActionReducerMap } from '@ngrx/store';

export interface State {}

export const reducers: ActionReducerMap<State> = {};

export const reducersToken = new InjectionToken<ActionReducerMap<State>>(
  'Reducers Token'
);
