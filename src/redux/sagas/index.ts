import { takeLatest } from "redux-saga/effects"
import * as actionTypes from "../actions/actionTypes"
import * as dataGenerators from "./dataSaga"
import * as userGenerators from "./userSaga"

export default function* mySaga() {
  yield takeLatest(actionTypes.GET_DATA, dataGenerators.getDataSagaCall)
  yield takeLatest(actionTypes.GET_LINK_TO_DOWNLOAD_DATA, dataGenerators.downloadDataSagaCall)
  yield takeLatest(actionTypes.POST_DATA, dataGenerators.postDataSagaCall)
  yield takeLatest(actionTypes.LOGIN_USER, userGenerators.loginUserSagaCall)
  yield takeLatest(
    actionTypes.REGISTER_USER,
    userGenerators.registerUserSagaCall
  )
}
