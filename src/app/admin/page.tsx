"use client"

import { useAppSelector } from "../../utility/type"
import AdminSide from "@/components/Admin"
import Login from "../../components/Login"

const Admin = () => {
  const { loggedIn } = useAppSelector((state) => state?.user)

  return loggedIn ? <AdminSide /> : <Login />
}

export default Admin
