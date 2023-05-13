// Define game variables
let score = 0;
let highScore = 0;
let obstacleInterval;
let obstacleSpeed = 5;
let isJumping = false;
let characterTop = 0;
let characterLeft = 50;
let gameContainer = document.getElementById("game-container");
let scoreDisplay = document.getElementById("score-display");
let highScoreDisplay = document.getElementById("high-score-display");
let character = document.getElementById("character");
let ground = document.getElementById("ground");
let obstacleContainer = document.getElementById("obstacle-container");



// Start the game
function startGame() {
  // Move the character up
  function addKeyEventListeners() {
    document.addEventListener("keydown", function(event) {
        if (event.code === "Space") {
          jump();
        }
      });
      
      }
      function jump() {
        if (character.classList.contains("animate")) {
          return;
        }
        
        character.classList.add("animate");
        
        let startPosition = character.offsetTop;
        let jumpHeight = 100;
        let duration = 500;
        let startTime = null;
        
        function animateJump(currentTime) {
          if (startTime === null) {
            startTime = currentTime;
          }
          let elapsedTime = currentTime - startTime;
          let fraction = Math.min(elapsedTime / duration, 1);
          let jumpPosition = startPosition + (jumpHeight * fraction) - (10 * fraction * fraction);
          character.style.top = jumpPosition + "px";
          
          if (fraction < 1) {
            requestAnimationFrame(animateJump);
          } else {
            character.classList.remove("animate");
          }
        }
        
        requestAnimationFrame(animateJump);
      }
      
  

  // Start obstacle generation
  obstacleInterval = setInterval(function() {
    let obstacle = document.createElement("div");
    obstacle.classList.add("obstacle");
    obstacle.style.left = gameContainer.offsetWidth + "px";
    obstacle.style.bottom = ground.offsetHeight + "px";
    obstacleContainer.appendChild(obstacle);

    // Move obstacle from right to left
    let obstacleMoveInterval = setInterval(function() {
      if (obstacle.offsetLeft < -obstacle.offsetWidth) {
        clearInterval(obstacleMoveInterval);
        obstacle.remove();
      } else if (
        obstacle.offsetLeft < character.offsetLeft + character.offsetWidth &&
        obstacle.offsetLeft + obstacle.offsetWidth > character.offsetLeft &&
        obstacle.offsetTop + obstacle.offsetHeight > character.offsetTop
      ) {
        clearInterval(obstacleMoveInterval);
        clearInterval(obstacleInterval);
        alert("Game over!");
        if (score > highScore) {
          highScore = score;
          localStorage.setItem("highScore", highScore);
          highScoreDisplay.innerHTML = "High Score: " + highScore;
        }
      } else {
        obstacle.style.left = obstacle.offsetLeft - obstacleSpeed + "px";
      }
    }, 10);
  // Adjust obstacle interval based on screen speed and score
    let obstacleGenerationInterval = 2000 - score * 100 - gameContainer.scrollLeft / 10;
    if (obstacleGenerationInterval < 500) {
      obstacleGenerationInterval = 500;
    }
    clearInterval(obstacleInterval);
    obstacleInterval = setInterval(arguments.callee, obstacleGenerationInterval);
  }, 2000);


  // Increase score every second and adjust speeds
  setInterval(function() {
    score++;
    scoreDisplay.innerHTML = "Score: " + score;
    obstacleSpeed = 5 + Math.floor(score / 10);
    characterSpeed = 5 + Math.floor(score / 10);
    gameContainer.scrollLeft += characterSpeed;
  }, 1000);
  
}


    startGame();
  
  