// store creation and init
import { createStore } from "./reduxImpl";

const initialState = { name: undefined, userId: 1 };
export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "setName":
      return { ...state, name: action.payload };
    case "setUserSuccess":
      return { ...state, user: action.payload };
    default:
      return state;
  }
};

export const selectUserId = (state) => state.userId;

export const store = createStore(reducer, initialState);
window.store = store;
