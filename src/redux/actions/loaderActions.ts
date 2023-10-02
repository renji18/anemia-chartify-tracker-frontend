import {
  LoaingUserInterface,
  loadingRequest,
} from "../../utility/type"
import * as actionTypes from "./actionTypes"

// confirm login
export const isLoading = (data: loadingRequest): LoaingUserInterface => ({
  type: actionTypes.LOADER,
  data,
})
