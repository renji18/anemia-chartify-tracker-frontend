import { combineReducers } from "redux"
import { dataReducer } from "./dataReducer"
import { userReducer } from "./userReducer"
import { loaderReducer } from "./loaderReducer"
const rootReducer = combineReducers({
  data: dataReducer,
  user: userReducer,
  loader: loaderReducer,
})

export type LoadState = ReturnType<typeof rootReducer>

export default rootReducer
