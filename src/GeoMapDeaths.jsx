import React from "react";
import { GeoJSON } from "react-leaflet";
import { useDispatch } from "react-redux";
import numeral from "numeral";
import { setCountryCovid, setCountryLatLng } from "./features/countrySlice";

function GeoMapDeaths({ region, setHover }) {
  const countryDispatch = useDispatch();
  const mapStyle = {
    fillColor: "white",
    fillOpacity: 1,
    color: "black",
    weight: 1,
    dashArray: "3",
  };

  const highlightFeature = (e) => {
    const layer = e.target;
    setHover(layer.feature.properties.country);
    layer.setStyle({
      weight: 2,
      color: "yellow",
      dashArray: "",
      fillOpacity: 1,
    });

    layer.bringToFront();
  };

  const resetHighlight = (e) => {
    setHover("Worldwide");
    e.target.setStyle({
      fillColor: `${e.target.feature.properties.colorDeaths}`,
      fillOpacity: 1,
      color: "black",
      dashArray: "",
      weight: 1,
    });
  };

  const onEachCountry = (country, layer) => {
    const countryInfo = country.properties;
    const countryFlag = countryInfo.countryInfo?.flag;

    layer.on({
      mouseover: highlightFeature,
      mouseout: resetHighlight,
    });

    layer.setStyle({ fillColor: countryInfo.colorDeaths });

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

export default GeoMapDeaths;