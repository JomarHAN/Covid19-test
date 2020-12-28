import { createSlice } from '@reduxjs/toolkit';
import listCoordinate from '../datajson/countries-coordinates.json'

export const countrySlice = createSlice({
  name: 'country',
  initialState: {
    countryLatLng: [0, 0],
    countryZoom: 2,
    countriesCovid: []
  },
  reducers: {

    setCountryLatLng: (state, action) => {
      if (action.payload.isGlobe) {
        state.countryLatLng = [0, 0];
        state.countryZoom = 2
      } else {
        state.countryLatLng = action.payload.countryLatLng;
        state.countryZoom = action.payload.zoom
      }
    },
    setCountriesCovid: (state, action) => {
      state.countriesCovid = action.payload.countriesCovid
    }
  },
});

export const { setCountryLatLng, setCountriesCovid } = countrySlice.actions;

export const selectCountryLatLng = state => state.country.countryLatLng;
export const selectCountryZoom = state => state.country.countryZoom;
export const selectCountriesCovid = state => state.country.countriesCovid;

export default countrySlice.reducer;
