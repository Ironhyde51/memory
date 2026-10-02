export type Player = "blue" | "orange";

const blueScoreOutput = document.getElementById("blue-score");
const orangeScoreOutput = document.getElementById("orange-score");
const currentPlayerMarker = document.getElementById("current-player-marker");

let currentPlayer: Player = "blue";
let blueScore = 0;
let orangeScore = 0;

function getPlayerName(player: Player): string {
    if (player === "blue") {
        return "Blue";
    }

    return "Orange";
}

function updateBlueScore(): void {
    if (blueScoreOutput === null) {
        return;
    }

    blueScoreOutput.textContent = blueScore.toString();
}

function updateOrangeScore(): void {
    if (orangeScoreOutput === null) {
        return;
    }

    orangeScoreOutput.textContent = orangeScore.toString();
}

function updateCurrentPlayerMarker(): void {
    if (currentPlayerMarker === null) {
        return;
    }

    const playerName = getPlayerName(currentPlayer);
    currentPlayerMarker.className =
        "game__current-player-marker game__current-player-marker--" +
        currentPlayer;
    currentPlayerMarker.setAttribute("aria-label", playerName);
}

function updateGameHeader(): void {
    updateBlueScore();
    updateOrangeScore();
    updateCurrentPlayerMarker();
}

export function startPlayerState(startingPlayer: Player): void {
    currentPlayer = startingPlayer;
    blueScore = 0;
    orangeScore = 0;
    updateGameHeader();
}

export function rewardCurrentPlayer(): void {
    if (currentPlayer === "blue") {
        blueScore += 2;
    } else {
        orangeScore += 2;
    }

    updateGameHeader();
}

export function changeCurrentPlayer(): void {
    if (currentPlayer === "blue") {
        currentPlayer = "orange";
    } else {
        currentPlayer = "blue";
    }

    updateCurrentPlayerMarker();
}

export function getBlueScore(): number {
    return blueScore;
}

export function getOrangeScore(): number {
    return orangeScore;
}
