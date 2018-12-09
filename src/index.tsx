import * as React from 'react';
import * as ReactDOM from 'react-dom';
import 'src/index.css';
import registerServiceWorker from 'src/registerServiceWorker';
import { Provider } from 'react-redux';
import { initialState } from 'src/reducers/GameReducer';
import { GameView } from 'src/containers/GameView';
import { configureStore } from 'src/configureStore';

const store = configureStore(initialState);

ReactDOM.render(
  <Provider store={store}>
    <GameView />
  </Provider>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
