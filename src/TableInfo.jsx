import React, { useEffect, useState } from "react";
import "./TableInfo.css";
import LoadCountriesTasks from "./tasks/LoadCountriesTasks";
import TableList from "./TableList";
import AppCharts from "./AppCharts";

function TableInfo() {
  const [listRegion, setListRegion] = useState([]);
  const loadWorldData = new LoadCountriesTasks();

  const load = () => {
    loadWorldData.loadListRegion(setListRegion);
  };

  useEffect(load, []);

  return (
    <div className="app__table">
      <div className="app__listRegion">
        <h1>Region List</h1>
        {listRegion && <TableList listRegion={listRegion} />}
      </div>
      <div className="app__charts">
        <AppCharts />
      </div>
    </div>
  );
}

export default TableInfo;
