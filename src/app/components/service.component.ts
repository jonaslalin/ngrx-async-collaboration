import { Component, EventEmitter, Input, Output } from '@angular/core';

let instanceCounter = 0;

@Component({
  selector: 'app-service',
  template: `
    <div class="card mb-3">
      <div class="card-header">Service {{ name }}</div>
      <div class="card-body">
        <form class="form-inline">
          <label [attr.for]="id" class="mr-2">Delay</label>
          <input
            type="number"
            min="0"
            step="1000"
            [attr.value]="initialValue"
            [attr.id]="id"
            class="form-control mr-2"
            #delay
          />
          <button
            type="button"
            class="btn btn-primary"
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
  @Input() name: string;
  @Output() getValue = new EventEmitter<number>();
  id = `delay-${instanceCounter++}`;
  initialValue = Math.floor(Math.random() * 5) * 1000;

  onClick(delay: string) {
    this.getValue.next(Math.max(parseInt(delay, 10), 0));
  }
}
