import { useDispatch } from "react-redux"
import { NavigateOptions, To } from "react-router-dom"
import { getGame } from "../../../../api/slice/get_game.slice"
import GameModel from "../../../../infrastructure/model/game.model"
import { AppDispatch } from "../../../../infrastructure/redux/store.redux"
import { useQuery } from "@tanstack/react-query"
import MainButtonComponent from "../../../../component/main-button/main-button.component"
import { closeModal } from "../../../../application/provider/modal/modal.provider"
export default function OverallWinnerComponent({
    id,
    navigateTo
}: {
    id: string
    navigateTo: (To: To, option?: NavigateOptions) => void
}) {
    const dispatch: AppDispatch = useDispatch()
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

    const redirect = () => {
        navigateTo("/")
        closeModal()

    }


    return (
        <div className=" text-center ">
            <div>
                <img className="top-4 w-16 absolute" src="../assets/tic-tac-toe.png" alt="" />
            </div>
            <div className="mt-10 text-center">
                <p className="stroke-text-1 text-white text-3xl text-400 titanOneFont  mb-5">
                    Overall Winner
                </p>
                <p className="stroke-text-1 text-yellow-400 text-3xl text-400 titanOneFont  mb-5 capitalize">
                    {queryGame.data?.overallWinner}
                </p>

                <div className="flex gap-3 justify-center mt-5 mb-5">
                    <MainButtonComponent title="Ok" onClick={redirect} />
                </div>
            </div>
        </div>
    )
}