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

function CovidMap() {
  const countryLatLng = useSelector(selectCountryLatLng);
  const zoom = useSelector(selectCountryZoom);
  const [countries, setCountries] = useState([]);
  const casesType = useSelector(selectCasesType);

  // const [listCases, setListCases] = useState([]);

  // const loadListCases = () => {
  //   const load = new LoadCountriesTasks();
  //   load.loadCases(setListCases);
  // };

  // useEffect(loadListCases, []);

  // console.log(listCases);

  const load = () => {
    const loadCountries = new LoadCountriesTasks();
    loadCountries.load(setCountries, casesType);
  };

  useEffect(load, []);

  // console.log(countries);

  return (
    countries.length > 0 && (
      <div className="app__container" style={{ height: "100vh" }}>
        <MapHeader />
        <MapContent center={countryLatLng} zoom={zoom} countries={countries} />
        <Legend />
      </div>
    )
  );
}

export default CovidMap;
