import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ApiConstant from "../../application/constant/api.constant";
import HttpCliestUtil from "../../util/http_client/http_cliest.util";
import Failure from "../../application/failure/failure";
import GameModel from "../../infrastructure/model/game.model";

interface ApiState {
    isLoading: boolean;
    isError: boolean;
}

const initialState: ApiState = {
    isLoading: false,
    isError: false,
};

export const getListPrevGames = createAsyncThunk<
    GameModel[],
    void,
    {
        rejectValue: string;
    }
>(
    "GetListPrevGamesSlice/patchMotherMeterElectricity",
    async (_, { rejectWithValue }) => {
        const result = await HttpCliestUtil({
            url: ApiConstant.GAME,
            method: "GET",
        });
        if (result instanceof Failure) {
            return rejectWithValue("error");
        }
        return result as GameModel[]
    }
);

export const GetListPrevGamesSlice = createSlice({
    name: "GetListPrevGamesSlice",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getListPrevGames.pending, (_, action) => {
                return {
                    ...initialState,
                    isLoading: true
                }
            })
            .addCase(getListPrevGames.fulfilled, (_, action) => {
                return {
                    ...initialState,
                    isLoading: false
                }
            })
            .addCase(getListPrevGames.rejected, (_, action) => {
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
            });
    },
});

const getListPrevGamesApiSliceReducer = GetListPrevGamesSlice.reducer;

export default getListPrevGamesApiSliceReducer