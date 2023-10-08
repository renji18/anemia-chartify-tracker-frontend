"use client"

import AdminSide from "@/components/Admin"
import Login from "@/components/Login"
import { useAppSelector } from "@/utility/type"

const Admin = () => {
  const { loggedIn } = useAppSelector((state: any) => state?.user)

  return loggedIn ? <AdminSide type={"quarterly"} /> : <Login />
}

export default Admin
