import * as actionTypes from "../redux/actions/actionTypes"
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../redux/store"

// redux hooks
type DispatchFunc = () => AppDispatch
export const useAppDispatch: DispatchFunc = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

// reducer interfaces
export type UserActions =
  | SaveDataInterface
  | GetDataInterface
  | SendDataInterface
  | LoginDataInterface
  | IsLoginDataInterface
  | RegisterUserInterface
  | LoaingUserInterface

// recieving data interfaces
export interface GetDataInterface {
  type: typeof actionTypes.GET_DATA_QUARTERLY
  data?: null
}

// saving data interfaces
export type saveRequestData = {
  data: Array<Object>
}
export interface SaveDataInterface {
  type: typeof actionTypes.SAVE_DATA_QUARTERLY
  data: saveRequestData
}

// sending data interfaces
export type sendRequestData = {
  file: FormData
  // dispatch: AppDispatch;
}
export interface SendDataInterface {
  type: typeof actionTypes.POST_DATA_QUARTERLY
  data: sendRequestData
}

// logging user interfaces
export type loginRequestData = {
  userName: String
  password: String
}
export interface LoginDataInterface {
  type: typeof actionTypes.LOGIN_USER
  data: loginRequestData
}
export type isLoginRequestData = {
  login: Boolean
}
export interface IsLoginDataInterface {
  type: typeof actionTypes.IS_LOGGED_IN
  data: isLoginRequestData
}

// registration interfaces
export type registerRequestData = {
  userName: String
  password: String
  confirmPassword: String
}
export interface RegisterUserInterface {
  type: typeof actionTypes.REGISTER_USER
  data: registerRequestData
}

// loading interfaces
export type loadingRequest = {
  loading: Boolean
}
export interface LoaingUserInterface {
  type: typeof actionTypes.LOADER
  data: loadingRequest
}

// redux action interface
export interface ReduxAction {
  type: string
  data?: any
}

// data item from redux interface
export interface DataItem {
  quarterly: {
    "Children (6 - 59 months)": String[]
    "Children (6 - 9 years)": String[]
    "Adolescents (10 - 19 years)": String[]
    "Pregnant Women": String[]
    Mothers: String[]
    "Index Value": String[]
    Rank: String[]
    District: String
  }[]
  quarters: String
  state: String
}

export interface CityData {
  "Children (6 - 59 months)": String[]
  "Children (6 - 9 years)": String[]
  "Adolescents (10 - 19 years)": String[]
  "Pregnant Women": String[]
  Mothers: String[]
  "Index Value": String[]
  Rank: String[]
  District: String
}

// y-axis data set interface
export interface DataSetInterface {
  data: String[]
  label: String | null
  borderColor: String
}
