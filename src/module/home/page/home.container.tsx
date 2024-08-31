import react, { useEffect, useState } from "react";
import { motion } from 'framer-motion';
import { useQuery } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import MainButtonComponent from "../../../component/main-button/main-button.component";
import { AppDispatch, RootState } from "../../../infrastructure/redux/store.redux";
import GameHistoryComponent from "./component/game_history.component";
import { getListPrevGames } from "../../../api/slice/get_list_prev_games.slice";
import GameModel from "../../../infrastructure/model/game.model";
import { showModal } from "../../../application/provider/modal/modal.provider";
import StartGameComponent from "./component/start_game.component";
import { NavigateOptions, To, useNavigate } from "react-router-dom";
import { ButtonSound } from "../../../util/sound_effect/sound_effet.util";

export default function HomeContainer() {
    const navigate = useNavigate();
    const dispatch: AppDispatch = useDispatch();
    const gmaeHistoryState = useSelector((state: RootState) => state.getListPrevGamesApi);
    const fetchGameHistory = async () => {
        const result = await dispatch(getListPrevGames());
        return result.payload as GameModel[]
    };

    const navigateTo = (To: To, option?: NavigateOptions) => {
        navigate(To, option)
    }

    const queryData = useQuery({
        queryKey: ["gameHistory"],
        queryFn: fetchGameHistory,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
    })
    const listGameHistory = queryData?.data as GameModel[]


    const renderGameHistory = () => {
        if (gmaeHistoryState.isError) {
            return <div className="text-red-500">Error</div>
        }
        if (queryData.isLoading) {
            return <div>Loading...</div>
        }
        if (queryData.data) {
            return listGameHistory.map((game: GameModel) => (
                <GameHistoryComponent key={game._id} gameModel={game} />
            ))
        }
    }


    const modalToStart = () => {
        ButtonSound()
        showModal(
            <StartGameComponent navigateTo={navigateTo} />
        )
    }

    return (
        <>

            <div className=" justify-center ">
                <motion.img

                    initial={{ x: -170, }}
                    animate={{ x: 0 }}
                    transition={{ duration: 0.3, delay: 1 }}

                    className=" fixed top-1  -left-28 blur " src="./assets/o_bg.png" alt="" />
                <motion.img
                    initial={{ x: 190 }}
                    animate={{ x: 0 }}
                    transition={{ duration: 0.3, delay: 1 }}

                    src="./assets/x_bg.png" className=" fixed bottom-0  -right-28 blur" alt="" />

                <div className=" center-home items-center  p-5 sm:p-0  flex gap-5 justify-center w-full h-full   flex-col">
                    <motion.img
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.3, delay: 0.5 }}
                        className="w-32" src="./assets/tic-tac-toe.png" alt="" />
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.3, delay: 1.5 }}
                    >
                        <MainButtonComponent title="Start Game" onClick={modalToStart} />

                    </motion.div >
                </div>


                <motion.div
                    initial={{ x: -100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.3, delay: 2 }}
                    className=" h-screen z-10 sm:mb-10 mt-auto   flex justify-end items-center  flex-col">
                    <p className="titanOneFont text-lg text-white  stroke-red-500 stroke-2 mb-3  stroke-text-1">Match History</p>
                    <div className="flex gap-2 flex-col items-center max-h-56 mb-5  overflow-auto p-1 w-full">
                        {renderGameHistory()}
                    </div>
                </motion.div>
            </div >
        </>
    )
}