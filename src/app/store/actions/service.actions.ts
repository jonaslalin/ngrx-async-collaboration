import { createAction, props } from '@ngrx/store';

export const getValue = (name: string) =>
  createAction(`[Service ${name}] Get Value`, props<{ delay: number }>());

export const getValueSuccess = (name: string) =>
  createAction(
    `[Service ${name}] Get Value Success`,
    props<{ value: number }>()
  );

export const getValueFailure = (name: string) =>
  createAction(`[Service ${name}] Get Value Failure`, props<{ error: any }>());
