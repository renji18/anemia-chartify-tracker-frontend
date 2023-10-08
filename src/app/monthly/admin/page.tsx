"use client"

import AdminSide from "@/components/Admin"
import Login from "@/components/Login"
import { useAppSelector } from "@/utility/type"
import React from "react"

const Admin = () => {
  const { loggedIn } = useAppSelector((state: any) => state?.user)

  return loggedIn ? <AdminSide type={"monthly"} /> : <Login />
}

export default Admin
