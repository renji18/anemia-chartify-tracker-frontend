import { useEffect, useMemo, useState } from "react"
import { Chart } from "chart.js";
import { useAppSelector } from "@/utility/type";

interface DataItem {
  data: {
    adolescents: String[];
    children: String[];
    indexValue: String[];
    mothers: String[];
    District: String;
    pregnantWomen: String[];
  }[];
  quarters: String;
  state: String;
}

export default function FilledLinedCharts() {
  const [xAxis, setXAxis] = useState<String[]>([]);
  
  const { data }: DataItem = useAppSelector((state: any) => state?.data);


    const dynamicXAxisValues = useMemo(
        () =>
      data
        ?.map((value: any) => `${value.quarters.toString()}_I`)
        .join(",")
        .split(",") || [],
    [data]
  );

    useEffect(() => (
      setXAxis(dynamicXAxisValues)
    ),[dynamicXAxisValues])

      useEffect(() => {
        var ctx = document.getElementById("myChart") as HTMLCanvasElement;
        var myChart = new Chart(ctx, {
          type: "line",
          data: {
            labels: [],
            datasets: [
              {
                data: [86, 114, 106, 106, 107, 111, 133],
                label: "Applied",
                borderColor: "rgb(62,149,205)",
                backgroundColor: "rgb(62,149,205,0.1)",
              }
            ],
          },
        });
      }, []);


  return (
    <div>
      <h1 className="self-center mt-10 text-xl font-semibold capitalize ">
        6 - 59 Months
      </h1>
          {xAxis &&
      <div className="flex mx-auto my-auto mt-4 ">
        <div className="border border-gray-400 pt-0 rounded-xl  w-full h-fit my-auto  shadow-xl">
          <canvas id="myChart"></canvas>
        </div>
      </div>
}
    </div>
  );
}
