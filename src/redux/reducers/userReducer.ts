import { UserActions } from "../../utility/type"
import * as actionTypes from "../actions/actionTypes"

// login status reducer
export const userReducer = (
  state = { loggedIn: false },
  { type, data }: UserActions
) => {
  switch (type) {
    case actionTypes.IS_LOGGED_IN:
      return {
        ...state,
        loggedIn: data.login,
      }
    default:
      return state
  }
}
