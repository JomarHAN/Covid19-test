import React, { useEffect, useState } from "react";
import MapContent from "./MapContent";
import {
  selectCountryLatLng,
  selectCountryZoom,
} from "./features/countrySlice";
import { useSelector } from "react-redux";
import LoadCountriesTasks from "./tasks/LoadCountriesTasks";
import Legend from "./Legend";
import MapHeader from "./MapHeader";
import { selectCasesType } from "./features/casesTypeSlice";
import { selectIsUsa, selectUsLatLng, selectUsZoom } from "./features/usaSlice";
import UsaMapContent from "./UsaMapContent";
import LoadUsaTasks from "./tasks/LoadUsaTasks";

function CovidMap() {
  const countryLatLng = useSelector(selectCountryLatLng);
  const zoom = useSelector(selectCountryZoom);
  const [countries, setCountries] = useState([]);
  const casesType = useSelector(selectCasesType);
  const isUsa = useSelector(selectIsUsa);
  const [usStates, setUsStates] = useState([]);
  const usZoom = useSelector(selectUsZoom);
  const usLatLng = useSelector(selectUsLatLng);

  const load = () => {
    const loadCountries = new LoadCountriesTasks();
    loadCountries.load(setCountries, casesType);
  };

  const loadUsa = () => {
    const loadStates = new LoadUsaTasks();
    loadStates.load(setUsStates);
  };

  useEffect(() => {
    // if (!isUsa) {
    //   load();
    // } else {
    loadUsa();
    // }
  }, [casesType, isUsa]);

  // console.log(countries);

  return (
    // countries.length > 0 && (
    <div className="app__container" style={{ height: "100vh" }}>
      <MapHeader />
      {/* {!isUsa ? (
          <MapContent
            center={countryLatLng}
            zoom={zoom}
            countries={countries}
          />
        ) : ( */}
      <UsaMapContent usStates={usStates} usZoom={usZoom} usLatLng={usLatLng} />
      {/* )} */}
      <Legend />
    </div>
  );
  // );
}

export default CovidMap;
