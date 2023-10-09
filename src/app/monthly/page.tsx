"use client"

import { getData } from "@/redux/actions"
import { useAppDispatch } from "@/utility/type"
import React, { useEffect } from "react"

const Monthly = () => {
  const dispatch = useAppDispatch()

  // useEffect to get the quarterly data
  useEffect(() => {
    dispatch(getData({ typeOf: "monthly" }))
  }, [])

  return <div>Monthly</div>
}

export default Monthly
