"use client"

import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../../utility/type"
import { getData } from "../../redux/actions"
import AdminSide from "@/components/Admin"
import Login from "../../components/Login"

const Admin = () => {
  const dispatch = useAppDispatch()

  const { loggedIn } = useAppSelector((state) => state?.user)

  useEffect(() => {
    dispatch(getData())
  }, [dispatch])


  return (
   loggedIn ? (
    <AdminSide /> 
   ) : (
    <Login />
   )
  
  )
}

export default Admin
