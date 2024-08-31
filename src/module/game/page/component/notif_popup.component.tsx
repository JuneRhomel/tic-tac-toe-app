import { useDispatch } from "react-redux"
import { closeModal, showModal } from "../../../../application/provider/modal/modal.provider"
import MainButtonComponent from "../../../../component/main-button/main-button.component"
import { AppDispatch } from "../../../../infrastructure/redux/store.redux"
import { NavigateOptions, To } from "react-router-dom"
import { endGame } from "../../../../api/slice/end_game.slice"
import OverallWinnerComponent from "./overall_winner.component"
import { ButtonSound, EndGame } from "../../../../util/sound_effect/sound_effet.util"

export default function NotifPopupComponent(
    {
        id,
        winnerName = "",
        isDraw = false,
        navigateTo,
        refetch
    }: {
        id: string
        winnerName?: string
        isDraw?: boolean
        navigateTo?: (To: To, option?: NavigateOptions) => void,
        refetch: () => void
    }
) {
    const dispatch: AppDispatch = useDispatch()
    const renderWinnerOrDraw = () => {
        if (isDraw) {
            return "Draw"
        }
        return `${winnerName} Win`
    }

    const endGameFn = async () => {
        ButtonSound()
        EndGame()
        const result = await dispatch(endGame(String(id)))

        if (result.payload === "error") {
            if (navigateTo) {
                navigateTo("/")
            }
            return
        }

        closeModal()
        if (navigateTo) {
            showModal(
                <OverallWinnerComponent refetch={refetch} id={id} navigateTo={navigateTo} />
            )
        }
    }

    const close = () => {
        ButtonSound()
        closeModal()
    }
    return (
        <div className="">
            <div>
                <img className="top-4 w-16 absolute" src="../assets/tic-tac-toe.png" alt="" />
            </div>
            <div className="mt-10 text-center">
                <p className="stroke-text-1 text-yellow-400 text-lg text-400 titanOneFont  mb-5">
                    {renderWinnerOrDraw()}
                </p>
                <p>Do You Want to Play  More?</p>

                <div className="flex gap-3 justify-center mt-5 mb-5">
                    <MainButtonComponent type="secondary" title="Exit" onClick={endGameFn} />
                    <MainButtonComponent title="Continue" onClick={close} />
                </div>
            </div>
        </div>
    )
}