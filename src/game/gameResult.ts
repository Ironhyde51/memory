import bluePlayerIcon from "../../assets/icons/blue-player.png";
import orangePlayerIcon from "../../assets/icons/orange-player.png";
import drawIcon from "../../assets/img/gaming-cards/Draw-Icon.png";
import gamingDrawIcon from "../../assets/img/gaming-cards/draw-gaming-icon.png";
import gamingWinnerIcon from "../../assets/img/gaming-cards/pockal 1.png";
import fantasyBlueWinnerIcon from "../../assets/img/fantasy-cards/fantasy-ui/fantasy-winner-crown.png";
import fantasyOrangeWinnerIcon from "../../assets/img/fantasy-cards/fantasy-ui/fantasy-winner-crown-orange.png";
import fantasyDrawIcon from "../../assets/img/fantasy-cards/fantasy-ui/fantasy-draw-emblem.png";

import {
    getBlueScore,
    getOrangeScore,
    getSelectedPlayer
} from "./playerState";
import { getSelectedGameTheme } from "./themeState";

export type FinalResult = "win" | "loss" | "draw";

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

function isDraw(): boolean {
    return getBlueScore() === getOrangeScore();
}

function didSelectedPlayerWin(): boolean {
    const selectedPlayer = getSelectedPlayer();

    if (selectedPlayer === "blue") {
        return getBlueScore() > getOrangeScore();
    }

    return getOrangeScore() > getBlueScore();
}

export function getFinalResult(): FinalResult {
    if (isDraw()) {
        return "draw";
    }

    if (didSelectedPlayerWin()) {
        return "win";
    }

    return "loss";
}

function updateFinalBlueScore(): void {
    if (finalBlueScore === null) {
        return;
    }

    finalBlueScore.textContent = getBlueScore().toString();
}

function updateFinalOrangeScore(): void {
    if (finalOrangeScore === null) {
        return;
    }

    finalOrangeScore.textContent = getOrangeScore().toString();
}

function updateFinalScores(): void {
    updateFinalBlueScore();
    updateFinalOrangeScore();
}

function showLossScreen(): void {
    if (gameOverPage === null) {
        return;
    }

    updateFinalScores();
    gameOverPage.hidden = false;
}

function prepareWinnerMessage(): void {
    if (resultMessage === null) {
        return;
    }

    resultMessage.textContent = "The winner is";
}

function getBlueWinnerTitle(): string {
    if (getSelectedGameTheme() === "gaming") {
        return "Blue Player";
    }

    return "BLUE PLAYER";
}

function getOrangeWinnerTitle(): string {
    if (getSelectedGameTheme() === "gaming") {
        return "Orange Player";
    }

    return "ORANGE PLAYER";
}

function prepareWinnerTitle(): void {
    if (resultTitle === null) {
        return;
    }

    if (getSelectedPlayer() === "blue") {
        resultTitle.textContent = getBlueWinnerTitle();
        resultTitle.className = "result__title result__title--blue";
        return;
    }

    resultTitle.textContent = getOrangeWinnerTitle();
    resultTitle.className = "result__title result__title--orange";
}

function prepareGamingWinnerIcon(): void {
    if (resultIcon === null) {
        return;
    }

    resultIcon.src = gamingWinnerIcon;
    resultIcon.className =
        "result__icon result__icon--gaming-winner";
}

function preparePlayerWinnerIcon(): void {
    if (resultIcon === null) {
        return;
    }

    if (getSelectedPlayer() === "blue") {
        resultIcon.src = bluePlayerIcon;
        resultIcon.className = "result__icon";
        return;
    }

    resultIcon.src = orangePlayerIcon;
    resultIcon.className = "result__icon";
}

function prepareFantasyWinnerIcon(): void {
    if (resultIcon === null) {
        return;
    }

    if (getSelectedPlayer() === "blue") {
        resultIcon.src = fantasyBlueWinnerIcon;
    } else {
        resultIcon.src = fantasyOrangeWinnerIcon;
    }
    resultIcon.className =
        "result__icon result__icon--fantasy-winner";
}

function prepareWinnerIcon(): void {
    if (getSelectedGameTheme() === "gaming") {
        prepareGamingWinnerIcon();
        return;
    }

    if (getSelectedGameTheme() === "fantasy") {
        prepareFantasyWinnerIcon();
        return;
    }

    preparePlayerWinnerIcon();
}

function showConfetti(): void {
    if (resultConfetti === null) {
        return;
    }

    resultConfetti.hidden = false;
}

function prepareWinnerScreen(): void {
    prepareWinnerMessage();
    prepareWinnerTitle();
    prepareWinnerIcon();
    showConfetti();
}

function prepareDrawMessage(): void {
    if (resultMessage === null) {
        return;
    }

    resultMessage.textContent = "It’s a";
}

function prepareDrawTitle(): void {
    if (resultTitle === null) {
        return;
    }

    resultTitle.textContent = "DRAW";
    resultTitle.className = "result__title result__title--draw";
}

function prepareGamingDrawIcon(): void {
    if (resultIcon === null) {
        return;
    }

    resultIcon.src = gamingDrawIcon;
    resultIcon.className =
        "result__icon result__icon--draw result__icon--gaming-draw";
}

function prepareDefaultDrawIcon(): void {
    if (resultIcon === null) {
        return;
    }

    resultIcon.src = drawIcon;
    resultIcon.className = "result__icon result__icon--draw";
}

function prepareFantasyDrawIcon(): void {
    if (resultIcon === null) {
        return;
    }

    resultIcon.src = fantasyDrawIcon;
    resultIcon.className =
        "result__icon result__icon--draw result__icon--fantasy-draw";
}

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

function hideConfetti(): void {
    if (resultConfetti === null) {
        return;
    }

    resultConfetti.hidden = true;
}

function prepareDrawScreen(): void {
    prepareDrawMessage();
    prepareDrawTitle();
    prepareDrawIcon();
    hideConfetti();
}

function gameIsHidden(): boolean {
    if (gamePage === null) {
        return true;
    }

    return Boolean(gamePage.hidden);
}

function hideGamePage(): void {
    if (gamePage === null) {
        return;
    }

    gamePage.hidden = true;
}

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

function showResultPage(): void {
    if (resultPage === null) {
        return;
    }

    updateResultBackLabel();
    resultPage.hidden = false;
}

function showWinnerScreen(): void {
    prepareWinnerScreen();
    showResultPage();
}

function showDrawScreen(): void {
    prepareDrawScreen();
    showResultPage();
}

function showNonLossResult(finalResult: FinalResult): void {
    if (finalResult === "draw") {
        showDrawScreen();
        return;
    }

    showWinnerScreen();
}

export function showFinalResult(): void {
    if (gameIsHidden()) {
        return;
    }
    const finalResult = getFinalResult();
    hideGamePage();

    if (finalResult === "loss") {
        showLossScreen();
        return;
    }

    showNonLossResult(finalResult);
}

function hideGameOverPage(): void {
    if (gameOverPage === null) {
        return;
    }

    gameOverPage.hidden = true;
}

function hideResultPage(): void {
    if (resultPage === null) {
        return;
    }

    resultPage.hidden = true;
}

export function hideFinalScreens(): void {
    hideGameOverPage();
    hideResultPage();
}
