import { createSelector } from '@ngrx/store';
import { servicesReduce } from '../../models';
import * as fromRoot from '../reducers';
import * as fromService from '../reducers/service.reducer';

export const getStateByService = (state: fromRoot.State) =>
  servicesReduce(service => state[service]);

export const getPendingByService = createSelector(getStateByService, state =>
  servicesReduce(service => fromService.getPending(state[service]))
);

export const getValueByService = createSelector(getStateByService, state =>
  servicesReduce(service => fromService.getValue(state[service]))
);

export const getErrorByService = createSelector(getStateByService, state =>
  servicesReduce(service => fromService.getError(state[service]))
);
