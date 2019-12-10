import { createSelector } from '@ngrx/store';
import { Service, services } from '../../models';
import * as fromRoot from '../reducers';
import * as fromService from '../reducers/service.reducer';

export const getPending = createSelector(
  fromRoot.getState,
  state =>
    services.reduce(
      (res, service) => ({
        ...res,
        [service]: fromService.getPending(state[service])
      }),
      {}
    ) as { [S in Service]: boolean }
);
