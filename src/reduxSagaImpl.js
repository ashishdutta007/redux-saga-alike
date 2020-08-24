export async function runSaga(store, saga, ...args) {
  const waitNextAction = (actionType) =>
    new Promise((resolve) => {
      // ?? why registering listner here
      debugger;
      console.log("prms");
      store.actionsEmitter.once(actionType, resolve);
    });
  try {
    // returns an iterator/generator object
    // console.log(args);
    const it = saga(...args);
    // initiate saga execution
    let result = it.next();
    while (!result.done) {
      const effect = result.value;
      switch (effect.type) {
        case "fork":
          runSaga(store, effect.saga, ...effect.args);
          result = it.next();
          break;
        case "take":
          console.log("take");
          await waitNextAction(effect.actionType);
          result = it.next();
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
