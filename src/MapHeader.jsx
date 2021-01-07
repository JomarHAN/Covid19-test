import React, { useEffect, useState } from "react";
import CardType from "./CardType";
import LoadCountriesTasks from "./tasks/LoadCountriesTasks";
import numeral from "numeral";
import "./MapHeader.css";
import { useDispatch, useSelector } from "react-redux";
import { selectCountryCovid } from "./features/countrySlice";
import { selectCasesType, setCasesType } from "./features/casesTypeSlice";
import SwitchUsBtn from "./SwitchUsBtn";
import { selectIsUsa } from "./features/usaSlice";
import LoadUsaTasks from "./tasks/LoadUsaTasks";

function MapHeader() {
  const [update, setUpdate] = useState();
  const casesTypeDispatch = useDispatch();
  const casesType = useSelector(selectCasesType);
  const countryCovid = useSelector(selectCountryCovid);
  const isUsa = useSelector(selectIsUsa);

  const loadWorldData = new LoadCountriesTasks();
  const loadUsTasks = new LoadUsaTasks();

  const loadUsCard = () => {
    loadUsTasks.loadUsCard(setUpdate);
  };

  const load = () => {
    if (countryCovid === "Worldwide") {
      loadWorldData.loadWorldData(setUpdate);
    } else {
      loadWorldData.loadCountrydData(countryCovid, setUpdate);
    }
  };

  useEffect(() => {
    if (!isUsa) {
      load();
    } else {
      loadUsCard();
    }
  }, [countryCovid, isUsa]);

  return (
    <div className="mapheader" style={{ height: "25vh" }}>
      <div className="mapheader__titleAndSwitch">
        <h1>COVID-19 TRACKER</h1>
        <SwitchUsBtn />
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
