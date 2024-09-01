import buttonEffect from './sound/button.wav';
import XEffect from './sound/x.wav';
import OEffect from './sound/o.wav';
import EndGameEffect from './sound/end_game.wav';
import WinnerEffect from './sound/winner.wav';



export const loadAudio = (src: string) => {
    return new Promise<HTMLAudioElement>((resolve, reject) => {
        const audio = new Audio(src);

        audio.oncanplaythrough = () => {
            resolve(audio);
        };

        audio.onerror = () => {
            reject(new Error(`Audio file could not be loaded: ${src}`));
        };
    });
};


export const XPlayerSound = async () => {
    const gameMusic = await loadAudio(XEffect);
    gameMusic.play().catch(error => {
        console.error("Error playing XPlayerSound:", error);
    });
};

export const OPlayerSound = async () => {
    const gameMusic = await loadAudio(OEffect);
    gameMusic.play().catch(error => {
        console.error("Error playing OPlayerSound:", error);
    });

};

export const WinnerSound = async () => {

    const gameMusic = await loadAudio(WinnerEffect);
    gameMusic.play().catch(error => {
        console.error("Error playing WinnerSound:", error);
    });

};

export const ButtonSound = async () => {

    const gameMusic = await loadAudio(buttonEffect);
    gameMusic.play().catch(error => {
        console.error("Error playing ButtonSound:", error);
    });

};

export const EndGame = async () => {

    const gameMusic = await loadAudio(EndGameEffect);
    gameMusic.play().catch(error => {
        console.error("Error playing EndGameSound:", error);
    });

};
