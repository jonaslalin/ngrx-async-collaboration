import { RuntimeChecks } from '@ngrx/store';

export const runtimeChecks: RuntimeChecks = {
  strictStateImmutability: true,
  strictActionImmutability: true,
  strictStateSerializability: true,
  strictActionSerializability: true
};
