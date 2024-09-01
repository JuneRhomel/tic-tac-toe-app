import buttonEffect from './sound/button.wav';
import XEffect from './sound/x.wav';
import OEffect from './sound/o.wav';
import EndGameEffect from './sound/end_game.wav';
import WinnerEffect from './sound/winner.wav';

export const XPlayerSound = () => {
    const gameMusic = new Audio(XEffect);
    gameMusic.play();
}

export const OPlayerSound = () => {
    const gameMusic = new Audio(OEffect);
    gameMusic.play();
}

export const WinnerSound = () => {
    const gameMusic = new Audio(WinnerEffect);
    gameMusic.play();
}
export const ButtonSound = () => {
    const gameMusic = new Audio(buttonEffect);
    gameMusic.play();
}
export const EndGame = () => {
    const gameMusic = new Audio(EndGameEffect);
    gameMusic.play();
}