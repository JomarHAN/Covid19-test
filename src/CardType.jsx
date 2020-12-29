import React from "react";
import "./CardType.css";

function CardType({ casesType, cases, casesTotal }) {
  return (
    <div className="cardType">
      <h3>{casesType}</h3>
      <p>
        <strong
          className={
            (casesType === "Recovered" && "cardType-green") ||
            (casesType === "Deaths" && "cardType-purple")
          }
        >
          +{cases}
        </strong>
      </p>
      <small>
        <strong>{casesTotal}</strong> Total
      </small>
    </div>
  );
}

export default CardType;
