import { loginRequestData, registerRequestData } from "@/utility/type"
import axios from "axios"
import { toast } from "react-toastify"

const DEV_ROUTE = "http://127.0.0.1:5000/"
const PROD_ROUTE = "https://anemia-chartify-server.onrender.com/"

const ACTIVE_ROUTE = !true ? DEV_ROUTE : PROD_ROUTE

// handle getting data from database
export const getDataService = async () => {
  try {
    const response = await axios.get(`${ACTIVE_ROUTE}`)
    return response
  } catch (error) {
    toast.error(
      `${
        error?.message === "Network Error"
          ? "Connection to Database Refused"
          : error
      }`
    )
  }
}

// handle sending data to database
export const sendDataService = async (formData: FormData) => {
  try {
    const response = await axios.post(`${ACTIVE_ROUTE}upload`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    return response
  } catch (error) {
    toast.error(
      `${
        error?.message === "Network Error"
          ? "Connection to Database Refused"
          : error
      }`
    )
  }
}

// handle logging user in
export const loginUserService = async (data: loginRequestData) => {
  try {
    const response = await axios.post(`${ACTIVE_ROUTE}login`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    return response
  } catch (error) {
    toast.error(
      `${
        error?.message === "Network Error"
          ? "Connection to Database Refused"
          : error
      }`
    )
  }
}

// handle registeration user in
export const registerUserService = async (data: registerRequestData) => {
  try {
    const response = await axios.post(`${ACTIVE_ROUTE}register`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    return response
  } catch (error) {
    toast.error(
      `${
        error?.message === "Network Error"
          ? "Connection to Database Refused"
          : error
      }`
    )
  }
}
