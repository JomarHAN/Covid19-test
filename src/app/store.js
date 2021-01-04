import { configureStore } from '@reduxjs/toolkit';
import casesTypeReducer from '../features/casesTypeSlice'
import countryReducer from '../features/countrySlice';
import usaReducer from '../features/usaSlice'

export default configureStore({
  reducer: {
    country: countryReducer,
    casesType: casesTypeReducer,
    usa: usaReducer
  },
});
