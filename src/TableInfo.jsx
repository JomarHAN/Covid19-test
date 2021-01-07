import React, { useEffect, useState } from "react";
import "./TableInfo.css";
import LoadCountriesTasks from "./tasks/LoadCountriesTasks";
import TableList from "./TableList";
import AppCharts from "./AppCharts";
import { useSelector } from "react-redux";
import { selectIsUsa } from "./features/usaSlice";
import LoadUsaStasks from "./tasks/LoadUsaTasks";
import { ArrowForwardIos } from "@material-ui/icons";
import { IconButton } from "@material-ui/core";

function TableInfo() {
  const [listRegion, setListRegion] = useState([]);
  const loadWorldData = new LoadCountriesTasks();
  const isUsa = useSelector(selectIsUsa);
  const loadUsaTasks = new LoadUsaStasks();
  const [click, setClick] = useState(false);

  const load = () => {
    if (!isUsa) {
      loadWorldData.loadListRegion(setListRegion);
    } else {
      loadUsaTasks.loadListTable(setListRegion);
    }
  };

  useEffect(load, [isUsa]);

  const clickResponsive = () => {
    const tableResponsive = document.querySelector(".app__table");
    const btnResponsive = document.querySelector(".app__btnOn");
    if (!click) {
      tableResponsive.classList.remove("app__tableResponsive");
      btnResponsive.classList.remove("app__btnOff");
      setClick(true);
    } else {
      tableResponsive.classList.add("app__tableResponsive");
      btnResponsive.classList.add("app__btnOff");
      setClick(false);
    }
  };

  return (
    <div className="app__table app__tableResponsive">
      <div className="app__responsiveBtn">
        <IconButton onClick={clickResponsive}>
          <ArrowForwardIos className="app__btnOn app__btnOff" />
        </IconButton>
      </div>
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
