import react from "react";
import GameModel from "../../../../infrastructure/model/game.model"

export default function GameHistoryComponent({
    gameModel
}: {
    gameModel: GameModel
}) {

    return (
        <div className="gameHistoryContainer  ">
            <div className="gameHistoryBoxLeft  bg-red-600">
                <div className="font-bold  text-sm text-white ml-3 stroke-text-1">
                    {gameModel.player1.name} 
                </div>
                <div className="scoreGameHistory mr-8">
                    {gameModel.player1.score}  <span className="text-sm text-white">pt</span>
                </div>
            </div>
            <div className="gameHistoryBoxMiddle  ">
                VS  
            </div>
            <div className="gameHistoryBoxRight  bg-yellow-500">
                <div className="scoreGameHistory ml-8">
                    {gameModel.player2.score} <span className="text-sm text-white">pt</span>
                </div>
                <div className=" font-bold  text-sm text-white mr-3 stroke-text-1">
                    {gameModel.player2.name}
                </div>
            </div>
        </div>
    )
}