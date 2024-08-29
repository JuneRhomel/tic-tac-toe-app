import { configureStore } from "@reduxjs/toolkit";
import getListPrevGamesApiSliceReducer from "../../api/slice/get_list_prev_games.slice";
import createGamePlayerApiSliceReducer from "../../api/slice/create_game_player.slice";
import getGameApiSliceReducer from "../../api/slice/get_game.slice";
import roundStartApiSliceReducer from "../../api/slice/round_start.slice";
import endGameApiSliceReducer from "../../api/slice/end_game.slice";

const ReduxStore = configureStore({
    reducer: {
        getListPrevGamesApi: getListPrevGamesApiSliceReducer,
        createGamePlayerApi: createGamePlayerApiSliceReducer,
        getGameApi: getGameApiSliceReducer,
        roundStartApi: roundStartApiSliceReducer,
        endGameApiSliceReducer: endGameApiSliceReducer
    }
})
export default ReduxStore;

export type RootState = ReturnType<typeof ReduxStore.getState>;
export type AppDispatch = typeof ReduxStore.dispatch;
