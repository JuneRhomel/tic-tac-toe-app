import { useNavigate, useParams } from "react-router-dom"
import { motion } from 'framer-motion';
import { AppDispatch } from "../../../infrastructure/redux/store.redux"
import { useDispatch } from "react-redux"
import { getGame } from "../../../api/slice/get_game.slice"
import GameModel from "../../../infrastructure/model/game.model"
import { useQuery } from "@tanstack/react-query"
import BoardComponent from "./component/board.component"

export default function GameContainer() {
    const { id } = useParams()
    const navigate = useNavigate()
    const dispatch: AppDispatch = useDispatch()
    if (!id) {
        navigate("/")
    }

    const fetchGame = async () => {
        const result = await dispatch(getGame(String(id)))

        if (result.payload === "error") {
            return
        }

        return result.payload as GameModel
    }

    const queryGame = useQuery({
        queryKey: ["gameDetails", id],
        queryFn: fetchGame

    })
    if (queryGame.isLoading) {
        return <div>Loading...</div>
    }

    if (queryGame.isError) {
        return <div>Error</div>
    }

    const gameDetails = queryGame.data as GameModel

    const refetch = () => {
        queryGame.refetch()
    }

    return (
        <div className="h-screen ">

            <div className="h-3/6  bg-red-500  rotate-180 md:-rotate-0 flex justify-between flex-col md:flex-col-reverse items-center  ">
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.3, delay: 1.5 }}
                    className="mt-52 flex gap-2 md:mt-0 md:mb-48">
                    <span className="stroke-text-1 text-white text-sm text-400 titanOneFont  mb-5">
                        Win: {gameDetails.player2.score ? gameDetails.player2.score : 0}
                    </span>
                    <span className="stroke-text-1 text-white text-sm text-400 titanOneFont  mb-5">
                        Loss: {gameDetails.player1.score ? gameDetails.player1.score : 0}
                    </span>
                    <span className="stroke-text-1 text-white text-sm text-400 titanOneFont  mb-5">
                        Draw:  {gameDetails.drawScore ? gameDetails.drawScore : 0}
                    </span>
                </motion.div>
                <motion.span
                    initial={{ y: 100 }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.3, delay: 1 }}

                    className="stroke-text-1 text-white text-3xl text-400 titanOneFont  mb-5 md:mt-5">
                    {gameDetails.player1.name}
                </motion.span>
            </div>
            <BoardComponent refetch={refetch} gameModel={gameDetails} />
            <div className="h-3/6   bg-yellow-400 flex justify-between flex-col items-center ">
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.3, delay: 1.5 }}
                    className="mt-52 flex gap-2">
                    <span className="stroke-text-1 text-white text-sm text-400 titanOneFont  mb-5">
                        Win: {gameDetails.player1.score ? gameDetails.player1.score : 0}
                    </span>
                    <span className="stroke-text-1 text-white text-sm text-400 titanOneFont  mb-5">
                        Loss: {gameDetails.player2.score ? gameDetails.player2.score : 0}
                    </span>
                    <span className="stroke-text-1 text-white text-sm text-400 titanOneFont  mb-5">
                        Draw:  {gameDetails.drawScore ? gameDetails.drawScore : 0}
                    </span>
                </motion.div>
                <motion.span
                    initial={{ y: 100 }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.3, delay: 1 }}

                    className="stroke-text-1 text-white text-3xl text-400 titanOneFont  mb-5">
                    {gameDetails.player2.name}
                </motion.span>
            </div>
        </div >
    )
}