import { StoreModule } from './store.module';
import { defaultState } from './reducers';
import { createStore } from 'redux';

describe('StoreModule', () => {
  let storeModule: StoreModule;

  beforeEach(() => {
    storeModule = new StoreModule(createStore(null, defaultState, null));
  });

  it('should create an instance', () => {
    expect(storeModule).toBeTruthy();
  });
});
