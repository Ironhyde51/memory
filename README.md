# Memory Game

A responsive two-player memory game built with TypeScript, SCSS, HTML, and Vite.

The game offers three visual themes, multiple board sizes, animated cards, a live score display, and individual result screens for a winner, a loss, or a draw.

## Preview

<p align="center">
  <img src="./assets/img/Theme%20CodingStyle.png" alt="Coding theme preview" width="30%">
  <img src="./assets/img/Theme%20GamingStyle.png" alt="Gaming theme preview" width="30%">
  <img src="./assets/img/Theme%20FantasyStyle.png" alt="Fantasy theme preview" width="30%">
</p>

## Features

- Two-player local memory game with blue and orange players
- Selectable starting player
- Three board sizes:
  - 4 × 4 cards
  - 4 × 6 cards
  - 6 × 6 cards
- Three complete visual themes:
  - Coding theme
  - Gaming theme
  - Fantasy theme
- Theme-specific card designs, backgrounds, icons, fonts, and result screens
- Animated card flipping
- Animated floating cards in the Fantasy theme
- Live score and current-player display
- Exit confirmation dialog
- Separate winner, draw, and game-over screens
- Responsive layout from small mobile screens to widescreen displays
- Layout and card sizes adapt to both viewport width and height

## Custom Fantasy Theme

The Fantasy theme is an original extra theme inspired by classic Japanese fantasy role-playing games. It does not use protected characters or logos.

It includes:

- 18 unique card illustrations
- A custom card back
- Fantasy score orbs and player markers
- Custom dialog and game-over frames
- Individual winner crowns and a draw emblem
- A decorative fantasy background and interface elements

## Technologies

- HTML5
- TypeScript
- SCSS with a 7-1 inspired folder structure
- CSS Grid and Flexbox
- Vite

## Getting Started

### Requirements

- Node.js
- npm

### Installation

```bash
npm install
```

### Development

Start the Vite development server:

```bash
npm run dev
```

Vite compiles the imported SCSS automatically during development.

### Production Build

Create the production build, including the compiled CSS:

```bash
npm run build
```

Preview the finished build locally:

```bash
npm run preview
```

## Project Structure

```text
memory/
├── assets/
│   ├── fonts/
│   ├── icons/
│   └── img/
├── scss/
│   ├── abstract/
│   ├── base/
│   ├── components/
│   ├── layout/
│   ├── pages/
│   ├── themes/
│   ├── vendor/
│   └── main.scss
├── src/
│   ├── data/
│   ├── game/
│   └── main.ts
├── index.html
├── package.json
└── tsconfig.json
```

## Responsive Design

The interface was tested across mobile, tablet, desktop, and widescreen sizes. The layouts change according to the available width and height so that the controls and complete game board remain visible without unwanted page overflow.

The project includes a dedicated widescreen layout from 1440 px. The main content remains centered while theme backgrounds use the full screen width.

## Fonts and Assets

The project uses locally stored Roboto, Roboto Slab, Orbitron, and Cinzel fonts. Their license files are included in `assets/fonts/`.

All Fantasy theme images are optimized to remain below 1 MB per file.

## About the Project

This project was created as a study assignment to practise:

- DOM manipulation with TypeScript
- Working with events and application state
- Reusable functions and clean code
- Responsive layouts with SCSS
- Organizing styles with a structured SCSS architecture
- Building theme-specific interfaces without a framework
