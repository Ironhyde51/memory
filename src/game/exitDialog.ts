const exitGameButton = document.getElementById(
    "exit-game-button"
);
const exitDialog = document.getElementById("exit-dialog");
const backToGameButton = document.getElementById(
    "back-to-game-button"
);
const confirmExitButton = document.getElementById(
    "confirm-exit-button"
);
const gamePage = document.getElementById("game-page");
const settingsPage = document.getElementById("settings-page");
const resultBackButton = document.getElementById(
    "result-back-button"
);

const gameOverPage = document.getElementById("game-over-page");
const resultPage = document.getElementById("result-page");

/** Opens the confirmation dialog for leaving the current game. */
function openExitDialog(): void {
    if (!(exitDialog instanceof HTMLDialogElement)) {
        return;
    }

    exitDialog.showModal();
}

/** Closes the exit dialog when it is currently open. */
function closeExitDialog(): void {
    if (
        !(exitDialog instanceof HTMLDialogElement) ||
        !exitDialog.open
    ) {
        return;
    }

    exitDialog.close();
}

/** Hides pages that can remain visible after a finished game. */
function hideFinishedGamePages(): void {
    if (gameOverPage !== null) {
        gameOverPage.hidden = true;
    }

    if (resultPage !== null) {
        resultPage.hidden = true;
    }
}

/** Leaves the current round and returns to the settings page. */
function leaveGame(): void {
    if (gamePage === null || settingsPage === null) {
        return;
    }

    closeExitDialog();
    gamePage.hidden = true;
    hideFinishedGamePages();
    settingsPage.hidden = false;
}

/** Connects the result screen button with the settings page. */
function connectResultBackButton(): void {
    if (resultBackButton === null) {
        return;
    }

    resultBackButton.addEventListener("click", leaveGame);
}

/** Connects every button used to open, close, or confirm the dialog. */
export function connectExitDialog(): void {
    if (exitGameButton !== null) {
        exitGameButton.addEventListener("click", openExitDialog);
    }

    if (backToGameButton !== null) {
        backToGameButton.addEventListener("click", closeExitDialog);
    }

    if (confirmExitButton !== null) {
        confirmExitButton.addEventListener("click", leaveGame);
    }
    connectResultBackButton();
}
