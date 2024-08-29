
export default class RoundsModel {
    round: number;
    winner: string;
    board: string[];
    isDraw: boolean;

    constructor(round: number, winner: string, board: string[], isDraw: boolean) {
        this.round = round;
        this.winner = winner;
        this.board = board;
        this.isDraw = isDraw
    }
}