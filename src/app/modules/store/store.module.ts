import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgRedux, NgReduxModule} from '@angular-redux/store';
import { createLogger } from 'redux-logger';
import {rootReducer, defaultState, State} from './reducers';
import {environment} from '../../../environments/environment';

@NgModule({
  imports: [
    CommonModule,
    NgReduxModule
  ],
  declarations: []
})

export class StoreModule {
  constructor(store: NgRedux<State>) {
    store.configureStore(
      rootReducer,
      defaultState,
      environment.production ? [] : [ createLogger() ]
    );
  }
}
