export type GameTheme = "coding" | "gaming" | "fantasy";

let selectedGameTheme: GameTheme = "coding";

/** Removes every game theme class from the document body. */
function removePreviousTheme(): void {
    document.body.classList.remove("theme--coding");
    document.body.classList.remove("theme--gaming");
    document.body.classList.remove("theme--fantasy");
}

/**
 * Stores the theme selected on the settings page.
 * @param theme - Theme selected for the next game.
 */
export function selectGameTheme(theme: GameTheme): void {
    selectedGameTheme = theme;
}

/** Applies the stored game theme class to the document body. */
export function applyGameTheme(): void {
    removePreviousTheme();
    document.body.classList.add(
        "theme--" + selectedGameTheme
    );
}

/**
 * Returns the theme currently selected for the game.
 * @returns The currently selected game theme.
 */
export function getSelectedGameTheme(): GameTheme {
    return selectedGameTheme;
}
