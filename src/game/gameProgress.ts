import {
    hideFinalScreens,
    showFinalResult
} from "./gameResult";

let foundCardCount = 0;
let requiredCardCount = 0;
let resultTimeout: number | null = null;

/** Cancels a pending timeout for ending the current game. */
function clearResultTimeout(): void {
    if (resultTimeout === null) {
        return;
    }

    window.clearTimeout(resultTimeout);
    resultTimeout = null;
}

/** Shows the final result after the last pair animation finishes. */
function finishGame(): void {
    resultTimeout = null;
    showFinalResult();
}

/**
 * Resets progress tracking for a board with the supplied card count.
 * @param cardCount - Total number of cards in the new round.
 */
export function startGameProgress(cardCount: number): void {
    clearResultTimeout();
    foundCardCount = 0;
    requiredCardCount = cardCount;
    hideFinalScreens();
}

/**
 * Records one pair and reports whether it was the final pair.
 * @returns `true` when every card on the board has been found.
 */
export function recordFoundPair(): boolean {
    foundCardCount += 2;

    if (foundCardCount !== requiredCardCount) {
        return false;
    }

    resultTimeout = window.setTimeout(finishGame, 700);
    return true;
}
