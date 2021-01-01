import React from "react";
import { MapContainer, useMap, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./CovidMap.css";
import GeoMap from "./GeoMap";

function MapContent({ center, zoom, countries }) {
  const FlyTo = () => {
    const map = useMap();
    map.flyTo(center, zoom);
    return null;
  };

  return (
    <div style={{ height: "65vh", position: "relative" }} className="app__map">
      <MapContainer
        style={{ height: "100%" }}
        center={center}
        zoom={zoom}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <FlyTo />
        {countries.map((region) => (
          <GeoMap region={region} />
        ))}
      </MapContainer>
    </div>
  );
}

export default MapContent;
