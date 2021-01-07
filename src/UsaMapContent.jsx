import React, { useState } from "react";
import { MapContainer } from "react-leaflet";
import { useSelector } from "react-redux";
import { selectCasesType } from "./features/casesTypeSlice";
import GeoMap from "./GeoMap";
import GeoMapDeaths from "./GeoMapDeaths";
import GeoMapRecovered from "./GeoMapRecovered";
import numeral from "numeral";

function UsaMapContent({ usLatLng, usZoom, usStates }) {
  const [regionHover, setRegionHover] = useState({
    regionName: "USA",
    regionCases: null,
    regionDeaths: null,
    regionRecovered: null,
  });
  const casesType = useSelector(selectCasesType);

  return (
    <div className="app__map">
      <MapContainer style={{ height: "100%" }} center={usLatLng} zoom={usZoom}>
        {usStates.map((usState) => {
          if (casesType === "cases") {
            return <GeoMap region={usState} setHover={setRegionHover} />;
          } else if (casesType === "deaths") {
            return <GeoMapDeaths region={usState} setHover={setRegionHover} />;
          } else {
            return (
              <GeoMapRecovered region={usState} setHover={setRegionHover} />
            );
          }
        })}
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
          {regionHover.regionName === "USA" ? (
            <h4>
              Scope on: <strong>{regionHover.regionName}</strong>
            </h4>
          ) : (
            <>
              <h4>
                Scope on: <strong>{regionHover.regionName}</strong>
              </h4>
              <p>
                Cases:{" "}
                <strong>
                  {numeral(regionHover.regionCases).format("0,0")}
                </strong>
              </p>
              <p>
                Deaths:{" "}
                <strong>
                  {numeral(regionHover.regionDeaths).format("0,0")}
                </strong>
              </p>
              <p>
                Recovered:{" "}
                <strong>
                  {numeral(regionHover.regionRecovered).format("0,0")}
                </strong>
              </p>
            </>
          )}
        </div>
      </MapContainer>
    </div>
  );
}

export default UsaMapContent;
