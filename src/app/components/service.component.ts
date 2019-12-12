import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import { Service } from '../models';

@Component({
  selector: 'app-service',
  template: `
    <div class="card mb-4">
      <div class="card-header">Service {{ service }}</div>
      <div class="card-body">
        <form>
          <div class="form-group">
            <label [attr.for]="'delay-' + id">Delay (ms)</label>
            <input
              type="number"
              min="0"
              step="500"
              [attr.value]="initialDelay"
              [attr.id]="'delay-' + id"
              class="form-control"
              #delay
            />
          </div>
          <div class="form-group">
            <label [attr.for]="'error-probability-' + id">
              Error Probability
            </label>
            <input
              type="number"
              min="0"
              max="1"
              step="0.1"
              [attr.value]="initialErrorProbability"
              [attr.id]="'error-probability-' + id"
              class="form-control"
              #errorProbability
            />
          </div>
          <button
            type="button"
            class="btn btn-primary"
            (click)="onGetValue(delay.value, errorProbability.value)"
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
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ServiceComponent {
  @Input() service: Service;
  @Input() pending: boolean;
  @Input() value: number;
  @Input() error: any;
  @Output() getValue = new EventEmitter<{
    delay: number;
    errorProbability: number;
  }>();
  static instanceCounter = 0;
  id = ServiceComponent.instanceCounter++;
  initialDelay = Math.floor(Math.random() * 4) * 1000;
  initialErrorProbability = Math.floor(Math.random() * 5 + 1) / 10;

  onGetValue(delay: string, errorProbability: string) {
    this.getValue.next({
      delay: Math.max(parseInt(delay, 10), 0),
      errorProbability: Math.max(parseFloat(errorProbability), 0)
    });
  }
}
