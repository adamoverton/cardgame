import * as React from 'react';
import * as ReactDOM from 'react-dom';
import registerServiceWorker from 'src/registerServiceWorker';
import { Provider } from 'react-redux';
import { configureStore } from "src/redux/configureStore";
import { GameView } from "src/components/GameView";

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <GameView />
  </Provider>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
