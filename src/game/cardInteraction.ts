import { changeCurrentPlayer, rewardCurrentPlayer } from "./playerState";
import { recordFoundPair } from "./gameProgress";

let firstCard: HTMLButtonElement | null = null;
let secondCard: HTMLButtonElement | null = null;
let hidePairTimeout: number | null = null;
let cardInputLocked = false;

function showCardFront(card: HTMLButtonElement): void {
    card.classList.add("game__card--flipped");
}

function hideCardFront(card: HTMLButtonElement): void {
    card.classList.remove("game__card--flipped");
}

function getCardFront(card: HTMLButtonElement): string {
    const cardFront = card.getAttribute("data-card-front");

    if (cardFront === null) {
        return "";
    }

    return cardFront;
}

function cardsMatch(): boolean {
    if (firstCard === null || secondCard === null) {
        return false;
    }

    const firstCardFront = getCardFront(firstCard);
    const secondCardFront = getCardFront(secondCard);

    return firstCardFront === secondCardFront;
}

function resetSelectedCards(): void {
    firstCard = null;
    secondCard = null;
    hidePairTimeout = null;
}

function clearHidePairTimeout(): void {
    if (hidePairTimeout === null) {
        return;
    }

    window.clearTimeout(hidePairTimeout);
    hidePairTimeout = null;
}

export function resetCardInteraction(): void {
    clearHidePairTimeout();
    resetSelectedCards();
    cardInputLocked = false;
}

function recordPairProgress(): void {
    if (recordFoundPair()) {
        cardInputLocked = true;
    }
}

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

function checkSelectedPair(): void {
    if (cardsMatch()) {
        keepMatchingPair();
        return;
    }

    hidePairTimeout = window.setTimeout(hideWrongPair, 1000);
}

function selectFirstCard(card: HTMLButtonElement): void {
    firstCard = card;
    showCardFront(card);
}

function selectSecondCard(card: HTMLButtonElement): void {
    secondCard = card;
    showCardFront(card);
    checkSelectedPair();
}

function canSelectFirstCard(): boolean {
    return !cardInputLocked && firstCard === null;
}

function cannotSelectSecondCard(card: HTMLButtonElement): boolean {
    return cardInputLocked || secondCard !== null || card === firstCard;
}

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

export function connectCardClick(
    card: HTMLButtonElement
): void {
    card.addEventListener("click", function (): void {
        handleCardClick(card);
    });
}
