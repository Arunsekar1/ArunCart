import { createSlice } from "@reduxjs/toolkit";
import { clearError } from "./orderSlice";


const productSlice = createSlice({
    name: 'product',
    initialState: {
        loading: false,
        product: {},
        isReviewSubmitted: false
    },
    reducers: {
        productRequest(state, action) {
            return {
                ...state,
                loading: true,
            }
        },
        productSuccess(state, action) {
            return {
                ...state,
                loading: false,
                product: action.payload.product
            }
        },
        productFail(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },
        createReviewRequest(state, action) {
            return {
                ...state,
                loading: true,
            }
        },
        createReviewSuccess(state, action) {
            return {
                ...state,
                loading: false,
                isReviewSubmitted: true
            }
        },
        createReviewFail(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },
        clearReviewSubmitted(state, action) {
            return {
                ...state,
                isReviewSubmitted: false
            }
        },
        clearProductError(state, action) {
            return {
                ...state,
                error: null
            }
        },
        clearProduct(state, action) {
            return {
                ...state,
                product: {}
            }
        }
    }
});

const { actions, reducer } = productSlice;

export const { productRequest, productSuccess, productFail, createReviewFail, createReviewRequest, createReviewSuccess, clearProductError,clearReviewSubmitted, clearProduct } = actions;

export default reducer;