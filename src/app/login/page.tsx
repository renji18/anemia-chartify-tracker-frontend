"use client"

import { loginUser } from "@/redux/actions"
import { useAppDispatch, useAppSelector } from "@/utility/type"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"

const Login = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()

  const { loggedIn } = useAppSelector((state) => state?.user)
  const [data, setData] = useState({ userName: "", password: "" })

  const handleLogin = () => {
    if (data?.password === "" || data?.userName === "")
      toast.warn("Please fill all the fields")
    else dispatch(loginUser(data))
  }

  useEffect(() => {
    const pushToLogin = () => {
      if (loggedIn === true) {
        router.push("/admin")
      }
    }
    pushToLogin()
  }, [loggedIn, router])

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
      <button onClick={handleLogin}>Send</button>
    </div>
  )
}

export default Login
