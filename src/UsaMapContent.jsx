import React, { useState } from "react";
import { MapContainer } from "react-leaflet";
import GeoMap from "./GeoMap";

function UsaMapContent({ usLatLng, usZoom, usStates }) {
  const [regionHover, setRegionHover] = useState("USA");
  console.log(regionHover);
  return (
    <div style={{ height: "70vh", position: "relative" }}>
      <MapContainer style={{ height: "100%" }} center={usLatLng} zoom={usZoom}>
        <GeoMap region={usStates} setHover={setRegionHover} />
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

export default UsaMapContent;
