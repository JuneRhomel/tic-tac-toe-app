import react from "react";
import { useForm } from "react-hook-form";
import MainButtonComponent from "../../../../component/main-button/main-button.component";
import PlayerModel from "../../../../infrastructure/model/player.model";
import { AppDispatch } from "../../../../infrastructure/redux/store.redux";
import { useDispatch } from "react-redux";
import { createGamePlayer } from "../../../../api/slice/create_game_player.slice";
import { NavigateOptions, To, useNavigate } from "react-router-dom";
import { closeModal } from "../../../../application/provider/modal/modal.provider";
import { ButtonSound } from "../../../../util/sound_effect/sound_effect.util";

export default function StartGameComponent({
    navigateTo
}: {
    navigateTo: (To: To, option?: NavigateOptions) => void
}
) {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const dispatch: AppDispatch = useDispatch()
    interface playerInterface {
        player1: string
        player2: string
    }
    interface ResponseApi {
        acknowledged: boolean,
        insertedId: string
    }
    const onSubmit = async (data: object) => {
        const players = data as playerInterface

        const playerModel: PlayerModel[] = [
            {
                name: players.player1,
                symbol: "X",
                score: 0
            },
            {
                name: players.player2,
                symbol: "O",
                score: 0
            }
        ]

        const result = await dispatch(createGamePlayer(playerModel))

        if (result.payload === "error") {
            return
        }

        const resultResponseSuccess = result.payload as ResponseApi
        ButtonSound()
        closeModal()
        navigateTo(`/game/${resultResponseSuccess.insertedId}`)
     
    }

    return (
        <div>
            <div>
                <img className="top-4 w-16 absolute" src="./assets/tic-tac-toe.png" alt="" />
            </div>
            <div className="mt-10">
                <form onSubmit={handleSubmit(onSubmit)} >
                    <div className="flex  gap-3">
                        <div>
                            <label htmlFor="player1" className="block mb-2 text-sm font-medium text-gray-900">
                                <span className="stroke-text-1 text-red-400 titanOneFont ">
                                    X
                                </span> :
                                Player 1
                            </label>
                            <input type="text" id="player1" className="
                        bg-white border 
                        border-gray-300 
                        text-gray-900 text-sm rounded-lg 
                        focus:ring-blue-500 
                        focus:border-blue-500 
                        block 
                        w-full 
                        p-2.5 
                        " placeholder="Dee"
                                {...register("player1", {
                                    required: "Name is required",
                                    maxLength: { value: 10, message: "Max length is 10" }
                                })}
                            />
                            {errors.player1 && <p className="text-red-500 text-sm mt-1">{errors.player1.message as string}</p>}
                        </div>
                        <div className="titanOneFont stroke-text-1 text-yellow-400 text-xl  flex justify-center items-center">
                            <br />
                            VS
                        </div>
                        <div>
                            <label htmlFor="player2" className="block mb-2 text-sm font-medium text-gray-900 ">
                                <span className="stroke-text-1 text-yellow-400 titanOneFont ">
                                    O
                                </span> :
                                Player 2
                            </label>
                            <input type="text" id="player2" className="
                        bg-white border 
                        border-gray-300 
                        text-gray-900 text-sm rounded-lg 
                        focus:ring-blue-500 
                        focus:border-blue-500 
                        block 
                        w-full 
                        p-2.5 
                        " placeholder="John"
                                {...register("player2", {
                                    required: "Player 2 is required",
                                    maxLength: { value: 10, message: "Max length is 10" }
                                })}
                            />
                            {errors.player2 && <p className="text-red-500 text-sm mt-1">{errors.player2.message as string}</p>}
                        </div>
                    </div>
                    <div className="mt-4 flex justify-end items-center">
                        <MainButtonComponent title="Start" />
                    </div>
                </form>
            </div>
        </div>
    )
}