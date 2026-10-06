export type Player = "blue" | "orange";

const blueScoreOutput = document.getElementById("blue-score");
const orangeScoreOutput = document.getElementById("orange-score");
const currentPlayerMarker = document.getElementById("current-player-marker");

let currentPlayer: Player = "blue";
let selectedPlayer: Player = "blue";
let blueScore = 0;
let orangeScore = 0;

/**
 * Returns the display name of the supplied player.
 * @param player - Player whose display name is required.
 * @returns The player's readable display name.
 */
function getPlayerName(player: Player): string {
    if (player === "blue") {
        return "Blue";
    }

    return "Orange";
}

/** Updates the blue score shown in the game header. */
function updateBlueScore(): void {
    if (blueScoreOutput === null) {
        return;
    }

    blueScoreOutput.textContent = blueScore.toString();
}

/** Updates the orange score shown in the game header. */
function updateOrangeScore(): void {
    if (orangeScoreOutput === null) {
        return;
    }

    orangeScoreOutput.textContent = orangeScore.toString();
}

/** Updates the marker that identifies the current player. */
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

/** Updates all changing values shown in the game header. */
function updateGameHeader(): void {
    updateBlueScore();
    updateOrangeScore();
    updateCurrentPlayerMarker();
}

/**
 * Resets scores and selects the player who starts a new game.
 * @param startingPlayer - Player who takes the first turn.
 */
export function startPlayerState(startingPlayer: Player): void {
    selectedPlayer = startingPlayer;
    currentPlayer = startingPlayer;
    blueScore = 0;
    orangeScore = 0;
    updateGameHeader();
}

/** Awards one point to the current player. */
export function rewardCurrentPlayer(): void {
    if (currentPlayer === "blue") {
        blueScore += 1;
    } else {
        orangeScore += 1;
    }

    updateGameHeader();
}

/** Passes the current turn to the other player. */
export function changeCurrentPlayer(): void {
    if (currentPlayer === "blue") {
        currentPlayer = "orange";
    } else {
        currentPlayer = "blue";
    }

    updateCurrentPlayerMarker();
}

/**
 * Returns the current score of the blue player.
 * @returns The blue player's score.
 */
export function getBlueScore(): number {
    return blueScore;
}

/**
 * Returns the current score of the orange player.
 * @returns The orange player's score.
 */
export function getOrangeScore(): number {
    return orangeScore;
}

/**
 * Returns the player who was selected to start the round.
 * @returns The selected starting player.
 */
export function getSelectedPlayer(): Player {
    return selectedPlayer;
}
