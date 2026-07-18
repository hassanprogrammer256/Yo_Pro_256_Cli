import { configureStore } from "@reduxjs/toolkit";

import authReducer from "../features/authSlice";
import coursesReducer from "../features/courseSlice";
import paymentReducer from "../features/paymentSlice";
import UiReducer from "../features/uiSlice";
import StudentCourseReducer from "../features/student/courseSlice";
import StudentDashboardReducer from "../features/student/dashboardSlice";
import StudentSubscriptionReducer from "../features/student/subscriptionSlice";
import NotificationReducer from "../features/notifications";



export const store = configureStore({

  reducer: {

    auth: authReducer,
    courses: coursesReducer,
    payment: paymentReducer,

    ui: UiReducer,

    studentCourse : StudentCourseReducer,
    studentDashboard : StudentDashboardReducer,
    studentSubscription : StudentSubscriptionReducer,

    notifications: NotificationReducer
  },
});