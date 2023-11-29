"use client"

import Loader from "@/components/Loader"
import { getLinkToExportData } from "@/redux/actions"
import { useAppDispatch, useAppSelector } from "@/utility/type"
import React, { useEffect, useState } from "react"

const Download = () => {
  const dispatch = useAppDispatch()
  const linkData = useAppSelector((state: any) => state?.data)
  const { loading } = useAppSelector((state: any) => state?.loader)

  const [link, setLink] = useState<null | string>(null)

  const handleDownloadClick = () => {
    if (link) {
      const hiddenLink = document.createElement("a")
      hiddenLink.href = link
      hiddenLink.download = "output.xlsx"
      document.body.appendChild(hiddenLink)
      hiddenLink.click()
      document.body.removeChild(hiddenLink)
    }
  }

  useEffect(() => {
    const setLinkData = () => {
      if (!linkData) return
      setLink(linkData?.link)
    }
    setLinkData()
  }, [linkData])

  useEffect(() => {
    dispatch(getLinkToExportData())
  }, [])

  if (loading || !link) return <Loader />

  return (
    <div className="flex flex-col h-screen justify-center items-center gap-40 px-20">
      <p className="text-2xl leading-relaxed">
        Click below to download an excel sheet containing data about the{" "}
        <b>
          <i>Index Value</i>
        </b>{" "}
        for each{" "}
        <b>
          <i>District</i>
        </b>{" "}
        of a{" "}
        <b>
          <i>State</i>
        </b>{" "}
        containing the values for each{" "}
        <b>
          <i>Year</i>
        </b>
        .
      </p>
      <button
        className="bg-cyan-500/80 text-white px-5 py-3 rounded-md text-xl font-bold cursor-pointer font-serif"
        onClick={handleDownloadClick}
      >
        Download
      </button>
    </div>
  )
}

export default Download
