import { UserActions } from "../../utility/type"
import * as actionTypes from "../actions/actionTypes"

// login status reducer
export const loaderReducer = (
  state = { loading: false },
  { type, data }: UserActions
) => {
  switch (type) {
    case actionTypes.LOADER:
      return {
        ...state,
        loading: data.loading,
      }
    default:
      return state
  }
}
