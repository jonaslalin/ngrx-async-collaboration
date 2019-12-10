import { createReducer, on } from '@ngrx/store';
import { Service } from '../../models';
import { ServiceActions } from '../actions';

export interface State {
  pending: boolean;
  value: number;
  error: any;
}

export const initialState: State = {
  pending: false,
  value: null,
  error: null
};

export const reducer = (service: Service) =>
  createReducer(
    initialState,
    on(ServiceActions.getValue(service), state => ({
      ...state,
      pending: true,
      value: null,
      error: null
    })),
    on(ServiceActions.getValueSuccess(service), (state, { value }) => ({
      ...state,
      pending: false,
      value
    })),
    on(ServiceActions.getValueFailure(service), (state, { error }) => ({
      ...state,
      pending: false,
      error
    }))
  );

export const getPending = (state: State) => state.pending;

export const getValue = (state: State) => state.value;

export const getError = (state: State) => state.error;
