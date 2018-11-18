import * as React from 'react';
import * as ReactDOM from 'react-dom';
import 'src/index.css';
import registerServiceWorker from 'src/registerServiceWorker';
import { createStore } from 'redux';
import {initialState, reducer} from 'src/reducers/GameReducer';
import { StoreState } from 'src/types/StoreState';
import HeroHp from 'src/containers/HeroHp';
import { Provider } from 'react-redux';

const store = createStore<StoreState, any, any, any>(reducer as any, initialState);


ReactDOM.render(
  <Provider store={store}>
    <HeroHp />
  </Provider>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
