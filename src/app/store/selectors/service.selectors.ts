import { createSelector } from '@ngrx/store';
import { Service, services } from '../../models';
import * as fromRoot from '../reducers';
import * as fromService from '../reducers/service.reducer';

export const getState = (state: fromRoot.State) =>
  services.reduce(
    (res, service) => ({ ...res, service: state[service] }),
    {}
  ) as { [S in Service]: fromService.State };

export const getPending = createSelector(
  getState,
  state =>
    services.reduce(
      (res, service) => ({
        ...res,
        [service]: fromService.getPending(state[service])
      }),
      {}
    ) as { [S in Service]: boolean }
);
