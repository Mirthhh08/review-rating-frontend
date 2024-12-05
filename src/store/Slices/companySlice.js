import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../helpers/axiosInstance";
import toast from "react-hot-toast";
import { BASE_URL } from "../../constants";

const initialState = {
    loading: false,
    adding: false,
    added: false,
    companies: [],
    company: null,
}

export const getAllCompanies = createAsyncThunk(
    "getAllCompanies",
    async ({ sortBy, query, }) => {
        try {
            const url = new URL(`${BASE_URL}/company`);
            if (query) url.searchParams.set("query", query);
            if (sortBy) {
                url.searchParams.set("sortBy", sortBy);
            }

            const response = await axiosInstance.get(url);
            return response?.data?.data
        }
        catch (error) {
            toast.error(error?.response?.data?.error)
            console.log(error)
            throw error
        }
    }

)

export const addCompany = createAsyncThunk(
    "addCompany",
    async (data) => {
        console.log(data)
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("address", data.location);
        formData.append("city", data.city);
        formData.append("founded", data.foundedOn);
        formData.append("logo", data.logo);

        try {
            const response = await axiosInstance.post("/company/add", formData);
            console.log(response)
            toast.success(response?.data?.message);
            return response.data.data;
        } catch (error) {
            // console.log(error)
            toast.error(error?.response?.data?.error);
            throw error;
        }
    });

export const getCompanyById = createAsyncThunk(
    "getCompanyById",
    async ({ companyId }) => {
        try {
            const response = await axiosInstance.get(`/company/${companyId}`);
            return response.data.data;
        } catch (error) {
            toast.error(error?.response?.data?.error);
            throw error;
        }
    }
)

const companySlice = createSlice({
    name: "company",
    initialState,
    reducers: {
        updateUploadState: (state) => {
            state.adding = false;
            state.added = false;
        },
        makeCompaniesNull: (state) => {
            state.companies = [];
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getAllCompanies.pending, (state) => {
            state.loading = true
        })
        builder.addCase(getAllCompanies.fulfilled, (state, action) => {
            state.loading = false;
            state.companies = action.payload
        });
        builder.addCase(addCompany.pending, (state) => {
            state.adding = true;
        });
        builder.addCase(addCompany.fulfilled, (state) => {
            state.adding = false;
            state.added = true;
        });
        builder.addCase(getCompanyById.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getCompanyById.fulfilled, (state, action) => {
            state.loading = false;
            state.company = action.payload;
        });
    }
})

export const { updateUploadState, makeCompaniesNull } = companySlice.actions;

export default companySlice.reducer;
