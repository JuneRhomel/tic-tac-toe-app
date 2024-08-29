import { useEffect, useState } from "react";
import { motion } from 'framer-motion';
import BoxBoardComponent from "./box_board.component";
import { showModal } from "../../../../application/provider/modal/modal.provider";
import { NavigateOptions, To, useNavigate } from "react-router-dom";
import GameModel from "../../../../infrastructure/model/game.model";
import { AppDispatch } from "../../../../infrastructure/redux/store.redux";
import { useDispatch } from "react-redux";
import { roundStart } from "../../../../api/slice/round_start.slice";
import RoundsModel from "../../../../infrastructure/model/rounds.model";
import NotifPopupComponent from "./notif_popup.component";
const PLAYER_X = "X";
const PLAYER_O = "O";

export default function BoardComponent({
    gameModel,
    refetch
}: {
    gameModel: GameModel,
    refetch: () => void
}) {
    const dispatch: AppDispatch = useDispatch();
    const navigate = useNavigate();
    const [isClickable, setIsClickable] = useState(true);
    const [tiles, setTiles] = useState(Array(9).fill(null));
    const [playerTurn, setPlayerTurn] = useState(PLAYER_X);
    const [howWin, setHowWin] = useState<string>();
    const [winCompination, setWinCompination] = useState<Array<number>>([]);

    const navigateTo = (To: To, option?: NavigateOptions) => {
        navigate(To, option)
    }

    const handleBoxClick = (index: number) => {
        if (tiles[index] !== null) return;
        const newTiles = [...tiles];
        newTiles[index] = playerTurn;
        setTiles(newTiles);
        setHowWin(playerTurn);
        setPlayerTurn(playerTurn === PLAYER_X ? PLAYER_O : PLAYER_X);
    };


    const checkWin = () => {
        const winningCombinations = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];

        for (let i = 0; i < winningCombinations.length; i++) {
            const [a, b, c] = winningCombinations[i];
            if (tiles[a] && tiles[a] === tiles[b] && tiles[a] === tiles[c]) {
                setWinCompination([a, b, c]);
                return true;
            }
        }

        return false;
    };

    const checkDraw = () => {
        return tiles.every((tile) => tile !== null);
    };
    const winnerName = howWin === gameModel.player1.symbol ? gameModel.player1.name : gameModel.player2.name;

    const saveRound = async (isDraw = false) => {

        const round = gameModel.rounds === undefined ? 1 : gameModel.rounds.length + 1
        const roundModel = new RoundsModel(
            round,
            winnerName,
            tiles,
            isDraw
        );
        const response = await dispatch(roundStart({ round: roundModel, _id: gameModel._id }));

        if (response.payload === "error") {
            navigateTo("/");
            return
        }

        if (!isDraw) {
            setTimeout(() => {
                showModal(
                    <NotifPopupComponent id={gameModel._id} navigateTo={navigateTo} winnerName={winnerName} />
                );
                setTiles(Array(9).fill(null));
                setWinCompination([]);
                setIsClickable(true);
            }, 1000);
        }
        return
    }

    useEffect(() => {
        if (checkWin()) {
            setIsClickable(false);
            saveRound();
            refetch()
        } else if (checkDraw()) {
            saveRound(true);
            showModal(
                <NotifPopupComponent id={gameModel._id} isDraw={true} />
            );
            setTiles(Array(9).fill(null));
            refetch()

        }
    }, [tiles, playerTurn]);




    return (
        <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3 , delay: 0.5 }}
        >
            <div className=" w-80 px-5 py-1 rounded-lg border-black border-2 absolute bg-white h-auto  top-1/2 left-1/2   -translate-x-1/2 -translate-y-1/2">

                {playerTurn === PLAYER_X ?
                    <p className="text-center  text-black rotate-180 md:rotate-0 text-sm text-400 titanOneFont mb-1">
                        Your turn
                    </p>
                    :
                    ""
                }
                <span className="stroke-text-1 text-red-400 text-sm text-400 titanOneFont  mt-1">
                    X
                </span>

                <div className={`grid grid-cols-3 h-80 w-full grid-rows-3 ${isClickable ? "" : 'pointer-events-none'}`} >

                    <BoxBoardComponent onClick={() => handleBoxClick(0)} isWinner={winCompination.includes(0)} className="flex justify-center items-center border-r-2 border-black " value={tiles[0]} />
                    <BoxBoardComponent onClick={() => handleBoxClick(1)} isWinner={winCompination.includes(1)} className="flex justify-center items-center" value={tiles[1]} />
                    <BoxBoardComponent onClick={() => handleBoxClick(2)} isWinner={winCompination.includes(2)} className="flex justify-center items-center border-l-2 border-black " value={tiles[2]} />
                    <BoxBoardComponent onClick={() => handleBoxClick(3)} isWinner={winCompination.includes(3)} className="flex justify-center items-center border-t-2 border-r-2  border-black" value={tiles[3]} />
                    <BoxBoardComponent onClick={() => handleBoxClick(4)} isWinner={winCompination.includes(4)} className="flex justify-center items-center border-t-2 border-black" value={tiles[4]} />
                    <BoxBoardComponent onClick={() => handleBoxClick(5)} isWinner={winCompination.includes(5)} className="flex justify-center items-center border-t-2 border-l-2 border-black" value={tiles[5]} />
                    <BoxBoardComponent onClick={() => handleBoxClick(6)} isWinner={winCompination.includes(6)} className=" flex justify-center items-center border-t-2 border-r-2 border-black" value={tiles[6]} />
                    <BoxBoardComponent onClick={() => handleBoxClick(7)} isWinner={winCompination.includes(7)} className="flex justify-center items-center border-t-2 border-black" value={tiles[7]} />
                    <BoxBoardComponent onClick={() => handleBoxClick(8)} isWinner={winCompination.includes(8)} className="flex justify-center items-center border-l-2 border-t-2 border-black" value={tiles[8]} />

                </div>
                <div>
                    <span className="stroke-text-1 text-yellow-400 text-sm text-400 titanOneFont  mt-1">
                        O
                    </span>
                    {playerTurn === PLAYER_O ?
                        <p className="text-center  text-black text-sm text-400 titanOneFont mt-1">
                            Your turn
                        </p>
                        :
                        ""
                    }
                </div>
            </div >
        </motion.div>
    )
}