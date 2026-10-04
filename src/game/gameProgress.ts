import {
    hideFinalScreens,
    showFinalResult
} from "./gameResult";

let foundCardCount = 0;
let requiredCardCount = 0;
let resultTimeout: number | null = null;

function clearResultTimeout(): void {
    if (resultTimeout === null) {
        return;
    }

    window.clearTimeout(resultTimeout);
    resultTimeout = null;
}

function finishGame(): void {
    resultTimeout = null;
    showFinalResult();
}

export function startGameProgress(cardCount: number): void {
    clearResultTimeout();
    foundCardCount = 0;
    requiredCardCount = cardCount;
    hideFinalScreens();
}

export function recordFoundPair(): void {
    foundCardCount += 2;

    if (foundCardCount !== requiredCardCount) {
        return;
    }

    resultTimeout = window.setTimeout(finishGame, 700);
}