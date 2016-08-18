//view

var view = {
  displayMessage: function(msg) {
    var messageArea = document.getElementById("messageArea");
    messageArea.innerHTML = msg;
  },
  displayHit: function(location) {
    var cell = document.getElementById(location);
    cell.setAttribute("class","hit");
  },
  displayMiss: function(location) {
    var cell = document.getElementById(location);
    cell.setAttribute("class","miss");
  }
};


//model

var model = {
  boardSize: 7,
  numShips: 3,
  shipsSunk: 0,
  shipLength: 3,
  ships: [ { locations: ["06", "16", "26"], hits: ["","",""] },
           { locations: ["24", "34", "44"], hits: ["","",""] },
           { locations: ["10", "11", "12"], hits: ["","",""] } ],
  fire: function(guess) {
    for(var i = 0; i < this.numShips; i++) {
      var ship = this.ships[i];
      var index = ship.locations.indexOf(guess);
      if (index >= 0) {
        ship.hits[index] = "hit";
        //ask view to display the message hit and display ship
        view.displayHit(guess);
        view.displayMessage("HIT!");
          if(this.isSunk(ship)) {
            view.displayMessage("You sank my battleship!");
            this.shipsSunk++;
          }
          return true;
      }
    }
    view.displayMiss(guess);
    view.displayMessage("you missed.");
    return false;
  },
  isSunk: function(ship) {
    for(var i = 0; i < this.shipLength; i++) {
      if(ship.hits[i] !== "hit") {
        return false;
      }
    }
    return true;
  }
};


//controller

//function - process the guess
function parseGuess(guess) {
  var alphabet = ["A","B","C","D","E","F","G"];

  if(guess === null || guess.length !== 2 ) {
    alert("Oops! Please enter a letter and a number on the board.");
  } else {
    var firstChar = guess.charAt(0);
    var row = alphabet.indexOf(firstChar);
    var column = guess.charAt(1);

    if(isNaN(row) || isNaN(column)) {
      alert("Oops! That isn't on the board!");
    } else if(row < 0 || row >= model.boardSize || column < 0 || column >= model.boardSize) {
      alert("Oops! that's of the board!");
    } else {
      return row + column;
    }
  }
  return null;
}



var controller = {
  guesses: 0,

  processGuess: function(guess) {
    var location = parseGuess(guess);
    if (location) {
      this.guesses++;
      var hit = model.fire(location);
      if (hit && model.shipsSunk === model.numShips) {
        view.displayMessage("You sank all my battleships, in" + this.guesses + " guesses");
      }
    }
  }
}

//function - event handler for button
function init() {
  var fireButton = document.getElementById("fireButton");
  fireButton.onclick = handleFireButton;
}

//function - getitng players guess from form
function handleFireButton() {
  var guessInput = document.getElementById("guessInput");
  var guess = guessInput.value;
  controller.processGuess(guess);
  guessInput.value = "";
}

window.onload = init;
