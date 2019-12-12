import { createAction, props } from '@ngrx/store';
import { Service } from '../../models';

export const getValue = (service: Service) =>
  createAction(
    `[Service ${service}] Get Value`,
    props<{ delay: number; errorProbability: number }>()
  );

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
