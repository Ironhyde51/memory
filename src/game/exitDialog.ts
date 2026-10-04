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
const backToStartButton = document.getElementById(
    "back-to-start-button"
);
const resultBackButton = document.getElementById(
    "result-back-button"
);

const gameOverPage = document.getElementById("game-over-page");
const resultPage = document.getElementById("result-page");

function openExitDialog(): void {
    if (!(exitDialog instanceof HTMLDialogElement)) {
        return;
    }

    exitDialog.showModal();
}

function closeExitDialog(): void {
    if (
        !(exitDialog instanceof HTMLDialogElement) ||
        !exitDialog.open
    ) {
        return;
    }

    exitDialog.close();
}

function hideFinishedGamePages(): void {
    if (gameOverPage !== null) {
        gameOverPage.hidden = true;
    }

    if (resultPage !== null) {
        resultPage.hidden = true;
    }
}

function leaveGame(): void {
    if (gamePage === null || settingsPage === null) {
        return;
    }

    closeExitDialog();
    gamePage.hidden = true;
    hideFinishedGamePages();
    settingsPage.hidden = false;
}

function connectBackToStartButtons(): void {
    if (backToStartButton !== null) {
        backToStartButton.addEventListener("click", leaveGame);
    }

    if (resultBackButton !== null) {
        resultBackButton.addEventListener("click", leaveGame);
    }
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
    connectBackToStartButtons();
}
