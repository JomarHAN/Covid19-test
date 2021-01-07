import React, { useState } from "react";
import { MapContainer, Marker, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./CovidMap.css";
import GeoMap from "./GeoMap";
import { useDispatch, useSelector } from "react-redux";
import { selectCasesType } from "./features/casesTypeSlice";
import GeoMapDeaths from "./GeoMapDeaths";
import GeoMapRecovered from "./GeoMapRecovered";
import {
  selectCountryCovid,
  setCountryCovid,
  setCountryLatLng,
} from "./features/countrySlice";
import { IconButton } from "@material-ui/core";
import { Explore } from "@material-ui/icons";
import "./MapContent.css";
import L from "leaflet";
import heart from "./390px-Map_marker.svg.png";

function MapContent({ center, zoom, countries }) {
  const casesType = useSelector(selectCasesType);
  const [regionHover, setRegionHover] = useState("Worldwide");
  const countryDispatch = useDispatch();
  const countryCovid = useSelector(selectCountryCovid);

  console.log(countryCovid);

  const iconPerson = new L.Icon({
    iconUrl: heart,
    iconRetinaUrl: heart,
    iconAnchor: null,
    popupAnchor: null,
    shadowUrl: null,
    shadowSize: null,
    shadowAnchor: null,
    iconSize: new L.Point(30, 35),
    className: "leaflet-div-icon",
  });

  const FlyTo = () => {
    const map = useMap();
    map.flyTo(center, zoom);
    return null;
  };

  const backClick = () => {
    countryDispatch(setCountryCovid({ countryCovid: "Worldwide" }));
    countryDispatch(setCountryLatLng({ isGlobe: true }));
  };

  return (
    <div style={{ height: "70vh", position: "relative" }} className="app__map">
      <MapContainer
        style={{ height: "100%" }}
        center={center}
        zoom={zoom}
        scrollWheelZoom={false}
      >
        <FlyTo />
        {countries.map((region) => {
          if (casesType === "cases") {
            return <GeoMap region={region} setHover={setRegionHover} />;
          } else if (casesType === "deaths") {
            return <GeoMapDeaths region={region} setHover={setRegionHover} />;
          } else {
            return (
              <GeoMapRecovered region={region} setHover={setRegionHover} />
            );
          }
        })}
        {countryCovid !== "Worldwide" && (
          <Marker position={center} icon={iconPerson} />
        )}
        <IconButton className="globe__btn" onClick={() => backClick()}>
          <Explore />
        </IconButton>

        <div
          style={{
            position: "absolute",
            right: "10px",
            top: "10px",
            border: "1px solid lightgray",
            padding: "5px",
            backgroundColor: "lightgray",
            borderRadius: "5px",
            zIndex: 999,
          }}
        >
          <p>
            Scope on: <strong>{regionHover}</strong>
          </p>
        </div>
      </MapContainer>
    </div>
  );
}

export default MapContent;
