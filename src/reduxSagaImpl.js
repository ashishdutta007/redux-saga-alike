import { fork, take } from "./sagaEffects";

// helper saga
export function* takeEvery(actionType, saga) {
  console.log("running takeEvery");
  // fork new saga to create new execution contexts
  // Both saga (the initial one and the new one) will continue to run independently
  // forks a new saga & runs an infinite loop
  // listening to the action <actionType>
  yield fork(function* newSaga() {
    while (true) {
      const action = yield take(actionType);
      // yield* will not return effect but run the saga
      yield* saga(action);
    }
  });
}

export async function runSaga(store, saga, ...args) {
  const waitNextAction = (actionType) =>
    new Promise((resolve) => {
      //"getUser" event listner is registered at the time of running runSaga()
      // saga registers subscriber for actions to be dispatched
      console.log("Register action listener");
      store.actionsEmitter.once(actionType, (action) => {
        console.log("action emitted ", action);
        resolve(action);
      });
      // store.actionsEmitter.on(actionType, resolve);
    });
  try {
    // returns an iterator/generator object
    const it = saga(...args);
    // initiate saga execution
    let result = it.next();
    while (!result.done) {
      const effect = result.value;
      switch (effect.type) {
        case "fork":
          console.log("Forking new saga context");
          runSaga(store, effect.saga, ...effect.args);
          result = it.next();
          break;
        case "take":
          const action = await waitNextAction(effect.actionType);
          result = it.next(action);
          break;
        case "call":
          result = it.next(await effect.fn(...effect.args));
          break;
        case "select":
          result = it.next(effect.selector(store.state));
          break;
        case "put":
          store.dispatch(effect.action);
          result = it.next();
          break;
        default:
          throw new Error(`Invalid effect type : ${effect.type}`);
      }
    }
  } catch (error) {
    console.log("Saga error ", error);
  }
}
