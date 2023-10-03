import { put } from "redux-saga/effects"
import { ReduxAction } from "../../utility/type"
import * as actionCreators from "../actions"
import * as serviceCreators from "./services"
import { toast } from "react-toastify"

// get data
export function* getDataSagaCall(action: ReduxAction): any {
  try {
    yield put(actionCreators.isLoading({ loading: true }))
    const res = yield serviceCreators.getDataService()
    console.log(res, "YOOO RES")
    if (res && res?.status === 201) {
      yield put(actionCreators.saveData(res?.data))
    }
    yield put(actionCreators.isLoading({ loading: false }))
  } catch (error) {
    toast.error(`${error}`)
  }
}

// send data
export function* sendDataSagaCall(action: ReduxAction): any {
  try {
    yield put(actionCreators.isLoading({ loading: true }))
    const res = yield serviceCreators.sendDataService(action?.data?.file)
    if (res && (res?.status === 201 || res?.status === 200)) {
      if (res?.data?.status === "SUCCESS") {
        toast.success("Data Stored Successfully")
      }
    }
    yield put(actionCreators.isLoading({ loading: false }))
  } catch (error) {
    toast.error(`${error}`)
  }
}
