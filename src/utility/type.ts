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
  | ExportDataInterface

// recieving data interfaces

export interface GetDataInterface {
  type: typeof actionTypes.GET_DATA
  data: String
}

// saving data interfaces
export type saveRequestData = {
  quarterly?: Array<Object>
  monthly?: Array<Object>
}
export interface SaveDataInterface {
  type: typeof actionTypes.SAVE_DATA
  data: saveRequestData
}

// sending data interfaces
export type sendRequestData = {
  file: FormData
}
export interface SendDataInterface {
  type: typeof actionTypes.POST_DATA
  data: sendRequestData
}

export interface ExportDataInterface {
  type:
    | typeof actionTypes.GET_LINK_TO_DOWNLOAD_DATA
    | typeof actionTypes.SAVE_LINK_TO_DOWNLOAD_DATA
  data?: any
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

// data item for redux interface monthly
export interface DataItemMonthly {
  monthly: {
    "Children (6 - 59 months)": String[]
    "Children (6 - 9 years)": String[]
    "Adolescents (10 - 19 years)": String[]
    "Pregnant Women": String[]
    Mothers: String[]
    "Index Value": String[]
    Rank: String[]
    District: String
  }[]
  months: String
  state: String
}

// single instance of items
export interface DataItemObject {
  monthly: {
    "Children (6 - 59 months)": String[]
    "Children (6 - 9 years)": String[]
    "Adolescents (10 - 19 years)": String[]
    "Pregnant Women": String[]
    Mothers: String[]
    "Index Value": String[]
    Rank: String[]
    District: String
  }
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
