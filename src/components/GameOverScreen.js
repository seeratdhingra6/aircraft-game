import React from "react";
import "./GameOverScreen.css";

const GameOverScreen = ({
  userName,
  continueDisabled,
  onUserNameChange,
  onContinueClick,
}) => {
  return (
    <div className="game-over-screen">
      <h2>Game Over!</h2>
      <form>
        <div className="field">
          <label htmlFor="userName">Name:</label>
          <input
            type="text"
            id="userName"
            value={userName}
            onChange={onUserNameChange}
            required
            placeholder="Enter your name"
          />
        </div>
        <button
          type="button"
          onClick={onContinueClick}
          disabled={continueDisabled}
        >
          Continue
        </button>
      </form>
    </div>
  );
};

export default GameOverScreen;
