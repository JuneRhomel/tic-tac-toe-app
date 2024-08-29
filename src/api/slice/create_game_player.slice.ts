import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import ApiConstant from "../../application/constant/api.constant";
import HttpCliestUtil from "../../util/http_client/http_cliest.util";
import Failure from "../../application/failure/failure";
import PlayerModel from "../../infrastructure/model/player.model";

interface ApiState {
    isLoading: boolean;
    isError: boolean;
}

const initialState: ApiState = {
    isLoading: false,
    isError: false,
};
interface ResponseApi {
    acknowledged: boolean,
    insertedId: string
}
export const createGamePlayer = createAsyncThunk<
    ResponseApi,
    PlayerModel[],
    {
        rejectValue: string;
    }
>(
    "CreateGamePlayerSlice/createGamePlayer",
    async (playerModel: PlayerModel[], { rejectWithValue }) => {
        const payload =
        {
            player1: {
                name: playerModel[0].name,
                symbol: playerModel[0].symbol,
                score: 0
            },
            player2: {
                name: playerModel[1].name,
                symbol: playerModel[1].symbol,
                score: 0
            }
        }

        const result = await HttpCliestUtil({
            url: ApiConstant.GAME,
            method: "POST",
            body: payload
        });
        if (result instanceof Failure) {
            return rejectWithValue("error");
        }
        return result as ResponseApi;
    }
);

export const createGamePlayerSlice = createSlice({
    name: "CreateGamePlayerSlice",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createGamePlayer.pending, (_, action) => {
                return {
                    ...initialState,
                    isLoading: true
                }
            })
            .addCase(createGamePlayer.fulfilled, (_, action) => {
                return {
                    ...initialState,
                    isLoading: false
                }
            })
            .addCase(createGamePlayer.rejected, (_, action) => {
                if (action.payload === "error") {
                    return {
                        ...initialState,
                        isError: true
                    }
                }

                return {
                    ...initialState,
                    isError: true
                }
            })
    }
})

const createGamePlayerApiSliceReducer = createGamePlayerSlice.reducer;

export default createGamePlayerApiSliceReducer