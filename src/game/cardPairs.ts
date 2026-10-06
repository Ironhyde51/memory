/**
 * Calculates how many different pairs a board requires.
 * @param boardSize - Total number of cards on the board.
 * @returns The number of matching pairs required.
 */
function getPairCount(boardSize: number): number {
    return boardSize / 2;
}

/**
 * Selects the required number of different card fronts.
 * @param cardFronts - Available card-front image paths.
 * @param pairCount - Number of different fronts to select.
 * @returns The selected card fronts.
 */
function chooseCardFronts(
    cardFronts: string[],
    pairCount: number
): string[] {
    return cardFronts.slice(0, pairCount);
}

/**
 * Duplicates every selected front to create matching pairs.
 * @param cardFronts - Card fronts selected for the board.
 * @returns A list containing every card front twice.
 */
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

/**
 * Swaps one card with a randomly selected earlier card.
 * @param cards - Card paths being shuffled.
 * @param currentIndex - Index of the card currently being moved.
 */
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

/**
 * Returns a shuffled copy of all prepared card pairs.
 * @param cardPairs - Prepared pairs in their original order.
 * @returns A shuffled copy of the supplied card pairs.
 */
function shuffleCardPairs(cardPairs: string[]): string[] {
    let shuffledCards = [...cardPairs];//kopie von kartenarray

    for (let index = shuffledCards.length - 1; index > 0; index -= 1) {
        swapCards(shuffledCards, index);
    }

    return shuffledCards;
}

/**
 * Creates and shuffles the pairs needed for the selected board size.
 * @param cardFronts - Available card-front image paths.
 * @param boardSize - Total number of cards required.
 * @returns Shuffled image paths containing the required pairs.
 */
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
