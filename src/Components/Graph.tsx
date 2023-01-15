import { useState } from "react";
 import LineChart from "./LineChart";
 import BarChart  from "./BarChart";
//import "./styles.css";

export const datechart = ["2020-03-14" ,"2020-03-15" ,"2020-03-16" ,"2020-03-17"]
export const pricchart = [120.288205 ,119.006566 ,118.500762,118.274791]


export default function Graph() {
  const [chartData, setChartData] = useState({
    labels: datechart.map((data) => data),

    datasets: [
      {
        label: "Users Gained ",
        data: pricchart.map((data) => data),
        backgroundColor: [
          "rgba(75,192,192,1)",
          "#ecf0f1",
          "#f0331a",
          "#f3ba2f",
          "#2a71d0"
        ],
        borderColor: "black",
        borderWidth: 2
      }
    ]
  });

  return (
    <div className="App">

       <LineChart chartData={chartData} />
         <div className="hid-bar"><BarChart/> </div>
    </div>
  );
}
