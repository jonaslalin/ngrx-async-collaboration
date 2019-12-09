import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromStore from '../store';

@Component({
  selector: 'app-root',
  template: `
    <div class="container mt-4">
      <app-service
        *ngFor="let service of services"
        [name]="service"
        (getValue)="getValue(service, $event)"
      ></app-service>
    </div>
  `
})
export class AppComponent {
  services = ['A', 'B', 'C'];

  constructor(private store: Store<fromStore.State>) {}

  getValue(name: string, delay: number) {
    this.store.dispatch(fromStore.ServiceActions.getValue(name)({ delay }));
  }
}
