// src/actions/index.js

export const UPDATE_TIMER = "UPDATE_TIMER";
export const UPDATE_FUEL = "UPDATE_FUEL";
export const UPDATE_STARS_COUNT = "UPDATE_STARS_COUNT";
export const UPDATE_AIRCRAFT = "UPDATE_AIRCRAFT";
export const UPDATE_CLOUDS = "UPDATE_CLOUDS";
export const UPDATE_BIRDS = "UPDATE_BIRDS";
export const UPDATE_PARACHUTES = "UPDATE_PARACHUTES";
export const UPDATE_STARS = "UPDATE_STARS";
export const TOGGLE_IS_PAUSE = "TOGGLE_IS_PAUSE";
export const TOGGLE_IS_GAME_OVER = "TOGGLE_IS_GAME_OVER";
export const UPDATE_USER_NAME = "UPDATE_USER_NAME";
export const TOGGLE_CONTINUE_DISABLED = "TOGGLE_CONTINUE_DISABLED";
export const UPDATE_GAME_INTERVAL = "UPDATE_GAME_INTERVAL";
export const UPDATE_RANKINGS = "UPDATE_RANKINGS";
export const TOGGLE_SHOW_RANKINGS = "TOGGLE_SHOW_RANKINGS";

// Action creators

export const updateTimer = (timer) => ({
  type: UPDATE_TIMER,
  payload: timer,
});

export const updateFuel = (fuel) => ({
  type: UPDATE_FUEL,
  payload: fuel,
});

export const updateStarsCount = (count) => ({
  type: UPDATE_STARS_COUNT,
  payload: count,
});

export const updateAircraft = (aircraft) => ({
  type: UPDATE_AIRCRAFT,
  payload: aircraft,
});

export const updateClouds = (clouds) => ({
  type: UPDATE_CLOUDS,
  payload: clouds,
});

export const updateBirds = (birds) => ({
  type: UPDATE_BIRDS,
  payload: birds,
});

export const updateParachutes = (parachutes) => ({
  type: UPDATE_PARACHUTES,
  payload: parachutes,
});

export const updateStars = (stars) => ({
  type: UPDATE_STARS,
  payload: stars,
});

export const toggleIsPaused = () => ({
  type: TOGGLE_IS_PAUSE,
});

export const toggleIsGameOver = () => ({
  type: TOGGLE_IS_GAME_OVER,
});

export const updateUserName = (userName) => ({
  type: UPDATE_USER_NAME,
  payload: userName,
});

export const toggleContinueDisabled = () => ({
  type: TOGGLE_CONTINUE_DISABLED,
});

export const updateGameInterval = (interval) => ({
  type: UPDATE_GAME_INTERVAL,
  payload: interval,
});

export const updateRankings = (rankings) => ({
  type: UPDATE_RANKINGS,
  payload: rankings,
});

export const toggleShowRankings = () => ({
  type: TOGGLE_SHOW_RANKINGS,
});
