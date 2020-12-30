import { configureStore } from '@reduxjs/toolkit';
import casesTypeReducer from '../features/casesTypeSlice'
import countryReducer from '../features/countrySlice';

export default configureStore({
  reducer: {
    country: countryReducer,
    casesType: casesTypeReducer
  },
});
