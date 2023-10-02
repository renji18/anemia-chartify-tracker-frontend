import {
  IsLoginDataInterface,
  LoginDataInterface,
  RegisterUserInterface,
  isLoginRequestData,
  loginRequestData,
  registerRequestData,
} from "../../utility/type"
import * as actionTypes from "./actionTypes"

// confirm login
export const isLoggedIn = (data: isLoginRequestData): IsLoginDataInterface => ({
  type: actionTypes.IS_LOGGED_IN,
  data,
})

// login user
export const loginUser = (data: loginRequestData): LoginDataInterface => ({
  type: actionTypes.LOGIN_USER,
  data,
})

// register user
export const registerUser = (
  data: registerRequestData
): RegisterUserInterface => ({
  type: actionTypes.REGISTER_USER,
  data,
})
