"use client"

import QuarterlyAdminSide from "@/components/Admin_Quarterly"
import Login from "@/components/Login"
import { useAppSelector } from "@/utility/type"

const Admin = () => {
  const { loggedIn } = useAppSelector((state: any) => state?.user)

  return loggedIn ? <QuarterlyAdminSide /> : <Login />
}

export default Admin
