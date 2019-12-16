import { createAction, props } from '@ngrx/store';
import { Service } from '../../models';

export const updateDelay = (service: Service) =>
  createAction(`[Service ${service}] Update Delay`, props<{ delay: number }>());

export const updateErrorProbability = (service: Service) =>
  createAction(
    `[Service ${service}] Update Error Probability`,
    props<{ errorProbability: number }>()
  );

export const getValue = (service: Service) =>
  createAction(`[Service ${service}] Get Value`);

export const getValueSuccess = (service: Service) =>
  createAction(
    `[Service ${service}] Get Value Success`,
    props<{ value: number }>()
  );

export const getValueFailure = (service: Service) =>
  createAction(
    `[Service ${service}] Get Value Failure`,
    props<{ error: any }>()
  );
