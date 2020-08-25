import { call, select, put, take } from "../sagaEffects";
import { getUserAsync } from "./api";
import { store, selectUserId } from "../store";
import { runSaga, takeEvery } from "../reduxSagaImpl";

const showUserName = (user) => {
  console.log("User:", user.name);
};

const displayCurrentState = () => {
  console.log("state ", store.state);
};

function* userSaga() {
  // wait for "getUser" action dispatch to resume saga
  yield take("getUser");
  // read state
  const userId = yield select(selectUserId);
  // call async function
  const user = yield call(getUserAsync, userId);
  // call sync function
  yield call(showUserName, user);
  // dispatch action
  yield put({ type: "setUserSuccess", payload: user });
  yield call(displayCurrentState);
}

// runs on initial exec by runSaga
function* mainSaga(greet) {
  console.log("Welcome to mainSaga", greet);
  // yield* will not return effect
  // but run "takeEvery" helper saga
  yield* takeEvery("getUser", userSaga);
}

runSaga(store, mainSaga, "baby mama!! xoxo ..");
store.dispatch({ type: "getUser" });
store.dispatch({ type: "getUser" });
