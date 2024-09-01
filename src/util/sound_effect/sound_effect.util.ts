import buttonEffect from './sound/button.wav';
import XEffect from './sound/x.wav';
import OEffect from './sound/o.wav';
import EndGameEffect from './sound/end_game.wav';
import WinnerEffect from './sound/winner.wav';

export const XPlayerSound = () => {
    try {
        const gameMusic = new Audio(XEffect);
        gameMusic.play().catch(error => {
            console.error("Error playing XPlayerSound:", error);
        });
    } catch (error) {
        console.error("Error initializing XPlayerSound:", error);
    }
};

export const OPlayerSound = () => {
    try {
        const gameMusic = new Audio(OEffect);
        gameMusic.play().catch(error => {
            console.error("Error playing OPlayerSound:", error);
        });
    } catch (error) {
        console.error("Error initializing OPlayerSound:", error);
    }
};

export const WinnerSound = () => {
    try {
        const gameMusic = new Audio(WinnerEffect);
        gameMusic.play().catch(error => {
            console.error("Error playing WinnerSound:", error);
        });
    } catch (error) {
        console.error("Error initializing WinnerSound:", error);
    }
};

export const ButtonSound = () => {
    try {
        const gameMusic = new Audio(buttonEffect);
        gameMusic.play().catch(error => {
            console.error("Error playing ButtonSound:", error);
        });
    } catch (error) {
        console.error("Error initializing ButtonSound:", error);
    }
};

export const EndGame = () => {
    try {
        const gameMusic = new Audio(EndGameEffect);
        gameMusic.play().catch(error => {
            console.error("Error playing EndGameSound:", error);
        });
    } catch (error) {
        console.error("Error initializing EndGameSound:", error);
    }
};
