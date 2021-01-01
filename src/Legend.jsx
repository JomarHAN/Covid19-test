import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectCasesType } from "./features/casesTypeSlice";
import legendItems from "./legendsData/LegendItems";

function Legend() {
  const casesType = useSelector(selectCasesType);
  const [legends, setLegends] = useState();

  const changeLegend = () => {
    const color = legendItems.find((color) => color.type === casesType);
    setLegends(color.legends);
  };

  useEffect(changeLegend, [casesType]);

  return (
    <div style={{ height: "5vh", display: "flex", alignItems: "stretch" }}>
      {legends?.map((legend) => (
        <div
          key={legend.title}
          style={{
            flex: 1,
            height: "5vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: legend.textColor,
            backgroundColor: legend.color,
            fontWeight: "bolder",
          }}
        >
          <span>{legend.title}</span>
        </div>
      ))}
    </div>
  );
}

export default Legend;
