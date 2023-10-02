import { combineReducers } from "redux"
import { dataReducer } from "./dataReducer"
import { userReducer } from "./userReducer"
const rootReducer = combineReducers({
  data: dataReducer,
  user: userReducer,
})

export type LoadState = ReturnType<typeof rootReducer>

export default rootReducer
