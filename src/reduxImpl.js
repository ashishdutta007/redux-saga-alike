import { EventEmitter } from "events";
// returns a store, need a reducer and initial state as args.
// we can suppose that initial state is determined by what the reducer returns when no state is provided
// action dispatch updates state using reducer
export const createStore = (reducer, initialState) => {
  return {
    state: reducer(undefined, "redux-init"),
    stateEmitter: new EventEmitter(),
    actionsEmitter: new EventEmitter(),
    dispatch: function (action) {
      debugger;
      console.log("dispatch");
      this.state = reducer(this.state, action);
      // for saga
      this.actionsEmitter.emit(action.type, action);
      this.stateEmitter.emit("new_state");
    }
  };
};
