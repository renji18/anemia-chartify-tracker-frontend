import { useEffect, useMemo, useState } from "react"
import { Chart } from "chart.js"
import { useAppSelector } from "@/utility/type"

export default function FilledLinedCharts({ yAxisData, cat }) {
  const [xAxis, setXAxis] = useState([])
  const [yAxis, setYAxis] = useState([])

  const { quarterly } = useAppSelector((state) => state?.data)

  const dynamicXAxisValues = useMemo(
    () =>
      quarterly
        ?.map((value) => `${value.quarters.toString()}`)
        .join(",")
        .split(",") || [],
    [quarterly]
  )

  useEffect(() => setXAxis(dynamicXAxisValues), [dynamicXAxisValues])

  useEffect(() => {
    setYAxis(yAxisData)
  }, [yAxisData, setYAxis])

  useEffect(() => {
    var ctx = document.getElementById("myChart").getContext("2d")
    var myChart = new Chart(ctx, {
      type: "line",
      data: {
        labels: xAxis,
        datasets: [
          {
            data: yAxis,
            label: "Anemia",
            borderColor: "rgb(62,149,205)",
            backgroundColor: "rgb(62,149,205,0.1)",
          },
        ],
      },
    })
  }, [xAxis, yAxis])

  return (
    <div>
      <h1 className="self-center mt-10 text-xl font-semibold capitalize ">
        {cat}
      </h1>
      {xAxis && (
        <div className="flex mx-auto my-auto mt-4 ">
          <div className="border border-gray-400 pt-0 rounded-xl w-full h-fit my-auto  shadow-xl">
            <canvas id="myChart"></canvas>
          </div>
        </div>
      )}
    </div>
  )
}
