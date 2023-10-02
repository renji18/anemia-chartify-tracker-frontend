import { put } from "redux-saga/effects"
import { ReduxAction } from "../../utility/type"
import * as actionCreators from "../actions"
import * as serviceCreators from "./services"
import { toast } from "react-toastify"

// login user
export function* loginUserSagaCall(action: ReduxAction): any {
  try {
    const res = yield serviceCreators.loginUserService(action.data)
    if (res && res?.status === 201) {
      yield put(actionCreators.isLoggedIn({ login: true }))
      return toast.success("Logged In Successfully")
    } else if (res && res?.status === 404) return toast.warn("User Not Found")
    else if (res && res?.status === 401) return toast.warn("Invalid Password")
    else return toast.warn("Error Connecting to Database")
  } catch (error) {
    toast.error(`${error}`)
  }
}

// register user
export function* registerUserSagaCall(action: ReduxAction): any {
  try {
    const res = yield serviceCreators.registerUserService(action.data)
    if (res && res?.status === 201) {
      yield put(actionCreators.isLoggedIn({ login: true }))
      return toast.success("User Registerd Successfully")
    } else if (res && res?.status === 401)
      return toast.warn("User Already Exists")
    else return toast.warn("Error Connecting to Database")
  } catch (error) {
    toast.error(`${error}`)
  }
}
