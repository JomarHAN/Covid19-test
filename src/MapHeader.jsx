import React, { useEffect, useState } from "react";
import CardType from "./CardType";
import LoadCountriesTasks from "./tasks/LoadCountriesTasks";
import numeral from "numeral";
import "./MapHeader.css";
import { useDispatch, useSelector } from "react-redux";
import { selectCountryCovid } from "./features/countrySlice";
import { selectCasesType, setCasesType } from "./features/casesTypeSlice";
import ScopeBox from "./ScopeBox";

function MapHeader() {
  const [update, setUpdate] = useState();
  const loadWorldData = new LoadCountriesTasks();
  const casesTypeDispatch = useDispatch();
  const casesType = useSelector(selectCasesType);
  const countryCovid = useSelector(selectCountryCovid);

  const load = () => {
    if (countryCovid === "worldwide") {
      loadWorldData.loadWorldData(setUpdate);
    } else {
      loadWorldData.loadCountrydData(countryCovid, setUpdate);
    }
  };

  useEffect(load, [countryCovid]);

  return (
    <div className="mapheader" style={{ height: "25vh" }}>
      <div className="mapheader__titleAndSwitch">
        <h1>COVID-19 TRACKER</h1>
        <ScopeBox />
      </div>
      <div className="mapheader__cardsGroup">
        <CardType
          active={casesType === "cases"}
          onClick={() => casesTypeDispatch(setCasesType("cases"))}
          title="Cases"
          cases={numeral(update?.todayCases).format("0.0a")}
          casesTotal={numeral(update?.cases).format("0.0a")}
        />
        <CardType
          active={casesType === "recovered"}
          onClick={() => casesTypeDispatch(setCasesType("recovered"))}
          title="Recovered"
          cases={numeral(update?.todayRecovered).format("0.0a")}
          casesTotal={numeral(update?.recovered).format("0.0a")}
        />
        <CardType
          active={casesType === "deaths"}
          onClick={() => casesTypeDispatch(setCasesType("deaths"))}
          title="Deaths"
          cases={numeral(update?.todayDeaths).format("0.0a")}
          casesTotal={numeral(update?.deaths).format("0.0a")}
        />
      </div>
    </div>
  );
}

export default MapHeader;
