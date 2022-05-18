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



