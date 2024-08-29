
export default class PlayerModel {


    name: string;


    symbol: "X" | "O";


    score: number;

    constructor(name: string, symbol: "X" | "O", score: number) {
        this.name = name;
        this.symbol = symbol;
        this.score = score;
    }
}
