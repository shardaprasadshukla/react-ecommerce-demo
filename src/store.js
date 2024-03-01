import { createStore, applyMiddleware  } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './service/reducer/reducers'; 

export const thunkMW = (store) => (next) => (action) => {
    if (typeof action === "function") {
      return action(store.dispatch);
    } else {
      next(action);
    }
  };

const store = createStore(rootReducer, applyMiddleware(thunkMW));

export default store;

