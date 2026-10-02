import { changeCurrentPlayer, rewardCurrentPlayer } from "./playerState";
import { recordFoundPair } from "./gameProgress";

let firstCard: HTMLButtonElement | null = null;
let secondCard: HTMLButtonElement | null = null;
let hidePairTimeout: number | null = null;

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
}

function keepMatchingPair(): void {
    if (firstCard !== null) {
        firstCard.disabled = true;
    }

    if (secondCard !== null) {
        secondCard.disabled = true;
    }

    rewardCurrentPlayer();
    recordFoundPair();
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

function handleCardClick(card: HTMLButtonElement): void {
    if (firstCard === null) {
        selectFirstCard(card);
        return;
    }

    if (secondCard !== null || card === firstCard) {
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
