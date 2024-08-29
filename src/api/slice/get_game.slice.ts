import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ApiConstant from "../../application/constant/api.constant";
import Failure from "../../application/failure/failure";
import GameModel from "../../infrastructure/model/game.model";
import HttpCliestUtil from "../../util/http_client/http_cliest.util";


interface ApiState {
    isLoading: boolean;
    isError: boolean;
}

const initialState: ApiState = {
    isLoading: false,
    isError: false,
};

export const getGame = createAsyncThunk<
    GameModel,
    string,
    {
        rejectValue: string;
    }
>(
    "GetGameSlice/getGame",
    async (id: string, { rejectWithValue }) => {
        const result = await HttpCliestUtil({
            url: `${ApiConstant.GAME}/${id}`,
            method: "GET",
        });
        if (result instanceof Failure) {
            return rejectWithValue("error");
        }
        return result as GameModel
    }
);

export const getGameSlice = createSlice({
    name: "GetGameSlice",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getGame.pending, (_, action) => {
                return {
                    ...initialState,
                    isLoading: true
                }
            })
            .addCase(getGame.fulfilled, (_, action) => {
                return {
                    ...initialState,
                    isLoading: false
                }
            })
            .addCase(getGame.rejected, (_, action) => {
                if (action.payload === "error") {
                    return {
                        ...initialState,
                        isError: true
                    }
                }

                return {
                    ...initialState,
                    isLoading: false
                }
            })
    }
})
const getGameApiSliceReducer = getGameSlice.reducer
export default getGameApiSliceReducer