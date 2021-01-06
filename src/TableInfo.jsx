import React, { useEffect, useState } from "react";
import "./TableInfo.css";
import LoadCountriesTasks from "./tasks/LoadCountriesTasks";
import TableList from "./TableList";
import AppCharts from "./AppCharts";
import { useSelector } from "react-redux";
import { selectIsUsa } from "./features/usaSlice";
import LoadUsaStasks from "./tasks/LoadUsaTasks";

function TableInfo() {
  const [listRegion, setListRegion] = useState([]);
  const loadWorldData = new LoadCountriesTasks();
  const isUsa = useSelector(selectIsUsa);
  const loadUsaTasks = new LoadUsaStasks();

  const load = () => {
    if (!isUsa) {
      loadWorldData.loadListRegion(setListRegion);
    } else {
      loadUsaTasks.loadListTable(setListRegion);
    }
  };

  useEffect(load, [isUsa]);

  return (
    <div className="app__table">
      <div className="app__listRegion">
        <h1>List of Regions</h1>
        {listRegion && <TableList listRegion={listRegion} />}
      </div>
      <div className="app__charts">
        <AppCharts />
      </div>
    </div>
  );
}

export default TableInfo;
