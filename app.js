// Get a reference to the score display element
const scoreDisplay = document.getElementById('score-display');

// Set the initial score
let score = 0;

// Define the game loop
function gameLoop() {

  // Check if the game is in the playing state
  if (gameState === 'playing') {

    // Increment the current frame
    currentFrame++;

    // Update the character's horizontal and vertical positions
    characterX += characterVX;
    characterY += characterVY;

    // Apply gravity to the character's vertical velocity
    characterVY += 1;

    // Check if the character is on the ground
    if (characterY >= 0) {
      characterY = 0;
      characterVY = 0;
    }

    // Update the character's position on the screen
    character.style.left = characterX + 'px';
    character.style.bottom = characterY + 'px';

    // Check if it's time to spawn a new obstacle
    if (currentFrame % obstacleSpawnRate === 0) {
      spawnObstacle();
    }

    // Move each obstacle to the left
    const obstacles = obstacleContainer.querySelectorAll('.obstacle');
    obstacles.forEach(function(obstacle) {
      obstacleX = parseInt(obstacle.style.left);
      obstacleX -= obstacleSpeed;
      obstacle.style.left = obstacleX + 'px';
    });

    // Remove obstacles that have gone off the screen
    obstacles.forEach(function(obstacle) {
      if (obstacleX < -obstacle.offsetWidth) {
        obstacle.remove();

        // Increment the score for each obstacle cleared
        score++;
        scoreDisplay.innerHTML = 'Score: ' + score;
      }
    });

    // Check for collisions between the character and obstacles
    obstacles.forEach(function(obstacle) {
      const obstacleRect = obstacle.getBoundingClientRect();
      const characterRect = character.getBoundingClientRect();

      if (obstacleRect.bottom > characterRect.top &&
          obstacleRect.top < characterRect.bottom &&
          obstacleRect.right > characterRect.left &&
          obstacleRect.left < characterRect.right) {
        gameState = 'game over';

        // Show the game over screen
        const gameOverScreen = document.getElementById('game-over-screen');
        gameOverScreen.style.display = 'block';
      }
    });

    // Scroll the screen to match the character's position
    const scrollX = characterX - 200;
    const scrollY = -characterY + 200;
    gameContainer.style.transform = 'translate(' + scrollX + 'px, ' + scrollY + 'px)';
  }

  // Call the game loop again on the next frame
  requestAnimationFrame(gameLoop);
}

// Start the game loop
gameLoop();
