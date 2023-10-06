'use client'

import MonthlyAdminSide from "@/components/Admin_Monthly"
import Login from "@/components/Login"
import { useAppSelector } from "@/utility/type"
import React from "react"

const Admin = () => {
  const { loggedIn } = useAppSelector((state: any) => state?.user)

  return loggedIn ? <MonthlyAdminSide /> : <Login />
}

export default Admin
