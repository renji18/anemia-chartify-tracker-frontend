import {
  GetDataInterface,
  SaveDataInterface,
  SendDataInterface,
  saveRequestData,
  sendRequestData,
} from "../../utility/type"
import * as actionTypes from "./actionTypes"

// get Data
export const getDataQuarterly = (): GetDataInterface => ({
  type: actionTypes.GET_DATA_QUARTERLY,
})

// get Data
export const saveDataQuarterly = (data: saveRequestData): SaveDataInterface => ({
  type: actionTypes.SAVE_DATA_QUARTERLY,
  data,
})

// send Data
export const sendDataQuarterly = (data: sendRequestData): SendDataInterface => ({
  type: actionTypes.POST_DATA_QUARTERLY,
  data,
})
