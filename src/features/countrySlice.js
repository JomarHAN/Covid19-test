import { createSlice } from '@reduxjs/toolkit';

export const countrySlice = createSlice({
  name: 'country',
  initialState: {
    countryLatLng: [20, 0],
    countryZoom: 1.5,
    countryCovid: "worldwide"
  },
  reducers: {

    setCountryLatLng: (state, action) => {
      if (action.payload.isGlobe) {
        state.countryLatLng = [20, 0];
        state.countryZoom = 1.5
      } else {
        state.countryLatLng = action.payload.countryLatLng;
        state.countryZoom = action.payload.zoom
      }
    },
    setCountryCovid: (state, action) => {
      state.countryCovid = action.payload.countryCovid
    }
  },
});

export const { setCountryLatLng, setCountryCovid } = countrySlice.actions;

export const selectCountryLatLng = state => state.country.countryLatLng;
export const selectCountryZoom = state => state.country.countryZoom;
export const selectCountryCovid = state => state.country.countryCovid;

export default countrySlice.reducer;
