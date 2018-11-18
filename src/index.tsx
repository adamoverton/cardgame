import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import { createStore } from 'redux';
import { reducer }  from './reducers/GameReducer';
import { StoreState } from './types/StoreState';
import HeroHp from './containers/HeroHp';
import { Provider } from 'react-redux';

const store = createStore<StoreState, any, any, any>(reducer as any, {
  hp: 50,
});


ReactDOM.render(
  <Provider store={store}>
    <HeroHp />
  </Provider>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
