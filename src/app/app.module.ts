import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import * as fromContainers from './containers';
import * as fromStore from './store';
import { effects } from './store/effects';

@NgModule({
  declarations: [fromContainers.AppComponent],
  imports: [
    BrowserModule,
    StoreModule.forRoot(fromStore.reducersToken, {
      runtimeChecks: fromStore.runtimeChecks
    }),
    EffectsModule.forRoot(effects),
    fromStore.storeDevtoolsModule
  ],
  providers: [
    {
      provide: fromStore.reducersToken,
      useValue: fromStore.reducers
    }
  ],
  bootstrap: [fromContainers.AppComponent]
})
export class AppModule {}
