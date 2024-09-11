// src/reducers/index.js
import { combineReducers } from "redux";
import {
  UPDATE_TIMER,
  UPDATE_FUEL,
  UPDATE_STARS_COUNT,
  UPDATE_AIRCRAFT,
  UPDATE_CLOUDS,
  UPDATE_BIRDS,
  UPDATE_PARACHUTES,
  UPDATE_STARS,
  TOGGLE_IS_PAUSE,
  TOGGLE_IS_GAME_OVER,
  UPDATE_USER_NAME,
  TOGGLE_CONTINUE_DISABLED,
  UPDATE_GAME_INTERVAL,
  UPDATE_RANKINGS,
  TOGGLE_SHOW_RANKINGS,
} from "./actions";
import { canvasHeight } from "./constants";
import {
  generateBirds,
  generateClouds,
  generateParachutes,
  generateStars,
} from "./helpers";
import sampleData from "./sampleData";

const clouds = generateClouds();
const birds = generateBirds();
const parachutes = generateParachutes();
const stars = generateStars();

// Initial state
const initialGameState = {
  timer: 0,
  fuel: 10,
  starsCount: 0,
  aircraft: { x: 100, y: canvasHeight / 2 },
  clouds,
  birds,
  parachutes,
  stars,
  isPaused: false,
  isGameOver: false,
  userName: "",
  continueDisabled: true,
  gameInterval: null,
  rankings: sampleData, // adding sample data as api link is not working
  showRankings: false,
};

// Reducers
const gameReducer = (state = initialGameState, action) => {
  switch (action.type) {
    case UPDATE_TIMER:
      return { ...state, timer: action.payload };
    case UPDATE_FUEL:
      return { ...state, fuel: action.payload };
    case UPDATE_STARS_COUNT:
      return { ...state, starsCount: action.payload };
    case UPDATE_AIRCRAFT:
      return { ...state, aircraft: action.payload };
    case UPDATE_CLOUDS:
      return { ...state, clouds: action.payload };
    case UPDATE_BIRDS:
      return { ...state, birds: action.payload };
    case UPDATE_PARACHUTES:
      return { ...state, parachutes: action.payload };
    case UPDATE_STARS:
      return { ...state, stars: action.payload };
    case TOGGLE_IS_PAUSE:
      return { ...state, isPaused: !state.isPaused };
    case TOGGLE_IS_GAME_OVER:
      return { ...state, isGameOver: !state.isGameOver };
    case UPDATE_USER_NAME:
      return { ...state, userName: action.payload };
    case TOGGLE_CONTINUE_DISABLED:
      return { ...state, continueDisabled: !state.continueDisabled };
    case UPDATE_GAME_INTERVAL:
      return { ...state, gameInterval: action.payload };
    case UPDATE_RANKINGS:
      return { ...state, rankings: action.payload };
    case TOGGLE_SHOW_RANKINGS:
      return { ...state, showRankings: !state.showRankings };
    default:
      return state;
  }
};

// Combine reducers if you have more reducers in your application
const rootReducer = combineReducers({
  game: gameReducer,
});

export default rootReducer;
