playGame();

function playGame() {
  let el = document.getElementById("game-over").style.visibility = "hidden";
  // Set start point
  let carGrid = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [-1, 0, 0, 0]];
  let clear = [0, 0, 0, 0];
  let score = 0;
  
  // Create elements for HTML
  createElements(carGrid);
  
  // Implement function to detect input
  findKeypress(carGrid);
  
  // Run updateCars every 1 second
  var game = setInterval(updateCars, 1000);
  
  // Updates the grid to move nested array elements down till collision is detected
  function updateCars() {
    let temp = [];
    temp[0] = makeRandomRow(carGrid[0].length);
  
    carGrid.forEach(function(value, index) {
      if (carGrid.length - 1 != index){
        temp[index + 1] = value;
      } else {
        // Compare our last row to the row before to check collision
        let playerIndex = value.indexOf(-1)

        // If collision, end game
        if (temp[index][playerIndex] === 1) {
          // https://www.w3schools.com/jsref/prop_style_visibility.asp
          let el = document.getElementById("game-over").style.visibility = "visible";
          clearInterval(game);
        } else {
          // If no collision, add to the score clear the last row
          score++;
          document.getElementById('score').innerHTML = 'Score: ' + score;
          temp[index] = clear
          temp[index][playerIndex] = -1
        }
      }
    })
  
    carGrid = temp;
    createElements(carGrid)
  }
  
  // Creates a random row full of 1s and 0s
  function makeRandomRow(length) {
    let newRow = [];
    let count = 0;
    for (let i = 0; i < length; i++) {
      // https://stackoverflow.com/questions/36756331/js-generate-random-boolean
      let rand = Math.round(Math.random())
      // As long as we don't already have 3 new cars, keep seeing if we add more
      if (rand === 1 && count === 3) {
        newRow.push(0)
      } else {
        if (rand === 1) {
          count++
        }
        newRow.push(rand)
      }
    }
    return newRow
  }
  
  // Check for left and right arrow input
  //  From https://stackoverflow.com/questions/5597060/detecting-arrow-key-presses-in-javascript
// This code is used to detect when the left and right arrow keys have been pressed
  function findKeypress() {
    document.onkeydown = function (event) {
        switch (event.keyCode) {
           // Left
           case 37:
              carGrid[carGrid.length - 1] = moveCar(-1)
              createElements(carGrid)
              break;
           // Right
           case 39:
              carGrid[carGrid.length - 1] = moveCar(1)
              createElements(carGrid)
              break;
        }
     };
  }
  
  // Move our car (-1) to a specific direction
  function moveCar(movement) {
    let playerRow = carGrid[carGrid.length - 1]
    let playerIndex = playerRow.indexOf(-1)

    // Move up in array
    if (movement == 1 && playerIndex != playerRow.length - 1) {
      playerRow[playerIndex + 1] = -1;
      playerRow[playerIndex] = 0;
    }

    // Move down in array
    if (movement == -1 && playerIndex != 0) {
        playerRow[playerIndex - 1] = -1;
        playerRow[playerIndex] = 0;
    }
    
    return playerRow;
  }

  // Create elements based on how many values are in carGrid
  function createElements(carGrid) {
    document.querySelectorAll(".road").forEach(el => el.remove());
    for(let i = 0; i < carGrid.length; i++) {
      for(let k = 0; k < carGrid[i].length; k++) {
        const newDiv = document.createElement("div");
        newDiv.id = i + '-' + k;
        newDiv.className = 'road'
  
        if (carGrid[i][k] == 1) {
          newDiv.className += ' enemy'
        } else if (carGrid[i][k] == -1) {
          newDiv.className += ' user'
        }
  
        const newContent = document.createTextNode('');
        newDiv.appendChild(newContent);
        const element = document.getElementById("start");
        element.appendChild(newDiv);
      }
    } 
  } 
}