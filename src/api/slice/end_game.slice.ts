import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ApiConstant from "../../application/constant/api.constant";
import Failure from "../../application/failure/failure";
import HttpCliestUtil from "../../util/http_client/http_cliest.util";

interface ApiState {
    isLoading: boolean;
    isError: boolean;
}

const initialState: ApiState = {
    isLoading: false,
    isError: false,
};



export const endGame = createAsyncThunk<
    boolean,
    string,
    {
        rejectValue: string;
    }
>(
    "EndGameSlice/endGame",
    async (id: string, { rejectWithValue }) => {
        const result = await HttpCliestUtil({
            url: `${ApiConstant.GAME}/${id}/end`,
            method: "POST",
        });
        if (result instanceof Failure) {
            return rejectWithValue("error");
        }
        return true
    }
);


export const EndGameSlice = createSlice({
    name: "EndGameSlice",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(endGame.pending, (_, action) => {
                return {
                    ...initialState,
                    isLoading: true
                }
            })
            .addCase(endGame.fulfilled, (_, action) => {
                return {
                    ...initialState,
                    isLoading: false
                }
            })
            .addCase(endGame.rejected, (_, action) => {
                if (action.payload === "error") {
                    return {
                        ...initialState,
                        isError: true
                    }
                }
            })
    }
})
const endGameApiSliceReducer = EndGameSlice.reducer
export default endGameApiSliceReducer