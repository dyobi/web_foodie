import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { persistStore, persistReducer } from 'redux-persist';
import { PersistGate } from "redux-persist/integration/react";
import storage from 'redux-persist/lib/storage';
import storageSession from 'redux-persist/lib/storage/session';

import App from './components/app';
import Reducers from './reducers';

import './index.css';

const persistConfig = {
  key: 'root',
  storage,
  storageSession
};

const store = createStore(
  persistReducer(persistConfig, Reducers),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

const persistor = persistStore(store);

ReactDOM.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);
