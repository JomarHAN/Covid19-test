import React from "react";
import numeral from "numeral";
import "./TableList.css";

function TableList({ listRegion }) {
  return (
    <div className="tableList">
      <table>
        <tr>
          <th>Level</th>
          <th>Region</th>
          <th>Cases</th>
        </tr>
        {listRegion.map((country, index) => (
          <tr key={index}>
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
