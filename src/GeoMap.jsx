import React from "react";
import { GeoJSON } from "react-leaflet";
import { useDispatch } from "react-redux";
import numeral from "numeral";
import { setCountryCovid, setCountryLatLng } from "./features/countrySlice";

function GeoMap({ region }) {
  const countryDispatch = useDispatch();
  const mapStyle = {
    fillColor: "white",
    fillOpacity: 1,
    color: "black",
    weight: 1,
  };

  const onEachCountry = (country, layer) => {
    const countryInfo = country.properties;
    const countryFlag = countryInfo.countryInfo?.flag;

    // console.log(countryInfo);

    layer.setStyle({ fillColor: countryInfo.color });

    layer.bindPopup(`
    <img src=${countryFlag} alt=""/>
    <h1>${countryInfo.country}</h1>
    <p>Cases: <strong>${numeral(countryInfo.cases).format("0,0")}</strong></p>
    <p>Recovered: <strong>${numeral(countryInfo.recovered).format(
      "0,0"
    )}</strong></p>
      <p>Deaths: <strong>${numeral(countryInfo.deaths).format(
        "0,0"
      )}</strong></p>
        `);
  };

  const clickEventCountry = ({ layer }) => {
    const countryInfo = layer.feature.properties.countryInfo;
    if (countryInfo) {
      countryDispatch(
        setCountryLatLng({
          countryLatLng: [countryInfo.lat, countryInfo.long],
          zoom: 4,
        })
      );
      countryDispatch(setCountryCovid({ countryCovid: countryInfo.iso3 }));
    }
  };
  return (
    <GeoJSON
      data={region}
      style={mapStyle}
      onEachFeature={onEachCountry}
      eventHandlers={{ click: clickEventCountry }}
    />
  );
}

export default GeoMap;
