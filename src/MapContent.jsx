import React, { useEffect, useState } from "react";
import { MapContainer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./CovidMap.css";
import GeoMap from "./GeoMap";
import { useDispatch, useSelector } from "react-redux";
import { selectCasesType } from "./features/casesTypeSlice";
import GeoMapDeaths from "./GeoMapDeaths";
import GeoMapRecovered from "./GeoMapRecovered";
import { setCountryCovid, setCountryLatLng } from "./features/countrySlice";
import {
  FormControlLabel,
  FormGroup,
  IconButton,
  Switch,
  withStyles,
} from "@material-ui/core";
import { LanguageOutlined } from "@material-ui/icons";
import "./MapContent.css";
import { blue } from "@material-ui/core/colors";

const PurpleSwitch = withStyles({
  switchBase: {
    color: blue[300],
    "&$checked": {
      color: blue[500],
    },
    "&$checked + $track": {
      backgroundColor: blue[500],
    },
  },
  checked: {},
  track: {},
})(Switch);

function MapContent({ center, zoom, countries }) {
  const casesType = useSelector(selectCasesType);
  const [regionHover, setRegionHover] = useState("Worldwide");
  const countryDispatch = useDispatch();
  const [checkState, setCheckState] = useState(false);

  const handleChange = (e) => {
    setCheckState(e.target.checked);
  };

  const FlyTo = () => {
    const map = useMap();
    map.flyTo(center, zoom);
    return null;
  };

  const backClick = () => {
    countryDispatch(setCountryCovid({ countryCovid: "worldwide" }));
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

        <div
          className="regionHoverBox"
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
        <IconButton className="globe__btn" onClick={() => backClick()}>
          <LanguageOutlined />
        </IconButton>

        <div
          className="usSwitch__btn"
          style={{
            position: "absolute",
            right: "10px",
            top: "50px",
            border: "1px solid lightgray",
            padding: "5px",
            backgroundColor: "lightgray",
            borderRadius: "5px",
            zIndex: 999,
          }}
        >
          <FormGroup>
            <FormControlLabel
              control={
                <PurpleSwitch checked={checkState} onChange={handleChange} />
              }
              label="US Only"
            />
          </FormGroup>
        </div>
      </MapContainer>
    </div>
  );
}

export default MapContent;
