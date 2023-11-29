import { put } from "redux-saga/effects"
import { ReduxAction } from "../../utility/type"
import * as actionCreators from "../actions"
import * as serviceCreators from "./services"
import { toast } from "react-toastify"

// get data
export function* getDataSagaCall(action: ReduxAction): any {
  try {
    yield put(actionCreators.isLoading({ loading: true }))
    const res = yield serviceCreators.getDataService(action?.data)
    if (res && res?.status === 201) {
      if (action?.data == "quarterly") {
        yield put(actionCreators.saveData({ quarterly: res?.data }))
      } else if (action?.data == "monthly") {
        yield put(actionCreators.saveData({ monthly: res?.data }))
      }
    }
    yield put(actionCreators.isLoading({ loading: false }))
  } catch (error) {
    toast.error(`${error}`)
  }
}

// send data
export function* postDataSagaCall(action: ReduxAction): any {
  try {
    yield put(actionCreators.isLoading({ loading: true }))
    const res = yield serviceCreators.postDataService(action?.data?.file)
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

// export data
export function* downloadDataSagaCall(action: ReduxAction): any {
  try {
    yield put(actionCreators.isLoading({ loading: true }))
    const res = yield serviceCreators.downloadDataService()
    if (res && res?.status === 201) {
      const blob = new Blob([res?.data], { type: res?.headers["content-type"] })
      const link = window.URL.createObjectURL(blob)
      yield put(actionCreators.saveLinkToExportData({ link }))
    }
    yield put(actionCreators.isLoading({ loading: false }))
  } catch (error) {
    toast.error(`${error}`)
  }
}
