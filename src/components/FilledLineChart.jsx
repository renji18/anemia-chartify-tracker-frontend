import { useEffect, useState } from "react"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement, // for line
  LineElement, // for line
  Title,
  Tooltip,
  Legend,
} from "chart.js"
import { Bar } from "react-chartjs-2"
import { Line } from "react-chartjs-2"

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement, // for line
  LineElement, // for line
  Title,
  Tooltip,
  Legend
)

export default function FilledLinedCharts({
  yAxisData,
  category,
  selectedState,
  dataSet,
  type,
}) {
  const [xAxis, setXAxis] = useState([])
  const [yAxis, setYAxis] = useState([])

  // useEffect to properly select quarters for specific states
  useEffect(() => {
    const selectedStateData = dataSet?.filter(
      (data) => data?.state === selectedState
    )[0]
    setXAxis(
      type === "quarterly"
        ? selectedStateData?.quarters
        : selectedStateData?.months
    )
  }, [dataSet, selectedState, type])

  useEffect(() => {
    setYAxis(yAxisData)
  }, [yAxisData])

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
          {/* <div className="border border-gray-400 pt-0 rounded-xl w-full h-full my-auto  shadow-xl">
            <Line
              data={{
                labels: xAxis,
                datasets: yAxis,
              }}
            />
          </div> */}
        </div>
      )}
      <div>
        <p className="text-center pt-5 text-3xl">
          {type === "quarterly"
            ? `Quarterly Data Starting From 2021 `
            : "Monthly Data Starting From 2023"}{" "}
          &rarr;
        </p>
      </div>
    </div>
  )
}
