import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { useSelector } from "react-redux";
import "./AppCharts.css";
import { selectCasesType } from "./features/casesTypeSlice";
import { selectCountryCovid } from "./features/countrySlice";
import ChartDataTasks from "./tasks/ChartDataTasks";
import numeral from "numeral";
import { legendItems } from "./legendsData/LegendItems";
import { selectIsUsa } from "./features/usaSlice";

const options = {
  legend: {
    display: false,
  },
  elements: {
    point: {
      radius: 0,
    },
  },
  maintainAspectRatio: false,
  tooltips: {
    mode: "index",
    intersect: false,
    callbacks: {
      label: function (tooltipItem, data) {
        return numeral(tooltipItem.value).format("+0.0");
      },
    },
  },
  scales: {
    xAxes: [
      {
        type: "time",
        time: {
          format: "MM/DD/YY",
          tooltipFormat: "ll",
        },
      },
    ],
    yAxes: [
      {
        gridLines: {
          display: false,
        },
        ticks: {
          callback: function (value, index, values) {
            return numeral(value).format("0a");
          },
        },
      },
    ],
  },
};

function AppCharts() {
  const casesType = useSelector(selectCasesType);
  let countryCovid = useSelector(selectCountryCovid);
  const [dataChart, setDataChart] = useState();
  const [colorChart, setColorChart] = useState();
  const isUsa = useSelector(selectIsUsa);

  const loadChartData = () => {
    const chartData = new ChartDataTasks();
    if (!isUsa) {
      chartData.loadData(casesType, countryCovid, setDataChart);
    } else {
      chartData.loadData(casesType, (countryCovid = "USA"), setDataChart);
    }
    const color = legendItems.find((color) => color.type === casesType);
    setColorChart(color);
  };

  useEffect(loadChartData, [casesType, countryCovid]);

  return (
    <div className="lineChart">
      {dataChart?.length > 0 && (
        <Line
          data={{
            datasets: [
              {
                fill: false,
                borderColor: `${colorChart.legends[1].color}`,
                data: dataChart,
              },
            ],
          }}
          options={options}
        />
      )}
    </div>
  );
}

export default AppCharts;
