import React, { useEffect, useState } from "react";
import CardType from "./CardType";
import LoadCountriesTasks from "./tasks/LoadCountriesTasks";
import numeral from "numeral";
import "./MapHeader.css";
import { IconButton } from "@material-ui/core";
import { HistoryOutlined } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { setCountryCovid, setCountryLatLng } from "./features/countrySlice";
import { selectCasesType, setCasesType } from "./features/casesTypeSlice";

function MapHeader() {
  const [update, setUpdate] = useState();
  const loadWorldData = new LoadCountriesTasks();
  const countryDispatch = useDispatch();
  const casesTypeDispatch = useDispatch();
  const casesType = useSelector(selectCasesType);

  const load = () => {
    loadWorldData.loadWorldData(setUpdate);
  };

  useEffect(load, []);

  const backClick = () => {
    countryDispatch(setCountryCovid({ countryCovid: "worldwide" }));
    countryDispatch(setCountryLatLng({ isGlobe: true }));
  };

  return (
    <div className="mapheader" style={{ height: "25vh" }}>
      <h1>COVID-19 TRACKER</h1>
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
      <IconButton className="globe__btn" onClick={() => backClick()}>
        <HistoryOutlined />
      </IconButton>
    </div>
  );
}

export default MapHeader;
