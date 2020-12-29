import React, { useEffect, useState } from "react";
import MapContent from "./MapContent";
import {
  selectCountryLatLng,
  selectCountryZoom,
} from "./features/countrySlice";
import { useSelector } from "react-redux";
import LoadCountriesTasks from "./tasks/LoadCountriesTasks";
import Legend from "./Legend";

function CovidMap() {
  const countryLatLng = useSelector(selectCountryLatLng);
  const zoom = useSelector(selectCountryZoom);
  const [countries, setCountries] = useState([]);

  const load = () => {
    const loadCountries = new LoadCountriesTasks();
    loadCountries.load(setCountries);
  };

  useEffect(load, []);

  return (
    countries.length > 0 && (
      <div className="app__container" style={{ height: "100vh" }}>
        <MapContent center={countryLatLng} zoom={zoom} countries={countries} />
        <Legend />
      </div>
    )
  );
}

export default CovidMap;
