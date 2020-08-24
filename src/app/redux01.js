import { store } from "../store";

// console.log("store", store);
// debugger;
store.stateEmitter.on("new_state", () =>
  console.log("New State ", store.state)
);
store.dispatch({ type: "setName", payload: "Ashish Dutta" });
