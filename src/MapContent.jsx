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
    const countryName = country.properties.country;
    const cases = country.properties.cases;

    layer.bindPopup(`
        <h1>${countryName}</h1>
        <p>${numeral(cases).format("0,0")}</p>
    `);
  };

  const clickEventCountry = ({ layer }) => {
    const coordinates = layer.feature.properties.countryInfo;
    countryDispatch(
      setCountryLatLng({
        countryLatLng: [coordinates.lat, coordinates.long],
        zoom: 4,
      })
    );
  };

  const FlyTo = () => {
    const map = useMap();
    map.flyTo(center, zoom);
    return null;
  };

  console.log(countries);

  return (
    <div style={{ height: "100%", position: "relative" }}>
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
