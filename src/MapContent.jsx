import React from "react";
import { MapContainer, GeoJSON, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./CovidMap.css";
import { useDispatch } from "react-redux";
import { setCountryLatLng } from "./features/countrySlice";
import { LanguageOutlined } from "@material-ui/icons";
import { IconButton } from "@material-ui/core";
import numeral from "numeral";

function MapContent({ center, zoom, countries }) {
  const countryDispatch = useDispatch();

  const mapStyle = {
    fillColor: "white",
    fillOpacity: 0.7,
    color: "black",
    weight: 1,
  };

  const onEachCountry = (country, layer) => {
    const countryInfo = country.properties;

    const countryFlag = countryInfo.countryInfo?.flag;

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
    const coordinates = layer.feature.properties.countryInfo;
    if (coordinates) {
      countryDispatch(
        setCountryLatLng({
          countryLatLng: [coordinates.lat, coordinates.long],
          zoom: 4,
        })
      );
    }
  };

  const FlyTo = () => {
    const map = useMap();
    map.flyTo(center, zoom);
    return null;
  };

  return (
    <div style={{ height: "95vh", position: "relative" }} className="app__map">
      <MapContainer
        style={{ height: "100%" }}
        center={center}
        zoom={zoom}
        scrollWheelZoom={false}
      >
        <FlyTo />
        <GeoJSON
          data={countries}
          style={mapStyle}
          onEachFeature={onEachCountry}
          eventHandlers={{ click: clickEventCountry }}
        />
      </MapContainer>
      <IconButton
        className="globe__btn"
        onClick={() => countryDispatch(setCountryLatLng({ isGlobe: true }))}
      >
        <LanguageOutlined />
      </IconButton>
    </div>
  );
}

export default MapContent;
