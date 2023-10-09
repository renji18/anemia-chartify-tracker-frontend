import {
  GetDataInterface,
  SaveDataInterface,
  SendDataInterface,
  saveRequestData,
  sendRequestData,
} from "../../utility/type"
import * as actionTypes from "./actionTypes"

// get Data
export const getData = ({ typeOf }: { typeOf: String }): GetDataInterface => ({
  type: actionTypes.GET_DATA,
  data: typeOf,
})

// get Data
export const saveData = (
  data: saveRequestData
): SaveDataInterface => ({
  type: actionTypes.SAVE_DATA,
  data,
})

// send Data
export const sendData = (data: sendRequestData): SendDataInterface => ({
  type: actionTypes.POST_DATA,
  data,
})
