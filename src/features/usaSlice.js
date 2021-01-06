import { createSlice } from '@reduxjs/toolkit';

export const usaSlice = createSlice({
  name: 'usa',
  initialState: {
    isUsa: false,
    usZoom: 3.5,
    usLatLng: [40, -110]
  },
  reducers: {

    setUsCenter: (state, action) => {
      state.usZoom = action.payload.usZoom;
      state.usLatLng = action.payload.usLatLng
    },

    setIsUsa: (state, action) => {
      state.isUsa = action.payload.isUsa
    }
  },
});

export const { setIsUsa, setUsCenter } = usaSlice.actions;

export const selectIsUsa = state => state.usa.isUsa;
export const selectUsZoom = state => state.usa.usZoom;
export const selectUsLatLng = state => state.usa.usLatLng;

export default usaSlice.reducer;
