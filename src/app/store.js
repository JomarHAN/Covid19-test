import { configureStore } from '@reduxjs/toolkit';

import countryReducer from '../features/countrySlice';

export default configureStore({
  reducer: {
    country: countryReducer,
  },
});
