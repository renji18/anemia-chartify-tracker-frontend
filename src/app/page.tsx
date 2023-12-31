"use client"

import { useRouter } from "next/navigation"

export default function Home() {
  const router = useRouter()

  return (
    <div className="flex flex-col justify-center gap-32 items-center min-h-screen">
      <p className="text-xl text-cyan-500/80 sm:text-3xl md:text-6xl italic text-center lg:text-7xl xl:text-9xl font-bold">
        Anemia Mukt Bharat
      </p>
      <p className="text-center text-lg font-bold text-cyan-400 md:text-2xl lg:text-4xl">
        AMB Ranking
      </p>
      <div>
        <div className="justify-evenly flex gap-5 flex-col sm:flex-row ">
          <button
            className="text-lg md:text-3xl p-3 md:p-5 bg-black text-white rounded"
            onClick={() => router.push("/monthly")}
          >
            Monthly
          </button>
          <button
            className="text-lg md:text-3xl p-3 md:p-5 bg-black text-white rounded"
            onClick={() => router.push("/quarterly")}
          >
            Quarterly
          </button>
        </div>
        <button
          className="text-lg mt-10 md:text-3xl px-3 md:p-5 bg-black text-white rounded"
          onClick={() => router.push("/download")}
        >
          Download Monthly Report
        </button>
      </div>
    </div>
  )
}
