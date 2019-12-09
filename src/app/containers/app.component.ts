import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromStore from '../store';

@Component({
  selector: 'app-root',
  template: `
    <div class="container mt-4">
      <app-service name="A" (getValue)="getValueA($event)"></app-service>
      <app-service name="B" (getValue)="getValueB($event)"></app-service>
      <app-service name="C" (getValue)="getValueC($event)"></app-service>
    </div>
  `
})
export class AppComponent {
  constructor(private store: Store<fromStore.State>) {}

  getValueA(delay: number) {
    this.store.dispatch(fromStore.ServiceActions.getValue('A')({ delay }));
  }

  getValueB(delay: number) {
    this.store.dispatch(fromStore.ServiceActions.getValue('B')({ delay }));
  }

  getValueC(delay: number) {
    this.store.dispatch(fromStore.ServiceActions.getValue('C')({ delay }));
  }
}
