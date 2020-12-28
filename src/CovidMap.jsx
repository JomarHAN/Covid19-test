import React, { useEffect, useState } from "react";
import MapContent from "./MapContent";
import {
  selectCountryLatLng,
  selectCountryZoom,
} from "./features/countrySlice";
import { useSelector } from "react-redux";
import LoadCountriesTasks from "./tasks/LoadCountriesTasks";

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
    <div style={{ height: "95vh" }}>
      {countries.length > 0 && (
        <MapContent center={countryLatLng} zoom={zoom} countries={countries} />
      )}
    </div>
  );
}

export default CovidMap;
