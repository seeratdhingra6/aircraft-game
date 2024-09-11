import {
  toggleContinueDisabled,
  toggleIsGameOver,
  toggleIsPaused,
  updateBirds,
  updateClouds,
  updateFuel,
  updateParachutes,
  updateStars,
  updateStarsCount,
  updateTimer,
} from "./actions";
import {
  canvasHeight,
  canvasWidth,
  birdHeight,
  parachuteHeight,
  parachuteWidth,
  starHeight,
  starWidth,
  aircraftWidth,
  aircraftHeight,
  birdWidth,
} from "./constants";

// Generate functions
const generateClouds = () => {
  return Array.from({ length: 5 }, () => ({
    x: Math.random() * canvasWidth,
    y: Math.random() * (canvasHeight - 50),
    width: 100,
    height: 50,
  }));
};

const generateBirds = () => {
  return Array.from({ length: 3 }, () => ({
    x: Math.random() * canvasWidth,
    y: Math.random() * (canvasHeight - birdHeight),
  }));
};

const generateParachutes = () => {
  return Array.from({ length: 3 }, () => ({
    x: Math.random() * (canvasWidth - parachuteWidth),
    y: -parachuteHeight,
  }));
};

const generateStars = () => {
  return Array.from({ length: 5 }, () => ({
    x: Math.random() * (canvasWidth - starWidth),
    y: -starHeight,
  }));
};

// Draw functions

const drawClouds = (ctx, clouds, dispatch) => {
  if (!ctx) return;
  ctx.fillStyle = "lightgray";
  clouds.forEach((cloud) => {
    ctx.fillRect(cloud.x, cloud.y, cloud.width, cloud.height);
    cloud.x -= 2; // Cloud movement speed
    if (cloud.x < -cloud.width) {
      cloud.x = canvasWidth;
      cloud.y = Math.random() * (canvasHeight - 50); // Reset cloud position
    }
  });
  dispatch(updateClouds([...clouds]));
};

const drawBirds = (ctx, birds, dispatch) => {
  if (!ctx) return;
  ctx.fillStyle = "red";
  birds.forEach((bird) => {
    ctx.fillRect(bird.x, bird.y, birdWidth, birdHeight);
    bird.x -= 4; // Bird movement speed
    if (bird.x < -birdWidth) {
      bird.x = canvasWidth;
      bird.y = Math.random() * (canvasHeight - birdHeight); // Reset bird position
    }
  });
  dispatch(updateBirds([...birds]));
};

const drawParachutes = (ctx, parachutes, dispatch) => {
  if (!ctx) return;
  ctx.fillStyle = "yellow";
  parachutes.forEach((parachute) => {
    ctx.fillRect(parachute.x, parachute.y, parachuteWidth, parachuteHeight);
    parachute.y += 2; // Parachute falling speed
    if (parachute.y > canvasHeight) {
      parachute.y = -parachuteHeight;
      parachute.x = Math.random() * (canvasWidth - parachuteWidth); // Reset parachute position
    }
  });
  dispatch(updateParachutes([...parachutes]));
};

const drawStars = (ctx, stars, dispatch) => {
  if (!ctx) return;
  ctx.fillStyle = "gold";
  stars.forEach((star) => {
    ctx.fillRect(star.x, star.y, starWidth, starHeight);
    star.y += 3; // Star falling speed
    if (star.y > canvasHeight) {
      star.y = -starHeight;
      star.x = Math.random() * (canvasWidth - starWidth); // Reset star position
    }
  });
  dispatch(updateStars([...stars]));
};

const endGame = ({ dispatch, gameInterval }) => {
  dispatch(toggleIsGameOver(true));
  dispatch(toggleIsPaused(true));
  if (gameInterval) clearInterval(gameInterval);
};

const checkCollisions = ({
  birds,
  aircraft,
  parachutes,
  stars,
  dispatch,
  gameInterval,
  fuel,
  starsCount,
}) => {
  // Check collisions with birds
  birds.forEach((bird) => {
    if (
      aircraft.x < bird.x + birdWidth &&
      aircraft.x + aircraftWidth > bird.x &&
      aircraft.y < bird.y + birdHeight &&
      aircraft.y + aircraftHeight > bird.y
    ) {
      endGame({ dispatch, gameInterval });
    }
  });

  // Check collisions with parachutes
  parachutes.forEach((parachute) => {
    if (
      aircraft.x < parachute.x + parachuteWidth &&
      aircraft.x + aircraftWidth > parachute.x &&
      aircraft.y < parachute.y + parachuteHeight &&
      aircraft.y + aircraftHeight > parachute.y
    ) {
      dispatch(updateFuel(Math.min(fuel + 10, 100))); // Increase fuel and cap at 100
      parachute.y = -parachuteHeight; // Move parachute off screen
    }
  });

  // Check collisions with stars
  stars.forEach((star) => {
    if (
      aircraft.x < star.x + starWidth &&
      aircraft.x + aircraftWidth > star.x &&
      aircraft.y < star.y + starHeight &&
      aircraft.y + aircraftHeight > star.y
    ) {
      dispatch(updateStarsCount(starsCount + 1));
      star.y = -starHeight; // Move star off screen
    }
  });
};

const startGame = (dispatch) => {
  dispatch(updateTimer(0));
  dispatch(updateFuel(10));
  dispatch(updateStarsCount(0));
  dispatch(toggleIsGameOver(false));
  dispatch(toggleIsPaused(false));
  dispatch(toggleContinueDisabled(true));
  dispatch(updateClouds(generateClouds()));
  dispatch(updateBirds(generateBirds()));
  dispatch(updateParachutes(generateParachutes()));
  dispatch(updateStars(generateStars()));
};

const updateGame = ({
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
}) => {
  dispatch(updateTimer(timer + 1));
  const newFuel = fuel - 1 / 60;
  if (newFuel <= 0) {
    endGame({ dispatch, gameInterval });
  }
  dispatch(updateFuel(newFuel));

  const canvas = canvasRef.current;
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  ctx.clearRect(0, 0, canvasWidth, canvasHeight);

  drawClouds(ctx, clouds, dispatch);
  drawBirds(ctx, birds, dispatch);
  drawParachutes(ctx, parachutes, dispatch);
  drawStars(ctx, stars, dispatch);

  ctx.fillStyle = "blue";
  ctx.fillRect(aircraft.x, aircraft.y, aircraftWidth, aircraftHeight);

  checkCollisions({
    birds,
    aircraft,
    parachutes,
    stars,
    dispatch,
    gameInterval,
    fuel,
    starsCount,
  });
};

const getAircraftCoordinates = ({ aircraft, event }) => {
  let newX = aircraft.x;
  let newY = aircraft.y;
  switch (event.key) {
    case "ArrowUp":
      newY = Math.max(0, aircraft.y - 5);
      break;
    case "ArrowDown":
      newY = Math.min(canvasHeight - aircraftHeight, aircraft.y + 5);
      break;
    case "ArrowLeft":
      newX = Math.max(0, aircraft.x - 5);
      break;
    case "ArrowRight":
      newX = Math.min(canvasWidth - aircraftWidth, aircraft.x + 5);
      break;
    default:
      return aircraft;
  }
  return { x: newX, y: newY };
};

export {
  generateBirds,
  generateClouds,
  generateParachutes,
  generateStars,
  drawBirds,
  drawParachutes,
  drawStars,
  drawClouds,
  checkCollisions,
  startGame,
  updateGame,
  getAircraftCoordinates,
};
