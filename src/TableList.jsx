import React from "react";
import numeral from "numeral";
import "./TableList.css";
import { useDispatch } from "react-redux";
import { setCountryCovid, setCountryLatLng } from "./features/countrySlice";

function TableList({ listRegion }) {
  const dispatch = useDispatch();

  return (
    <div className="tableList">
      <table>
        <tr>
          <th>Level</th>
          <th>Region</th>
          <th>Cases</th>
        </tr>
        {listRegion.map((country, index) => (
          <tr
            key={index}
            className="tableList__eachone"
            onClick={() => {
              dispatch(
                setCountryLatLng({
                  countryLatLng: [
                    country.countryInfo.lat,
                    country.countryInfo.long,
                  ],
                  zoom: 4,
                })
              );
              dispatch(setCountryCovid({ countryCovid: country.country }));
            }}
          >
            <td>{index + 1}</td>
            <td>{country.country}</td>
            <td>{numeral(country.cases).format("0,0")}</td>
          </tr>
        ))}
      </table>
    </div>
  );
}

export default TableList;
