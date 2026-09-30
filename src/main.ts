import codingThemeImage from "../assets/img/Theme CodingStyle.png";
import gamingThemeImage from "../assets/img/Theme GamingStyle.png";
import fantasyThemeImage from "../assets/img/Theme FantasyStyle.png";
import codingCardBack from "../assets/img/coding-cards/card-reverse.png";
import gamingCardBack from "../assets/img/gaming-cards/card-Revers.png";
import fantasyCardBack from "../assets/img/fantasy-cards/card-Revers.png";
import { createCardPairs } from "./game/cardPairs";
import { connectCardClick } from "./game/cardInteraction";
import { codingCards } from "./data/codingCards";
import { gamingCards } from "./data/gamingCards";
import { fantasyCards } from "./data/fantasyCards";
import { startPlayerState } from "./game/playerState";
import type { Player } from "./game/playerState";

const playButton = document.getElementById("play-button");
const homePage = document.getElementById("home-page");
const settingsPage = document.getElementById("settings-page");
const gamePage = document.getElementById("game-page");
const gameBoard = document.getElementById("game-board");

const themePreview = document.getElementById("theme-preview");
const codingTheme = document.getElementById("coding-theme");
const gamingTheme = document.getElementById("gaming-theme");
const fantasyTheme = document.getElementById("fantasy-theme");

const bluePlayer = document.getElementById("blue-player");
const orangePlayer = document.getElementById("orange-player");

const boardSize16 = document.getElementById("board-size-16");
const boardSize24 = document.getElementById("board-size-24");
const boardSize36 = document.getElementById("board-size-36");

const selectedTheme = document.getElementById("selected-theme");
const selectedPlayer = document.getElementById("selected-player");
const selectedBoardSize = document.getElementById(
    "selected-board-size"
);
const startGameButton = document.getElementById(
    "start-game-button"
);

let selectedThemeImage = codingThemeImage;
let selectedCardBack = codingCardBack;
let selectedCardFronts: string[] = codingCards;
let preparedCardFronts: string[] = [];
let isThemeSelected = false;
let isPlayerSelected = false;
let isBoardSizeSelected = false;
let chosenBoardSize = 0;
let chosenPlayer: Player | null = null;

type SelectionGroup = "theme" | "player" | "board-size";

function showSettings(): void {
    if (homePage === null || settingsPage === null) {
        return;
    }

    homePage.hidden = true;
    settingsPage.hidden = false;
}

function createCardBackImage(): HTMLImageElement {
    const cardImage = document.createElement("img");
    cardImage.className =
        "game__card-image game__card-image--back";
    cardImage.src = selectedCardBack;
    cardImage.alt = "";

    return cardImage;
}

function createCardFrontImage(
    cardFront: string
): HTMLImageElement {
    const cardImage = document.createElement("img");
    cardImage.className =
        "game__card-image game__card-image--front";
    cardImage.src = cardFront;
    cardImage.alt = "";

    return cardImage;
}

function createCardInner(
    cardFront: string
): HTMLDivElement {
    const cardInner = document.createElement("div");
    const cardBackImage = createCardBackImage();
    const cardFrontImage = createCardFrontImage(cardFront);

    cardInner.className = "game__card-inner";
    cardInner.append(cardBackImage, cardFrontImage);

    return cardInner;
}

function createCard(cardFront: string): HTMLButtonElement {
    const card = document.createElement("button");
    const cardInner = createCardInner(cardFront);

    card.className = "game__card";
    card.type = "button";
    card.setAttribute("aria-label", "Hidden memory card");
    card.setAttribute("data-card-front", cardFront);
    card.append(cardInner);
    connectCardClick(card);

    return card;
}

function clearBoard(): void {
    if (gameBoard === null) {
        return;
    }

    gameBoard.innerHTML = "";
}

function setBoardSizeClass(): void {
    if (gameBoard === null) {
        return;
    }

    gameBoard.className =
        "game__board game__board--" + chosenBoardSize;
}

function addCardsToBoard(): void {
    if (gameBoard === null) {
        return;
    }

    for (const cardFront of preparedCardFronts) {
        const newCard = createCard(cardFront);
        gameBoard.append(newCard);
    }
}

function prepareCardPairs(): void {
    preparedCardFronts = createCardPairs(
        selectedCardFronts,
        chosenBoardSize
    );
}

function createBoard(): void {
    clearBoard();
    setBoardSizeClass();
    prepareCardPairs();
    addCardsToBoard();
}

function showGame(): void {
    if (
        settingsPage === null ||
        gamePage === null ||
        chosenPlayer === null
    ) {
        return;
    }

    startPlayerState(chosenPlayer);
    createBoard();
    settingsPage.hidden = true;
    gamePage.hidden = false;
}

function updateThemePreview(imagePath: string): void {
    if (!(themePreview instanceof HTMLImageElement)) {
        return;
    }

    themePreview.src = imagePath;
}

function connectTheme(
    themeInput: HTMLElement | null,
    imagePath: string
): void {
    if (themeInput === null) {
        return;
    }

    themeInput.addEventListener("change", function (): void {
        selectedThemeImage = imagePath;
        updateThemePreview(imagePath);
    });
}

function connectCardBack(
    themeInput: HTMLElement | null,
    cardBack: string
): void {
    if (themeInput === null) {
        return;
    }

    themeInput.addEventListener("change", function (): void {
        selectedCardBack = cardBack;
    });
}

function connectCardFronts(
    themeInput: HTMLElement | null,
    cardFronts: string[]
): void {
    if (themeInput === null) {
        return;
    }

    themeInput.addEventListener("change", function (): void {
        selectedCardFronts = cardFronts;
    });
}

function restoreSelectedPreview(): void {
    updateThemePreview(selectedThemeImage);
}

function connectThemeHover(themeInput: HTMLElement | null, imagePath: string): void {
    if (themeInput === null || themeInput.parentElement === null) {
        return;
    }

    const themeOption = themeInput.parentElement;

    themeOption.addEventListener("mouseenter", function (): void {
        updateThemePreview(imagePath);
    });

    themeOption.addEventListener("mouseleave", restoreSelectedPreview);
}

if (playButton !== null) {
    playButton.addEventListener("click", showSettings);
}

if (startGameButton !== null) {
    startGameButton.addEventListener("click", showGame);
}

function updateSelection(
    output: HTMLElement | null,
    text: string
): void {
    if (output === null) {
        return;
    }

    output.textContent = text;
}

function updateStartButton(): void {
    if (!(startGameButton instanceof HTMLButtonElement)) {
        return;
    }

    const allSelected =
        isThemeSelected &&
        isPlayerSelected &&
        isBoardSizeSelected;

    startGameButton.disabled = !allSelected;
}

function selectGroup(group: SelectionGroup): void {
    if (group === "theme") {
        isThemeSelected = true;
    }
    if (group === "player") {
        isPlayerSelected = true;
    }
    if (group === "board-size") {
        isBoardSizeSelected = true;
    }
    updateStartButton();
}

function connectSelection(
    input: HTMLElement | null,
    output: HTMLElement | null,
    text: string,
    group: SelectionGroup
): void {
    if (input === null) {
        return;
    }
    input.addEventListener("change", function (): void {
        updateSelection(output, text);
        selectGroup(group);
    });
}

function connectBoardSize(
    input: HTMLElement | null,
    size: number
): void {
    if (input === null) {
        return;
    }

    input.addEventListener("change", function (): void {
        chosenBoardSize = size;
    });
}

function connectStartingPlayer(
    input: HTMLElement | null,
    player: Player
): void {
    if (input === null) {
        return;
    }

    input.addEventListener("change", function (): void {
        chosenPlayer = player;
    });
}

connectTheme(codingTheme, codingThemeImage);
connectTheme(gamingTheme, gamingThemeImage);
connectTheme(fantasyTheme, fantasyThemeImage);

connectCardBack(codingTheme, codingCardBack);
connectCardBack(gamingTheme, gamingCardBack);
connectCardBack(fantasyTheme, fantasyCardBack);

connectCardFronts(codingTheme, codingCards);
connectCardFronts(gamingTheme, gamingCards);
connectCardFronts(fantasyTheme, fantasyCards);

connectThemeHover(codingTheme, codingThemeImage);
connectThemeHover(gamingTheme, gamingThemeImage);
connectThemeHover(fantasyTheme, fantasyThemeImage);

connectSelection(codingTheme, selectedTheme, "Coding theme", "theme");
connectSelection(gamingTheme, selectedTheme, "Gaming theme", "theme");
connectSelection(fantasyTheme, selectedTheme, "Fantasy theme", "theme");

connectSelection(bluePlayer, selectedPlayer, "Blue Player", "player");
connectSelection(orangePlayer, selectedPlayer, "Orange Player", "player");
connectStartingPlayer(bluePlayer, "blue");
connectStartingPlayer(orangePlayer, "orange");

connectSelection(boardSize16, selectedBoardSize, "Board-16 Cards", "board-size");
connectSelection(boardSize24, selectedBoardSize, "Board-24 Cards", "board-size");
connectSelection(boardSize36, selectedBoardSize, "Board-36 Cards", "board-size");

connectBoardSize(boardSize16, 16);
connectBoardSize(boardSize24, 24);
connectBoardSize(boardSize36, 36);
