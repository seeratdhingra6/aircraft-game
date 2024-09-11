// src/selectors/index.js

// Selector to get the entire game state
export const selectGameState = (state) => state.game;

// Selector to get the timer value
export const selectTimer = (state) => state.game.timer;

// Selector to get the fuel value
export const selectFuel = (state) => state.game.fuel;

// Selector to get the stars count
export const selectStarsCount = (state) => state.game.starsCount;

// Selector to get the aircraft state
export const selectAircraft = (state) => state.game.aircraft;

// Selector to get the clouds array
export const selectClouds = (state) => state.game.clouds;

// Selector to get the birds array
export const selectBirds = (state) => state.game.birds;

// Selector to get the parachutes array
export const selectParachutes = (state) => state.game.parachutes;

// Selector to get the stars array
export const selectStars = (state) => state.game.stars;

// Selector to check if the game is paused
export const selectIsPaused = (state) => state.game.isPaused;

// Selector to check if the game is over
export const selectIsGameOver = (state) => state.game.isGameOver;

// Selector to get the user name
export const selectUserName = (state) => state.game.userName;

// Selector to check if continue button is disabled
export const selectContinueDisabled = (state) => state.game.continueDisabled;

// Selector to get the game interval
export const selectGameInterval = (state) => state.game.gameInterval;

export const selectRankings = (state) => state.game.rankings;
export const selectShowRankings = (state) => state.game.showRankings;
