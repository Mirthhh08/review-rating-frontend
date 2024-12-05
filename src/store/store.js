import { configureStore } from "@reduxjs/toolkit";

import companySliceReducer from "./Slices/companySlice.js";
import reviewSliceReducer from "./Slices/reviewSlice.js";
const store = configureStore({
    reducer: {
        company: companySliceReducer,
        review: reviewSliceReducer
    }
})

export default store;