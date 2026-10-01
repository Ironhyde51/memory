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

function openExitDialog(): void {
    if (!(exitDialog instanceof HTMLDialogElement)) {
        return;
    }

    exitDialog.showModal();
}

function closeExitDialog(): void {
    if (!(exitDialog instanceof HTMLDialogElement)) {
        return;
    }

    exitDialog.close();
}

function leaveGame(): void {
    if (gamePage === null || settingsPage === null) {
        return;
    }

    closeExitDialog();
    gamePage.hidden = true;
    settingsPage.hidden = false;
}

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
}