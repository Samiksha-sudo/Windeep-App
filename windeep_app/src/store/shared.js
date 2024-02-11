import {store} from './configration';

const getStoreState = (key)=> {
  try {
    let state = store.getState();
    switch (key){
      case "loggedInUserReducer":
        return state["loggedInUserReducer"];
      default:
        return state;
    }
  } catch (error) {
    throw error;
  }
}

const setStoreState = (key, payload) => {
    try {
      store.dispatch({
        type: key,
        payload: payload
      });
    } catch (error) {
      throw error;
    }
}

export {setStoreState,getStoreState};