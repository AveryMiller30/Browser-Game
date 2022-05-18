let carGrid = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [-1, 0, 0, 0]];

var t = setInterval(updateCars, 1000);

 function updateCars() {
   let temp = [];
   temp[0] = makeRandomRow();

  
   carGrid.forEach(function(value, index) {
       if (carGrid.length - 1 != index){
         temp[index + 1] = value;
       }
   })

   carGrid = temp;
   console.log(carGrid)
 }

 function makeRandomRow() {
   let newRow = [];
   let count = 0;
   // TODO: Change 5 to variable.length
   for (let i = 1; i < 5; i++) {
     let rand = Math.round(Math.random())
     if (rand === 1 && count === 3) {
       newRow.push(0)
     } else {
       newRow.push(rand)
       count++
     }
   }
   return newRow
}

// When user presses -> or <-, move our car (-1) to the respectul direction.
//  From https://stackoverflow.com/questions/5597060/detecting-arrow-key-presses-in-javascript
// This code is used to detect when the left and right arrow keys have been pressed
function findKeypress(carGrid) {
    document.onkeydown = function (event) {
        switch (event.keyCode) {
           case 37:
              carGrid[carGrid.length - 1] = moveCar(carGrid, -1)
              console.log(carGrid)
              break;
           case 39:
              carGrid[carGrid.length - 1] = moveCar(carGrid, 1)
              console.log(carGrid)
              break;
        }
     };
  }
  
  function moveCar(carGrid, movement) {
    let playerRow = carGrid[carGrid.length - 1]
    let playerIndex = playerRow.indexOf(-1)
  
    if (movement == 1 && playerIndex != playerRow.length - 1) {
      playerRow[playerIndex + 1] = -1;
      playerRow[playerIndex] = 0;
    }
  
    if (movement == -1 && playerIndex != 0) {
        playerRow[playerIndex - 1] = -1;
        playerRow[playerIndex] = 0;
    }
  
    return playerRow;
  }



