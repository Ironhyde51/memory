import { changeCurrentPlayer, rewardCurrentPlayer } from "./playerState";
import { recordFoundPair } from "./gameProgress";

let firstCard: HTMLButtonElement | null = null;
let secondCard: HTMLButtonElement | null = null;
let hidePairTimeout: number | null = null;
let cardInputLocked = false;

/**
 * Turns one card so its front is visible.
 * @param card - Card that should show its front.
 */
function showCardFront(card: HTMLButtonElement): void {
    card.classList.add("game__card--flipped");
}

/**
 * Turns one card back to its hidden side.
 * @param card - Card that should show its back.
 */
function hideCardFront(card: HTMLButtonElement): void {
    card.classList.remove("game__card--flipped");
}

/**
 * Returns the image path stored on a memory card.
 * @param card - Card whose image path is required.
 * @returns The stored path to the card-front image.
 */
function getCardFront(card: HTMLButtonElement): string {
    const cardFront = card.getAttribute("data-card-front");

    if (cardFront === null) {
        return "";
    }

    return cardFront;
}

/**
 * Reports whether the two selected cards form a pair.
 * @returns `true` when both selected cards have the same front.
 */
function cardsMatch(): boolean {
    if (firstCard === null || secondCard === null) {
        return false;
    }

    const firstCardFront = getCardFront(firstCard);
    const secondCardFront = getCardFront(secondCard);

    return firstCardFront === secondCardFront;
}

/** Clears both currently selected card references. */
function resetSelectedCards(): void {
    firstCard = null;
    secondCard = null;
    hidePairTimeout = null;
}

/** Cancels a pending timeout for hiding a wrong pair. */
function clearHidePairTimeout(): void {
    if (hidePairTimeout === null) {
        return;
    }

    window.clearTimeout(hidePairTimeout);
    hidePairTimeout = null;
}

/** Resets all card interaction state for a new game. */
export function resetCardInteraction(): void {
    clearHidePairTimeout();
    resetSelectedCards();
    cardInputLocked = false;
}

/** Records a pair and locks input after the final pair. */
function recordPairProgress(): void {
    if (recordFoundPair()) {
        cardInputLocked = true;
    }
}

/** Keeps a matching pair visible and rewards the current player. */
function keepMatchingPair(): void {
    if (firstCard !== null) {
        firstCard.disabled = true;
    }

    if (secondCard !== null) {
        secondCard.disabled = true;
    }

    rewardCurrentPlayer();
    recordPairProgress();
    resetSelectedCards();
}

/** Hides a wrong pair and passes the turn to the other player. */
function hideWrongPair(): void {
    if (firstCard !== null) {
        hideCardFront(firstCard);
    }

    if (secondCard !== null) {
        hideCardFront(secondCard);
    }

    changeCurrentPlayer();
    resetSelectedCards();
}

/** Handles the selected pair according to whether it matches. */
function checkSelectedPair(): void {
    if (cardsMatch()) {
        keepMatchingPair();
        return;
    }

    hidePairTimeout = window.setTimeout(hideWrongPair, 1000);
}

/**
 * Stores and reveals the first selected card.
 * @param card - First card selected during the turn.
 */
function selectFirstCard(card: HTMLButtonElement): void {
    firstCard = card;
    showCardFront(card);
}

/**
 * Stores and reveals the second selected card.
 * @param card - Second card selected during the turn.
 */
function selectSecondCard(card: HTMLButtonElement): void {
    secondCard = card;
    showCardFront(card);
    checkSelectedPair();
}

/**
 * Reports whether a first card may currently be selected.
 * @returns `true` when input is unlocked and no first card is stored.
 */
function canSelectFirstCard(): boolean {
    return !cardInputLocked && firstCard === null;
}

/**
 * Reports whether the supplied card cannot be selected second.
 * @param card - Card considered for the second selection.
 * @returns `true` when selecting the card is currently invalid.
 */
function cannotSelectSecondCard(card: HTMLButtonElement): boolean {
    return cardInputLocked || secondCard !== null || card === firstCard;
}

/**
 * Processes a click on one memory card.
 * @param card - Card selected by the player.
 */
function handleCardClick(card: HTMLButtonElement): void {
    if (canSelectFirstCard()) {
        selectFirstCard(card);
        return;
    }

    if (cannotSelectSecondCard(card)) {
        return;
    }

    selectSecondCard(card);
}

/**
 * Connects a memory card with its click handler.
 * @param card - Card that should react to clicks.
 */
export function connectCardClick(
    card: HTMLButtonElement
): void {
    /** Passes the clicked card to the shared interaction logic. */
    card.addEventListener("click", function (): void {
        handleCardClick(card);
    });
}
