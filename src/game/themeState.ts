export type GameTheme = "coding" | "gaming" | "fantasy";

let selectedGameTheme: GameTheme = "coding";

function removePreviousTheme(): void {
    document.body.classList.remove("theme--coding");
    document.body.classList.remove("theme--gaming");
    document.body.classList.remove("theme--fantasy");
}

export function selectGameTheme(theme: GameTheme): void {
    selectedGameTheme = theme;
}

export function applyGameTheme(): void {
    removePreviousTheme();
    document.body.classList.add(
        "theme--" + selectedGameTheme
    );
}

export function getSelectedGameTheme(): GameTheme {
    return selectedGameTheme;
}
