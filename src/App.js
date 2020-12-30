import React from "react";
import "./App.css";
import CovidMap from "./CovidMap";
import TableInfo from "./TableInfo";

function App() {
  return (
    <div
      className="app"
      style={{ padding: "20px", backgroundColor: "whitesmoke" }}
    >
      <CovidMap />
      <TableInfo />
    </div>
  );
}

export default App;
