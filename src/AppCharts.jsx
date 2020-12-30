import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { useSelector } from "react-redux";
import "./AppCharts.css";
import { selectCasesType } from "./features/casesTypeSlice";
import { selectCountryCovid } from "./features/countrySlice";
import ChartDataTasks from "./tasks/ChartDataTasks";
import numeral from "numeral";

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
  const countryCovid = useSelector(selectCountryCovid);
  const [dataChart, setDataChart] = useState();

  const loadChartData = () => {
    const chartData = new ChartDataTasks();
    chartData.loadData(casesType, countryCovid, setDataChart);
  };

  useEffect(loadChartData, [casesType, countryCovid]);

  return (
    <div className="lineChart">
      {dataChart?.length > 0 && (
        <Line
          data={{
            datasets: [
              {
                backgroundColor: "rgba(204, 16, 52, 0.5)",
                borderColor: "#CC1034",
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
