import React, { useEffect, useState } from "react";
import CardType from "./CardType";
import "./TableInfo.css";
import numeral from "numeral";
import LoadCountriesTasks from "./tasks/LoadCountriesTasks";
import TableList from "./TableList";

function TableInfo() {
  const [update, setUpdate] = useState();
  const [listRegion, setListRegion] = useState([]);
  const loadWorldData = new LoadCountriesTasks();

  const load = () => {
    loadWorldData.loadWorldData(setUpdate);
    loadWorldData.loadListRegion(setListRegion);
  };

  useEffect(load, []);

  return (
    <div className="app__table">
      <h1>COVID-19 TRACKER</h1>
      <div className="app__cardsGroup">
        <CardType
          casesType="Cases"
          cases={numeral(update?.todayCases).format("0.0a")}
          casesTotal={numeral(update?.cases).format("0.0a")}
        />
        <CardType
          casesType="Recovered"
          cases={numeral(update?.todayRecovered).format("0.0a")}
          casesTotal={numeral(update?.recovered).format("0.0a")}
        />
        <CardType
          casesType="Deaths"
          cases={numeral(update?.todayDeaths).format("0.0a")}
          casesTotal={numeral(update?.deaths).format("0.0a")}
        />
      </div>
      <div className="app__listRegion">
        {listRegion && <TableList listRegion={listRegion} />}
      </div>
    </div>
  );
}

export default TableInfo;
