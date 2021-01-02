import { createSlice } from '@reduxjs/toolkit';

export const countrySlice = createSlice({
  name: 'country',
  initialState: {
    countryLatLng: [50, 0],
    countryZoom: 1.7,
    countryCovid: "worldwide",
    regionHover: "Worldwide"
  },
  reducers: {

    setCountryLatLng: (state, action) => {
      if (action.payload.isGlobe) {
        state.countryLatLng = [50, 0];
        state.countryZoom = 1.7
      } else {
        state.countryLatLng = action.payload.countryLatLng;
        state.countryZoom = action.payload.zoom
      }
    },

    setCountryCovid: (state, action) => {
      state.countryCovid = action.payload.countryCovid
    },

    setRegionHover: (state, action) => {
      state.regionHover = action.payload.regionHover
    }
  },
});

export const { setCountryLatLng, setCountryCovid, setRegionHover } = countrySlice.actions;

export const selectCountryLatLng = state => state.country.countryLatLng;
export const selectCountryZoom = state => state.country.countryZoom;
export const selectCountryCovid = state => state.country.countryCovid;
export const selectRegionHover = state => state.country.regionHover;

export default countrySlice.reducer;
