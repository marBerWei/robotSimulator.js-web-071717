'use strict';
// solution one
function Robot(bearing, coordinates = [0,0]) {
  // implement your solution here!
  this.coordinates = coordinates
  var directions = [ 'east', 'west', 'north', 'south' ]
  this.bearing = directions.includes(bearing) ? bearing : "Invalid Robot Bearing"
}

Robot.prototype.orient = function (direction) {
  var directions = [ 'east', 'west', 'north', 'south' ]
  if (directions.includes(direction)) {
    this.bearing = direction
  } else {
    throw new Error ("Invalid Robot Bearing")
  }
}

Robot.prototype.at = function(x, y) {
  let coordinateArr = [x, y]
  this.coordinates = coordinateArr

}

Robot.prototype.turnRight = function(){

 switch (this.bearing) {
    case 'east': this.bearing = 'south'; break;
    case 'south': this.bearing = 'west'; break;
    case 'west': this.bearing = 'north'; break;
    case 'north': this.bearing = 'east';
  }
}

Robot.prototype.turnLeft = function () {
  switch (this.bearing) {
    case 'south': this.bearing = 'east'; break;
    case 'east': this.bearing = 'north'; break;
    case 'north': this.bearing = 'west'; break;
    case 'west': this.bearing = 'south';
  }
}

Robot.prototype.advance = function () {
  let currentCoords = this.coordinates
  switch (this.bearing) {
    case 'north': this.at(currentCoords[0], (currentCoords[1] + 1)); break;
    case 'south': this.at(currentCoords[0], (currentCoords[1] - 1)); break;
    case 'east': this.at((currentCoords[0] + 1), currentCoords[1]); break;
    case 'west': this.at((currentCoords[0] - 1), currentCoords[1]);
  }
}

Robot.prototype.instructions = function (D) {
  let array = D.split("")
  return array.map(function(element){
    switch (element) {
      case 'R': return "turnRight"; break;
      case 'L': return "turnLeft"; break;
      case 'A': return "advance"; break;
    }
  })
}

Robot.prototype.place = function(obj) {
  this.at(obj.x, obj.y)
  this.orient(obj.direction)
}

Robot.prototype.evaluate = function(string){
  var instructions = this.instructions(string)
  instructions.forEach(function(instruction) {
    this[instruction]()
  }.bind(this))
}