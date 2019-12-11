import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import { Service } from '../models';

let instanceCounter = 0;

@Component({
  selector: 'app-service',
  template: `
    <div class="card mb-4">
      <div class="card-header">Service {{ service }}</div>
      <div class="card-body">
        <div class="float-left">
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
          <div class="mt-3">
            <div *ngIf="pending" class="alert alert-info mb-0" role="alert">
              <span
                class="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              ></span>
              Loading...
            </div>
            <div
              *ngIf="value != null"
              class="alert alert-success mb-0"
              role="alert"
            >
              Value: {{ value }}
            </div>
            <div
              *ngIf="error != null"
              class="alert alert-danger mb-0"
              role="alert"
            >
              Error: {{ error }}
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ServiceComponent {
  @Input() service: Service;
  @Input() pending: boolean;
  @Input() value: number;
  @Input() error: any;
  @Output() getValue = new EventEmitter<number>();
  id = `delay-${instanceCounter++}`;
  initialValue = Math.floor(Math.random() * 5) * 1000;

  onClick(delay: string) {
    this.getValue.next(Math.max(parseInt(delay, 10), 0));
  }
}
