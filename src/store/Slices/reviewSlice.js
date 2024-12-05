import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../helpers/axiosInstance";
import toast from "react-hot-toast";
import { BASE_URL } from "../../constants";

const initialState = {
    loading: false,
    reviews: [],
    totalReviews: 0,
};

export const addReview = createAsyncThunk(
    "addReview",
    async ({ companyId, name, subject, reviewText, rating }) => {
        console.log(companyId, name, subject, reviewText, rating)
        try {
            const response = await axiosInstance.post('/review/add', {
                companyId,
                name,
                subject,
                reviewText,
                rating
            });
            return response.data.data;
        } catch (error) {
            toast.error(error?.response?.data?.error);
            throw error;
        }
    }
);

export const getCompanyReviews = createAsyncThunk(
    "getCompanyReviews",
    async ({ companyId }) => {
        const url = `${BASE_URL}/review/${companyId}`;

        try {
            const response = await axiosInstance.get(url);

            return response.data.data;  // Directly return the reviews array
        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.error);
            throw error;
        }
    }
);

const reviewSlice = createSlice({
    name: "review",
    initialState,
    reducers: {
        cleanUpReviews: (state) => {
            state.reviews = [];
            state.totalReviews = 0;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getCompanyReviews.pending, (state) => {
            state.loading = true;
        });

        builder.addCase(getCompanyReviews.fulfilled, (state, action) => {
            state.loading = false;
            state.reviews = action.payload;
            state.totalReviews = action.payload.length;
        });

        builder.addCase(addReview.fulfilled, (state, action) => {
            state.reviews.unshift(action.payload);
            state.totalReviews++;
        });
    }
});

export const { cleanUpReviews } = reviewSlice.actions;

export default reviewSlice.reducer;
