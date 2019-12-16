import { createReducer, on } from '@ngrx/store';
import { Service } from '../../models';
import { ServiceActions } from '../actions';

export interface State {
  delay: number;
  errorProbability: number;
  pending: boolean;
  value: number;
  error: any;
}

export const initialState: () => State = () => ({
  delay: Math.floor(Math.random() * 4) * 1000,
  errorProbability: Math.floor(Math.random() * 5 + 1) / 10,
  pending: false,
  value: null,
  error: null
});

export const reducer = (service: Service) =>
  createReducer(
    initialState(),
    on(ServiceActions.updateDelay(service), (state, { delay }) => ({
      ...state,
      delay
    })),
    on(
      ServiceActions.updateErrorProbability(service),
      (state, { errorProbability }) => ({
        ...state,
        errorProbability
      })
    ),
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

export const getDelay = (state: State) => state.delay;

export const getErrorProbability = (state: State) => state.errorProbability;

export const getPending = (state: State) => state.pending;

export const getValue = (state: State) => state.value;

export const getError = (state: State) => state.error;
