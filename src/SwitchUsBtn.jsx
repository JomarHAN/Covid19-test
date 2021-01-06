import {
  FormControlLabel,
  FormGroup,
  Switch,
  withStyles,
} from "@material-ui/core";
import { blue } from "@material-ui/core/colors";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setCountryLatLng } from "./features/countrySlice";
import { setIsUsa } from "./features/usaSlice";

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

function ScopeBox() {
  const [checkState, setCheckState] = useState(false);
  const countryDispatch = useDispatch();
  const usaDispatch = useDispatch();

  const handleChange = (e) => {
    setCheckState(e.target.checked);
  };

  useEffect(() => {
    if (checkState) {
      usaDispatch(setIsUsa({ isUsa: true }));
    } else {
      usaDispatch(setIsUsa({ isUsa: false }));
      countryDispatch(setCountryLatLng({ countryLatLng: [50, 0], zoom: 1.7 }));
    }
  }, [checkState]);

  return (
    <div
      style={{
        right: "10px",
        top: "10px",
        border: "1px solid lightgray",
        padding: "5px",
        backgroundColor: "lightgray",
        borderRadius: "5px",
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
  );
}

export default ScopeBox;
