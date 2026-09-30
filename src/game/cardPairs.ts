function getPairCount(boardSize: number): number {
    return boardSize / 2;
}

function chooseCardFronts(
    cardFronts: string[],
    pairCount: number
): string[] {
    return cardFronts.slice(0, pairCount);
}

function duplicateCardFronts(
    cardFronts: string[]
): string[] {
    let cardPairs: string[] = [];

    for (const cardFront of cardFronts) {
        cardPairs.push(cardFront);
        cardPairs.push(cardFront);
    }

    return cardPairs;
}

function swapCards(cards: string[], currentIndex: number): void {
    const randomIndex = Math.floor(Math.random() * (currentIndex + 1));
    const currentCard = cards[currentIndex];
    const randomCard = cards[randomIndex];

    if (currentCard === undefined || randomCard === undefined) {
        return;
    }

    cards[currentIndex] = randomCard;
    cards[randomIndex] = currentCard;
}

function shuffleCardPairs(cardPairs: string[]): string[] {
    let shuffledCards = [...cardPairs];//kopie von kartenarray

    for (let index = shuffledCards.length - 1; index > 0; index -= 1) {
        swapCards(shuffledCards, index);
    }

    return shuffledCards;
}

export function createCardPairs(
    cardFronts: string[],
    boardSize: number
): string[] {
    const pairCount = getPairCount(boardSize);
    const chosenCardFronts =
        chooseCardFronts(cardFronts, pairCount);
    const cardPairs = duplicateCardFronts(chosenCardFronts);

    return shuffleCardPairs(cardPairs);
}
