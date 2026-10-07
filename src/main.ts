import "../scss/main.scss";
import codingThemeImage from "../assets/img/Theme CodingStyle.png";
import gamingThemeImage from "../assets/img/Theme GamingStyle.png";
import fantasyThemeImage from "../assets/img/Theme FantasyStyle.png";
import codingCardBack from "../assets/img/coding-cards/card-reverse.png";
import gamingCardBack from "../assets/img/gaming-cards/card-Revers.png";
import fantasyCardBack from "../assets/img/fantasy-cards/card-Revers.png";
import { createCardPairs } from "./game/cardPairs";
import {
    connectCardClick,
    resetCardInteraction
} from "./game/cardInteraction";
import { startGameProgress } from "./game/gameProgress";
import { codingCards } from "./data/codingCards";
import { gamingCards } from "./data/gamingCards";
import { fantasyCards } from "./data/fantasyCards";
import { startPlayerState } from "./game/playerState";
import type { Player } from "./game/playerState";
import { connectExitDialog } from "./game/exitDialog";
import {
    applyGameTheme,
    selectGameTheme,
    type GameTheme
} from "./game/themeState";

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

/**
 * Stores the selected radio button.
 * @param input - Selected radio button.
 * @param group - Settings group of the radio button.
 */
function saveSelection(
    input: HTMLElement,
    group: SelectionGroup
): void {
    const key = "memory-selection-" + group;
    localStorage.setItem(key, input.id);
}

/**
 * Restores one saved radio-button selection.
 * @param group - Settings group that should be restored.
 */
function restoreSelection(group: SelectionGroup): void {
    const key = "memory-selection-" + group;
    const savedId = localStorage.getItem(key);
    if (savedId === null) {
        return;
    }
    const radioButton = document.getElementById(savedId);
    if (radioButton instanceof HTMLInputElement) {
        radioButton.click();
    }
}

/** Restores all saved settings. */
function restoreSettings(): void {
    restoreSelection("theme");
    restoreSelection("player");
    restoreSelection("board-size");
}

/** Replaces the home page with the settings page. */
function showSettings(): void {
    if (homePage === null || settingsPage === null) {
        return;
    }

    homePage.hidden = true;
    settingsPage.hidden = false;
}

/**
 * Creates the image element used for the back of a card.
 * @returns The configured card-back image element.
 */
function createCardBackImage(): HTMLImageElement {
    const cardImage = document.createElement("img");
    cardImage.className =
        "game__card-image game__card-image--back";
    cardImage.src = selectedCardBack;
    cardImage.alt = "";

    return cardImage;
}

/**
 * Creates the image element used for one card front.
 * @param cardFront - Path to the card-front image.
 * @returns The configured card-front image element.
 */
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

/**
 * Creates the rotating inner container for one memory card.
 * @param cardFront - Path to the card-front image.
 * @returns The card's inner container with both card faces.
 */
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

/**
 * Creates one interactive memory card.
 * @param cardFront - Path to the card-front image.
 * @returns The configured memory-card button.
 */
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

/** Removes every card from the current board. */
function clearBoard(): void {
    if (gameBoard === null) {
        return;
    }

    gameBoard.innerHTML = "";
}

/** Applies the board class that matches the selected card count. */
function setBoardSizeClass(): void {
    if (gameBoard === null) {
        return;
    }

    gameBoard.className =
        "game__board game__board--" + chosenBoardSize;
}

/** Creates all prepared cards and adds them to the game board. */
function addCardsToBoard(): void {
    if (gameBoard === null) {
        return;
    }

    for (const cardFront of preparedCardFronts) {
        const newCard = createCard(cardFront);
        gameBoard.append(newCard);
    }
}

/** Prepares shuffled pairs for the selected theme and board size. */
function prepareCardPairs(): void {
    preparedCardFronts = createCardPairs(
        selectedCardFronts,
        chosenBoardSize
    );
}

/** Resets game state and creates a new board. */
function createBoard(): void {
    resetCardInteraction();
    startGameProgress(chosenBoardSize);
    clearBoard();
    setBoardSizeClass();
    prepareCardPairs();
    addCardsToBoard();
}

/** Starts a configured game and displays the game page. */
function showGame(): void {
    if (
        settingsPage === null ||
        gamePage === null ||
        chosenPlayer === null
    ) {
        return;
    }
    startPlayerState(chosenPlayer);
    applyGameTheme();
    createBoard();
    settingsPage.hidden = true;
    gamePage.hidden = false;
}

/**
 * Replaces the image shown in the theme preview.
 * @param imagePath - Path to the preview image that should be shown.
 */
function updateThemePreview(imagePath: string): void {
    if (!(themePreview instanceof HTMLImageElement)) {
        return;
    }

    themePreview.src = imagePath;
}

/**
 * Connects a theme input with its preview and game theme.
 * @param themeInput - Theme input that should react to changes.
 * @param imagePath - Path to the theme preview image.
 * @param gameTheme - Theme value stored for the game.
 */
function connectTheme(
    themeInput: HTMLElement | null,
    imagePath: string,
    gameTheme: GameTheme
): void {
    if (themeInput === null) {
        return;
    }
    /** Applies the selected theme after the input changes. */
    themeInput.addEventListener("change", function (): void {
        selectedThemeImage = imagePath;
        updateThemePreview(imagePath);
        selectGameTheme(gameTheme);
    });
}

/**
 * Connects a theme input with its matching card back.
 * @param themeInput - Theme input that should react to changes.
 * @param cardBack - Path to the matching card-back image.
 */
function connectCardBack(
    themeInput: HTMLElement | null,
    cardBack: string
): void {
    if (themeInput === null) {
        return;
    }

    /** Stores the card back after the theme input changes. */
    themeInput.addEventListener("change", function (): void {
        selectedCardBack = cardBack;
    });
}

/**
 * Connects a theme input with its collection of card fronts.
 * @param themeInput - Theme input that should react to changes.
 * @param cardFronts - Card-front paths belonging to the theme.
 */
function connectCardFronts(
    themeInput: HTMLElement | null,
    cardFronts: string[]
): void {
    if (themeInput === null) {
        return;
    }

    /** Stores the card fronts after the theme input changes. */
    themeInput.addEventListener("change", function (): void {
        selectedCardFronts = cardFronts;
    });
}

/** Restores the preview of the currently selected theme. */
function restoreSelectedPreview(): void {
    updateThemePreview(selectedThemeImage);
}

/**
 * Shows a temporary preview while a theme option is hovered.
 * @param themeInput - Theme input whose option should react to hovering.
 * @param imagePath - Path to the temporary preview image.
 */
function connectThemeHover(themeInput: HTMLElement | null, imagePath: string): void {
    if (themeInput === null || themeInput.parentElement === null) {
        return;
    }

    const themeOption = themeInput.parentElement;

    /** Shows the hovered theme image. */
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

/**
 * Updates one text value in the settings summary.
 * @param output - Element that displays the selected value.
 * @param text - Text that should be displayed.
 */
function updateSelection(
    output: HTMLElement | null,
    text: string
): void {
    if (output === null) {
        return;
    }

    output.textContent = text;
}

/** Enables the Start button after all selection groups are complete. */
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

/**
 * Marks one settings group as selected.
 * @param group - Selection group that has been completed.
 */
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

/**
 * Applies and stores one changed settings selection.
 * @param input - Radio button that was selected.
 * @param output - Element that displays the chosen value.
 * @param text - Text shown for this choice.
 * @param group - Selection group completed by this choice.
 */
function applySelection(
    input: HTMLElement,
    output: HTMLElement | null,
    text: string,
    group: SelectionGroup
): void {
    updateSelection(output, text);
    selectGroup(group);
    saveSelection(input, group);
}

/**
 * Connects an input with its settings summary value.
 * @param input - Settings input that should react to changes.
 * @param output - Element that displays the chosen value.
 * @param text - Text shown for this choice.
 * @param group - Selection group completed by this choice.
 */
function connectSelection(
    input: HTMLElement | null,
    output: HTMLElement | null,
    text: string,
    group: SelectionGroup
): void {
    if (input === null) {
        return;
    }
    /** Updates the settings summary after the input changes. */
    input.addEventListener("change", function (): void {
        applySelection(input, output, text, group);
    });
}

/**
 * Connects a board-size input with its numeric card count.
 * @param input - Board-size input that should react to changes.
 * @param size - Number of cards represented by the input.
 */
function connectBoardSize(
    input: HTMLElement | null,
    size: number
): void {
    if (input === null) {
        return;
    }

    /** Stores the selected board size. */
    input.addEventListener("change", function (): void {
        chosenBoardSize = size;
    });
}

/**
 * Connects a player input with its player color.
 * @param input - Player input that should react to changes.
 * @param player - Player represented by the input.
 */
function connectStartingPlayer(
    input: HTMLElement | null,
    player: Player
): void {
    if (input === null) {
        return;
    }

    /** Stores the selected starting player. */
    input.addEventListener("change", function (): void {
        chosenPlayer = player;
    });
}

connectTheme(codingTheme, codingThemeImage, "coding");
connectTheme(gamingTheme, gamingThemeImage, "gaming");
connectTheme(fantasyTheme, fantasyThemeImage, "fantasy");

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
connectExitDialog();

connectSelection(boardSize16, selectedBoardSize, "Board-16 Cards", "board-size");
connectSelection(boardSize24, selectedBoardSize, "Board-24 Cards", "board-size");
connectSelection(boardSize36, selectedBoardSize, "Board-36 Cards", "board-size");

connectBoardSize(boardSize16, 16);
connectBoardSize(boardSize24, 24);
connectBoardSize(boardSize36, 36);

restoreSettings();
