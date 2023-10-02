"use client"

import Loader from "@/components/Loader"
import { registerUser } from "@/redux/actions"
import { useAppDispatch, useAppSelector } from "@/utility/type"
import { useState } from "react"
import { toast } from "react-toastify"
 
const Registration = () => {
  const dispatch = useAppDispatch()
  const [data, setData] = useState({
    userName: "",
    password: "",
    confirmPassword: "",
  })
  const { loading } = useAppSelector((state) => state?.loader)

  const handleRegistration = () => {
    if (
      data?.password === "" ||
      data?.confirmPassword === "" ||
      data?.userName === ""
    )
      return toast.warn("Please fill all the fields")
    else if (data?.password !== data?.confirmPassword)
      return toast.warn("Passwords don't match")
    else if (data?.password?.length < 5)
      return toast.warn("Minimum 5 characters")
    else {
      dispatch(registerUser(data))
    }
  }

  if (loading) return <Loader />

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="flex h-full flex-col justify-center items-center lg:w-1/4 md:w-2/5 w-4/5 space-y-6 py-4 px-6 rounded-md ">
        <h1 className="text-center text-2xl text-black mb-6">REGISTER</h1>
        <div className="space-y-4 w-full flex flex-col">
          <input
            placeholder="Enter your username"
            className="py-3 px-3 text-sm rounded-md outline-none bg-gray-300"
            onChange={(e) => setData({ ...data, userName: e.target.value })}
            type="text"
          />
          <input
            placeholder="Enter your password"
            className="py-3 px-3 text-sm rounded-md outline-none bg-gray-300"
            onChange={(e) => setData({ ...data, password: e.target.value })}
            type="password"
          />
          <input
            placeholder="Confirm your password"
            className="py-3 px-3 text-sm rounded-md outline-none bg-gray-300"
            onChange={(e) =>
              setData({ ...data, confirmPassword: e.target.value })
            }
            type="password"
          />
        </div>
        <button
          className="bg-blue py-2 w-full font-medium rounded-md text-white"
          onClick={handleRegistration}
        >
          REGISTER
        </button>
      </div>
    </div>
  )
}

export default Registration
