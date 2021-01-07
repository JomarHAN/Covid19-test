import L from 'leaflet';
import heart from "./390px-Map_marker.svg.png";

const iconPerson = new L.Icon({
    iconUrl: heart,
    iconRetinaUrl: heart,
    iconAnchor: null,
    popupAnchor: null,
    shadowUrl: null,
    shadowSize: null,
    shadowAnchor: null,
    iconSize: new L.Point(30, 35),
    className: 'leaflet-div-icon'
});

export { iconPerson };