import { configureStore } from "@reduxjs/toolkit";

import authReducer from "../features/authSlice";
import coursesReducer from "../features/courseSlice";
import paymentReducer from "../features/paymentSlice";


export const store = configureStore({

  reducer: {

    auth: authReducer,
    courses: coursesReducer,
    payment: paymentReducer,
  },
});