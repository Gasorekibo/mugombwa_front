import { configureStore } from "@reduxjs/toolkit";

import ngoReducer from "../slices/ngoSlice";
import announcementReducer from "../slices/announcementSlice";
import emergenceReducer from "../slices/emergenceSlice";
import authReducer from "../slices/authSlice";
const store = configureStore({
    reducer: {
        ngos: ngoReducer,
        announcements: announcementReducer,
        emergencies: emergenceReducer,
        auth: authReducer
    },
    devTools: process.env.NODE_ENV !== "production"

})

export default store;