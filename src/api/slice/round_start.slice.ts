import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ApiConstant from "../../application/constant/api.constant";
import RoundsModel from "../../infrastructure/model/rounds.model";
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
interface StartRound {
    round: RoundsModel
    _id: string
}

export const roundStart = createAsyncThunk<
    boolean,
    StartRound,
    {
        rejectValue: string;
    }
>(
    "RoundStartSlice/roundStart",
    async (params: StartRound, { rejectWithValue }) => {
        const result = await HttpCliestUtil({
            url: `${ApiConstant.GAME}/${params._id}`,
            method: "POST",
            body: params.round
        });
        if (result instanceof Failure) {
            return rejectWithValue("error");
        }
        return true
    }
);



export const RoundStartSlice = createSlice({
    name: "RoundStartSlice",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(roundStart.pending, (_, action) => {
                return {
                    ...initialState,
                    isLoading: true
                }
            })
            .addCase(roundStart.fulfilled, (_, action) => {
                return {
                    ...initialState,
                    isLoading: false
                }
            })
            .addCase(roundStart.rejected, (_, action) => {
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
const roundStartApiSliceReducer = RoundStartSlice.reducer
export default roundStartApiSliceReducer