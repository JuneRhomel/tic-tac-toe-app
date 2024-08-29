import PlayerModel from "./player.model";
import RoundsModel from "./rounds.model";



export default class GameModel {
    _id: string;
    createdAt: Date;
    player1: PlayerModel;
    player2: PlayerModel;
    rounds: RoundsModel[];
    totalRounds: number;
    overallWinner: string;
    drawScore: number;
    isDraw: boolean;

    constructor(_id: string, createdAt: Date, player1: PlayerModel, player2: PlayerModel, rounds: RoundsModel[], totalRounds: number, overallWinner: string, drawScore: number, isDraw: boolean) {
        this._id = _id;
        this.createdAt = createdAt;
        this.player1 = player1;
        this.player2 = player2;
        this.rounds = rounds;
        this.totalRounds = totalRounds;
        this.overallWinner = overallWinner;
        this.drawScore = drawScore;
        this.isDraw = isDraw;
    }

}