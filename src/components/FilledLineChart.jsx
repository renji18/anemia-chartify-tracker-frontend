import { useEffect, useState } from "react"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js"
import { Bar } from "react-chartjs-2"

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export default function FilledLinedCharts({
  yAxisData,
  category,
  selectedState,
  quarterly,
}) {
  const [xAxis, setXAxis] = useState([])
  const [yAxis, setYAxis] = useState([])

  // useEffect to properly select quarters for specific states
  useEffect(() => {
    setXAxis(
      quarterly?.filter((data) => data?.state === selectedState)[0]?.quarters
    )
  }, [quarterly, selectedState])

  useEffect(() => {
    setYAxis(yAxisData)
  }, [yAxisData])

  // useEffect(() => {
  //   var ctx = document.getElementById("myChart").getContext("2d")
  //   const yAxisDataTag = yAxis
  //   console.log(Math.random())
  //   console.log(yAxisDataTag, "dta tag")
  //   // const config =
  //   var myChart = new Chart(ctx, {
  //     type: "line",
  //     data: {
  //       labels: xAxis,
  //       datasets: yAxisDataTag,
  //     },
  //   })
  // }, [xAxis, yAxis])

  return (
    <div>
      <h1 className="self-center mt-10 text-xl font-semibold capitalize ">
        {category}
      </h1>
      {xAxis && (
        <div className="flex mx-auto my-auto mt-4 ">
          <p
            style={{ writingMode: "vertical-rl" }}
            className="rotate-180 origin-center whitespace-nowrap absolute top-[35%] left-10 lg:left-20 text-center text-3xl"
          >
            {category} &rarr;
          </p>
          <div className="border border-gray-400 pt-0 rounded-xl w-full h-full my-auto  shadow-xl">
            {/* <canvas className="h-screen" id="myChart"></canvas> */}
            <Bar
              data={{
                labels: xAxis,
                datasets: yAxis,
              }}
              options={{
                responsive: true,
                scales: {
                  xAxis: {
                    stacked: true,
                  },
                  yAxis: {
                    stacked: true,
                  },
                },
              }}
            />
          </div>
        </div>
      )}
      <div>
        <p className="text-center pt-5 text-3xl">
          {quarterly ? `Quarterly Data Starting From 2021 ` : ""} &rarr;
        </p>
      </div>
    </div>
  )
}
