import { put } from "redux-saga/effects"
import { ReduxAction } from "../../utility/type"
import * as actionCreators from "../actions"
import * as serviceCreators from "./services"
import { toast } from "react-toastify"

// login user
export function* loginUserSagaCall(action: ReduxAction): any {
  try {
    yield put(actionCreators.isLoading({ loading: true }))
    const res = yield serviceCreators.loginUserService(action.data)
    if (res && res?.status === 201) {
      yield put(actionCreators.isLoggedIn({ login: true }))
      yield put(actionCreators.isLoading({ loading: false }))
      return toast.success("Logged In Successfully")
    }
    yield put(actionCreators.isLoading({ loading: false }))
  } catch (error) {
    toast.error(`${error}`)
  }
}

// register user
export function* registerUserSagaCall(action: ReduxAction): any {
  try {
    yield put(actionCreators.isLoading({ loading: true }))
    const res = yield serviceCreators.registerUserService(action.data)
    if (res && res?.status === 201) {
      yield put(actionCreators.isLoggedIn({ login: true }))
      yield put(actionCreators.isLoading({ loading: false }))
      return toast.success("User Registerd Successfully")
    }
    yield put(actionCreators.isLoading({ loading: false }))
  } catch (error) {
    toast.error(`${error}`)
  }
}
