import { call, select, put, take } from "../sagaEffects";
import { getUserAsync } from "./api";
import { store, selectUserId } from "../store";
import { runSaga } from "../reduxSagaImpl";

const showUserName = (user) => {
  console.log("User:", user.name);
};

const greet = "baby mama";

function* mySaga(sweet, greet) {
  console.log(sweet, greet);
  // wait for action dispatch to resume saga
  yield take("getUser");
  // read state
  const userId = yield select(selectUserId);
  // call async/sync functions
  const user = yield call(getUserAsync, userId);
  yield call(showUserName, user);
  // dispatch action
  yield put({ type: "setUserSuccess", payload: user });
}

runSaga(store, mySaga, "yo!! shawty ", greet);

store.dispatch({ type: "getUser" });
