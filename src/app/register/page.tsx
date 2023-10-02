"use client"

import { registerUser } from "@/redux/actions"
import { useAppDispatch } from "@/utility/type"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"

const Registration = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const [data, setData] = useState({
    userName: "",
    password: "",
    confirmPassword: "",
  })

  useEffect(() => {
    router.push("/login")
  }, [router])

  const handleRegistration = () => {
    if (data?.password !== data?.confirmPassword)
      return toast.warn("Passwords don't match")
    else if (data?.password?.length < 5)
      return toast.warn("Minimum 5 characters")
    else dispatch(registerUser(data))
  }
  return (
    <div>
      <input
        onChange={(e) => setData({ ...data, userName: e.target.value })}
        type="text"
      />
      UserName
      <br />
      <input
        onChange={(e) => setData({ ...data, password: e.target.value })}
        type="text"
      />
      Password
      <br />
      <input
        onChange={(e) => setData({ ...data, confirmPassword: e.target.value })}
        type="text"
      />
      Confirm Password
      <br />
      <button onClick={handleRegistration}>Send</button>
    </div>
  )
}

export default Registration
