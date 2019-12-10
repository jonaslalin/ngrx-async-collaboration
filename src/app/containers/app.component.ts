import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Service, services } from '../models';
import * as fromStore from '../store';

@Component({
  selector: 'app-root',
  template: `
    <div class="container mt-4">
      <app-service
        *ngFor="let service of services"
        [service]="service"
        (getValue)="getValue(service, $event)"
      ></app-service>
    </div>
  `
})
export class AppComponent {
  services = services;

  constructor(private store: Store<fromStore.State>) {}

  getValue(service: Service, delay: number) {
    this.store.dispatch(fromStore.ServiceActions.getValue(service)({ delay }));
  }
}
