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
              [attr.id]="'delay-' + id"
              class="form-control"
              [value]="delay"
              (input)="onDelayChange($event.target.value)"
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
              [attr.id]="'error-probability-' + id"
              class="form-control"
              [value]="errorProbability"
              (input)="onErrorProbabilityChange($event.target.value)"
            />
          </div>
          <button type="button" class="btn btn-primary" (click)="onGetValue()">
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
  static instanceCounter = 0;
  id = ServiceComponent.instanceCounter++;
  @Input() service: Service;
  @Input() delay: number;
  @Input() errorProbability: number;
  @Input() pending: boolean;
  @Input() value: number;
  @Input() error: any;
  @Output() delayChange = new EventEmitter<number>();
  @Output() errorProbabilityChange = new EventEmitter<number>();
  @Output() getValue = new EventEmitter<void>();

  onDelayChange(delay: string) {
    this.delayChange.next(parseFloat(delay));
  }

  onErrorProbabilityChange(errorProbability: string) {
    this.errorProbabilityChange.next(parseFloat(errorProbability));
  }

  onGetValue() {
    this.getValue.next();
  }
}
