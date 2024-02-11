import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers/root';
import { persistStore } from 'redux-persist';
import { encryptTransform } from 'redux-persist-transform-encrypt';
import config from '../config/Configration';

const configureAppStore = (preloadedState) => {
  let _store;
  const isClient = typeof window !== 'undefined';
  if(isClient) {
    const { persistReducer } = require('redux-persist');
    const storage = require('redux-persist/lib/storage').default;
    const Hashkey = config.Hashkey;
    const persistConfig = {
      key: 'root',
      storage,
      whitelist: ['loggedInUserReducer'],
      blacklist: [],
      transforms: [
        encryptTransform({
          secretKey: Hashkey,
          onError: function (error) {
            console.log(error);
          },
        }),
      ],
    };
    _store = configureStore({
      reducer: persistReducer(persistConfig, rootReducer),
      preloadedState,
      //enhancers: [monitorReducersEnhancer]
    });
    _store.__PERSISTOR = persistStore(_store);
  } else {
    _store = configureStore({
      reducer: rootReducer,
      preloadedState
    });
  }  

  if ("DEV" !== 'production' && module.hot) {
    // if (process.env.NODE_ENV !== 'production' && module.hot) {
    module.hot.accept('./reducers/root', () => store.replaceReducer(rootReducer));
  }

  return _store;
}

const store = configureAppStore();

export { store };