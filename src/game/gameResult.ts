import bluePlayerIcon from "../../assets/icons/chess_pawn-blue.svg";
import orangePlayerIcon from "../../assets/icons/chess_pawn-orange.svg";
import drawIcon from "../../assets/img/gaming-cards/Draw-Icon.png";
import gamingDrawIcon from "../../assets/img/gaming-cards/draw-gaming-icon.png";
import gamingWinnerIcon from "../../assets/img/gaming-cards/pockal 1.png";
import fantasyBlueWinnerIcon from "../../assets/img/fantasy-cards/fantasy-ui/fantasy-winner-crown.png";
import fantasyOrangeWinnerIcon from "../../assets/img/fantasy-cards/fantasy-ui/fantasy-winner-crown-orange.png";
import fantasyDrawIcon from "../../assets/img/fantasy-cards/fantasy-ui/fantasy-draw-emblem.png";

import {
    getBlueScore,
    getOrangeScore
} from "./playerState";
import { getSelectedGameTheme } from "./themeState";

export type Winner = "blue" | "orange";
export type FinalResult = Winner | "draw";

const gamePage = document.getElementById("game-page");
const gameOverPage = document.getElementById("game-over-page");
const resultPage = document.getElementById("result-page");
const resultConfetti = document.getElementById("result-confetti");

const finalBlueScore = document.getElementById("final-blue-score");
const finalOrangeScore = document.getElementById(
    "final-orange-score"
);

const resultMessage = document.getElementById("result-message");
const resultTitle = document.getElementById("result-title");
const resultBackLabel = document.getElementById(
    "result-back-label"
);
const resultIcon = document.getElementById(
    "result-icon"
) as HTMLImageElement | null;
const RESULT_SCREEN_DELAY = 1800;
let resultTransitionTimeout: number | null = null;

/**
 * Determines the final result by comparing both player scores.
 * @returns The winning player or `draw` when both scores are equal.
 */
export function getFinalResult(): FinalResult {
    const blueScore = getBlueScore();
    const orangeScore = getOrangeScore();

    if (blueScore === orangeScore) {
        return "draw";
    }

    if (blueScore > orangeScore) {
        return "blue";
    }

    return "orange";
}

/** Updates the blue score shown on the Game Over screen. */
function updateFinalBlueScore(): void {
    if (finalBlueScore === null) {
        return;
    }

    finalBlueScore.textContent = getBlueScore().toString();
}

/** Updates the orange score shown on the Game Over screen. */
function updateFinalOrangeScore(): void {
    if (finalOrangeScore === null) {
        return;
    }

    finalOrangeScore.textContent = getOrangeScore().toString();
}

/** Updates both scores shown on the Game Over screen. */
function updateFinalScores(): void {
    updateFinalBlueScore();
    updateFinalOrangeScore();
}

/** Displays the Game Over screen with the complete final score. */
function showGameOverScreen(): void {
    if (gameOverPage === null) {
        return;
    }

    updateFinalScores();
    gameOverPage.hidden = false;
}

/** Prepares the introductory message for a winner result. */
function prepareWinnerMessage(): void {
    if (resultMessage === null) {
        return;
    }

    resultMessage.textContent = "The winner is";
}

/**
 * Returns the blue winner title for the selected theme.
 * @returns The formatted blue winner title.
 */
function getBlueWinnerTitle(): string {
    if (getSelectedGameTheme() === "gaming") {
        return "Blue Player";
    }

    return "BLUE PLAYER";
}

/**
 * Returns the orange winner title for the selected theme.
 * @returns The formatted orange winner title.
 */
function getOrangeWinnerTitle(): string {
    if (getSelectedGameTheme() === "gaming") {
        return "Orange Player";
    }

    return "ORANGE PLAYER";
}

/**
 * Sets the winner title and its matching player class.
 * @param winner - Player with the higher final score.
 */
function prepareWinnerTitle(winner: Winner): void {
    if (resultTitle === null) {
        return;
    }

    if (winner === "blue") {
        resultTitle.textContent = getBlueWinnerTitle();
        resultTitle.className = "result__title result__title--blue";
        return;
    }

    resultTitle.textContent = getOrangeWinnerTitle();
    resultTitle.className = "result__title result__title--orange";
}

/** Applies the Gaming theme trophy to the winner screen. */
function prepareGamingWinnerIcon(): void {
    if (resultIcon === null) {
        return;
    }

    resultIcon.src = gamingWinnerIcon;
    resultIcon.className =
        "result__icon result__icon--gaming-winner";
}

/**
 * Applies the matching player pawn to the Coding winner screen.
 * @param winner - Player whose pawn should be displayed.
 */
function preparePlayerWinnerIcon(winner: Winner): void {
    if (resultIcon === null) {
        return;
    }

    if (winner === "blue") {
        resultIcon.src = bluePlayerIcon;
        resultIcon.className = "result__icon";
        return;
    }

    resultIcon.src = orangePlayerIcon;
    resultIcon.className = "result__icon";
}

/**
 * Applies the matching crown to the Fantasy winner screen.
 * @param winner - Player whose crown should be displayed.
 */
function prepareFantasyWinnerIcon(winner: Winner): void {
    if (resultIcon === null) {
        return;
    }

    if (winner === "blue") {
        resultIcon.src = fantasyBlueWinnerIcon;
    } else {
        resultIcon.src = fantasyOrangeWinnerIcon;
    }
    resultIcon.className =
        "result__icon result__icon--fantasy-winner";
}

/**
 * Selects the winner icon that belongs to the active theme.
 * @param winner - Player whose themed icon should be displayed.
 */
function prepareWinnerIcon(winner: Winner): void {
    if (getSelectedGameTheme() === "gaming") {
        prepareGamingWinnerIcon();
        return;
    }

    if (getSelectedGameTheme() === "fantasy") {
        prepareFantasyWinnerIcon(winner);
        return;
    }

    preparePlayerWinnerIcon(winner);
}

/** Makes the winner confetti visible. */
function showConfetti(): void {
    if (resultConfetti === null) {
        return;
    }

    resultConfetti.hidden = false;
}

/**
 * Prepares all text and images for a winner result.
 * @param winner - Player shown as the winner.
 */
function prepareWinnerScreen(winner: Winner): void {
    prepareWinnerMessage();
    prepareWinnerTitle(winner);
    prepareWinnerIcon(winner);
    showConfetti();
}

/** Prepares the introductory message for a draw result. */
function prepareDrawMessage(): void {
    if (resultMessage === null) {
        return;
    }

    resultMessage.textContent = "It’s a";
}

/** Prepares the title used for a draw result. */
function prepareDrawTitle(): void {
    if (resultTitle === null) {
        return;
    }

    resultTitle.textContent = "DRAW";
    resultTitle.className = "result__title result__title--draw";
}

/** Applies the Gaming theme image to the draw screen. */
function prepareGamingDrawIcon(): void {
    if (resultIcon === null) {
        return;
    }

    resultIcon.src = gamingDrawIcon;
    resultIcon.className =
        "result__icon result__icon--draw result__icon--gaming-draw";
}

/** Applies the Coding theme image to the draw screen. */
function prepareDefaultDrawIcon(): void {
    if (resultIcon === null) {
        return;
    }

    resultIcon.src = drawIcon;
    resultIcon.className = "result__icon result__icon--draw";
}

/** Applies the Fantasy theme emblem to the draw screen. */
function prepareFantasyDrawIcon(): void {
    if (resultIcon === null) {
        return;
    }

    resultIcon.src = fantasyDrawIcon;
    resultIcon.className =
        "result__icon result__icon--draw result__icon--fantasy-draw";
}

/** Selects the draw icon that belongs to the active theme. */
function prepareDrawIcon(): void {
    if (getSelectedGameTheme() === "gaming") {
        prepareGamingDrawIcon();
        return;
    }

    if (getSelectedGameTheme() === "fantasy") {
        prepareFantasyDrawIcon();
        return;
    }

    prepareDefaultDrawIcon();
}

/** Hides confetti because a draw has no winner. */
function hideConfetti(): void {
    if (resultConfetti === null) {
        return;
    }

    resultConfetti.hidden = true;
}

/** Prepares all text and images for a draw result. */
function prepareDrawScreen(): void {
    prepareDrawMessage();
    prepareDrawTitle();
    prepareDrawIcon();
    hideConfetti();
}

/**
 * Reports whether the active game page is already hidden.
 * @returns `true` when the game page is missing or hidden.
 */
function gameIsHidden(): boolean {
    if (gamePage === null) {
        return true;
    }

    return Boolean(gamePage.hidden);
}

/** Hides the active game page. */
function hideGamePage(): void {
    if (gamePage === null) {
        return;
    }

    gamePage.hidden = true;
}

/** Sets the result button label required by the active theme. */
function updateResultBackLabel(): void {
    if (resultBackLabel === null) {
        return;
    }

    if (getSelectedGameTheme() === "gaming") {
        resultBackLabel.textContent = "Home";
        return;
    }

    resultBackLabel.textContent = "Back to start";
}

/** Displays the prepared result page. */
function showResultPage(): void {
    if (resultPage === null) {
        return;
    }

    updateResultBackLabel();
    resultPage.hidden = false;
}

/**
 * Prepares and displays the winner screen.
 * @param winner - Player shown as the winner.
 */
function showWinnerScreen(winner: Winner): void {
    prepareWinnerScreen(winner);
    showResultPage();
}

/** Prepares and displays the draw screen. */
function showDrawScreen(): void {
    prepareDrawScreen();
    showResultPage();
}

/**
 * Displays either the winner screen or the draw screen.
 * @param finalResult - Winner or draw result to display.
 */
function showResultScreen(finalResult: FinalResult): void {
    if (finalResult === "draw") {
        showDrawScreen();
        return;
    }

    showWinnerScreen(finalResult);
}

/** Finishes the delayed transition to the final result screen. */
function finishResultTransition(): void {
    resultTransitionTimeout = null;
    showResultScreen(getFinalResult());
}

/** Starts the delay between Game Over and the result screen. */
function startResultTransition(): void {
    resultTransitionTimeout = window.setTimeout(
        finishResultTransition,
        RESULT_SCREEN_DELAY
    );
}

/** Cancels a pending transition to the result screen. */
function clearResultTransitionTimeout(): void {
    if (resultTransitionTimeout === null) {
        return;
    }

    window.clearTimeout(resultTransitionTimeout);
    resultTransitionTimeout = null;
}

/** Ends the game and starts the Game Over result sequence. */
export function showFinalResult(): void {
    if (gameIsHidden()) {
        return;
    }

    hideGamePage();
    showGameOverScreen();
    startResultTransition();
}

/** Hides the Game Over page. */
function hideGameOverPage(): void {
    if (gameOverPage === null) {
        return;
    }

    gameOverPage.hidden = true;
}

/** Hides the winner or draw result page. */
function hideResultPage(): void {
    if (resultPage === null) {
        return;
    }

    resultPage.hidden = true;
}

/** Cancels result timers and hides all finished-game pages. */
export function hideFinalScreens(): void {
    clearResultTransitionTimeout();
    hideGameOverPage();
    hideResultPage();
}
