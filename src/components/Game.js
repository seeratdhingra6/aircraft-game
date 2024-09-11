import React, { useEffect, useRef, useCallback } from "react";
import GameOverScreen from "./GameOverScreen";
import "./Game.css";
import { useDispatch, useSelector } from "react-redux";
import {
  selectAircraft,
  selectBirds,
  selectClouds,
  selectContinueDisabled,
  selectFuel,
  selectGameInterval,
  selectIsGameOver,
  selectIsPaused,
  selectParachutes,
  selectRankings,
  selectShowRankings,
  selectStars,
  selectStarsCount,
  selectTimer,
  selectUserName,
} from "../selectors";
import {
  toggleContinueDisabled,
  toggleIsPaused,
  toggleShowRankings,
  updateAircraft,
  updateGameInterval,
  updateUserName,
} from "../actions";
import { getAircraftCoordinates, startGame, updateGame } from "../helpers";
import { canvasHeight, canvasWidth } from "../constants";
import Ranking from "./Ranking";

const Game = () => {
  const canvasRef = useRef(null);

  const timer = useSelector(selectTimer);
  const fuel = useSelector(selectFuel);
  const aircraft = useSelector(selectAircraft);
  const isGameOver = useSelector(selectIsGameOver);
  const isPaused = useSelector(selectIsPaused);
  const gameInterval = useSelector(selectGameInterval);
  const userName = useSelector(selectUserName);
  const starsCount = useSelector(selectStarsCount);
  const continueDisabled = useSelector(selectContinueDisabled);
  const parachutes = useSelector(selectParachutes);
  const birds = useSelector(selectBirds);
  const stars = useSelector(selectStars);
  const clouds = useSelector(selectClouds);
  const rankings = useSelector(selectRankings);
  const showRankings = useSelector(selectShowRankings);

  const dispatch = useDispatch();

  useEffect(() => {
    if (isGameOver) return;

    const interval = setInterval(() => {
      if (!isPaused) {
        updateGame({
          dispatch,
          timer,
          canvasRef,
          aircraft,
          gameInterval,
          birds,
          parachutes,
          stars,
          clouds,
          fuel,
          starsCount,
        });
      }
    }, 1000 / 60); // 60 FPS

    dispatch(updateGameInterval(interval));

    return () => {
      clearInterval(interval);
      dispatch(updateGameInterval(null)); // Clear game interval in Redux state
    };
  }, [
    isPaused,
    isGameOver,
    aircraft,
    dispatch,
    timer,
    birds,
    parachutes,
    stars,
    clouds,
    fuel,
    starsCount,
  ]);

  const handleKeyPress = useCallback(
    (event) => {
      if (isPaused || isGameOver) return;

      dispatch(updateAircraft(getAircraftCoordinates({ aircraft, event })));
    },
    [isPaused, isGameOver, dispatch, aircraft]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [handleKeyPress]);

  const pauseGame = () => {
    dispatch(toggleIsPaused(!isPaused)); // Toggle pause state
  };

  const handleUserNameChange = (e) => {
    const newUserName = e.target.value;
    dispatch(updateUserName(newUserName));
    dispatch(toggleContinueDisabled(newUserName.trim() === ""));
  };

  const submitScore = () => {
    dispatch(toggleShowRankings());
    fetch("http://xxxxxxxxx/register.php", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `name=${encodeURIComponent(userName)}&time=${Math.floor(
        timer / 60
      )}&stars=${starsCount}`,
    })
      .then((response) => response.text())
      .then(() => {})
      .catch((error) => console.error("Error submitting score:", error));
  };

  return (
    <div className="game-container">
      <div className="button-group">
        <button onClick={() => startGame(dispatch)} disabled={isGameOver}>
          Start Game
        </button>
        <button onClick={pauseGame} disabled={isGameOver}>
          {isPaused ? "Resume" : "Pause"}
        </button>
      </div>
      <div id="timer" className="stats">
        Time: <span className="red">{Math.floor(timer / 60)}</span>
      </div>
      <div id="fuel" className="stats">
        Fuel: <span className="green">{Math.max(Math.floor(fuel), 0)}</span>
      </div>
      <div id="starsCounter" className="stats">
        Stars: <span className="green">{starsCount}</span>
      </div>
      <canvas
        ref={canvasRef}
        width={canvasWidth}
        height={canvasHeight}
      ></canvas>
      {isGameOver && (
        <GameOverScreen
          userName={userName}
          continueDisabled={continueDisabled}
          onUserNameChange={handleUserNameChange}
          onContinueClick={submitScore}
        />
      )}
      {showRankings && <Ranking rankings={rankings} />}
    </div>
  );
};

export default Game;
