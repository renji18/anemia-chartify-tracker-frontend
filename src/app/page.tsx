"use client"

import { getDataQuarterly } from "@/redux/actions"
import { useAppDispatch } from "@/utility/type"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function Home() {
  const dispatch = useAppDispatch()
  const router = useRouter()

  useEffect(() => {
    dispatch(getDataQuarterly())
  }, [dispatch])

  return (
    <div className="p-10 min-h-screen">
      <div>
        <p className="text-xl sm:text-3xl md:text-6xl italic text-center lg:text-9xl font-bold">
          Anemia Mukt Bharat
        </p>
        <p>AMB Ranking</p>
        <button onClick={() => router.push("/monthly")}>Monthly</button>
        <button onClick={() => router.push("/quarterly")}>Quarterly</button>
      </div>
    </div>
  )
}
