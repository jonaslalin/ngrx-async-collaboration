import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Service } from '../models';

let instanceCounter = 0;

@Component({
  selector: 'app-service',
  template: `
    <div class="card mb-4">
      <div class="card-header">Service {{ service }}</div>
      <div class="card-body">
        <form class="form-inline">
          <label [attr.for]="id" class="mr-sm-2">Delay</label>
          <input
            type="number"
            min="0"
            step="1000"
            [attr.value]="initialValue"
            [attr.id]="id"
            class="form-control mr-sm-3"
            #delay
          />
          <button
            type="button"
            class="btn btn-primary mt-3 mt-sm-0"
            (click)="onClick(delay.value)"
          >
            Get Value
          </button>
        </form>
      </div>
    </div>
  `
})
export class ServiceComponent {
  @Input() service: Service;
  @Output() getValue = new EventEmitter<number>();
  id = `delay-${instanceCounter++}`;
  initialValue = Math.floor(Math.random() * 5) * 1000;

  onClick(delay: string) {
    this.getValue.next(Math.max(parseInt(delay, 10), 0));
  }
}
