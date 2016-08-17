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

model.fire("53");
model.fire("06");
model.fire("22");
model.fire("35");
model.fire("42");
model.fire("04");
model.fire("16");
model.fire("26");
