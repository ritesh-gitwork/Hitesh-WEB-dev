let car = {
  make: "toyota",
  model: "Camry",
  year: 2020,
  start: function () {
    return `${this.make} car ${this.model}model is launched in ${this.year}`;
  },
};

console.log(car.start());

function Person(name, age) {
  this.name = name;
  this.age = age;
}

let john = new Person("john doe", 20);
console.log(john.name);

function Animal(type) {
  this.type = type;
}

Animal.prototype.speak = function () {
  return `${this.type} make a sound`;
};

Array.prototype.ritesh = function () {
  return `custom method ${this}`;
};

let myArray = [1, 2, 2, 22, 3, 335];
console.log(myArray.ritesh());

// Creating a class
/* 
class Vehicle { //this ia simple class

}
 */

class Vehicle {
  constructor(make, model) {
    this.make = make;
    this.model = model;
  }
  start() {
    return `${this.model} is a car from ${this.make}`;
  }
}

class Car extends Vehicle {
  // constructor is an optional choice
  drive() {
    return `${this.make} : this is inheritance example`;
  }
}

let myCar = new Car("toyota", "corolla");
// console.log(myCar.start());
// console.log(myCar.drive());

let vehOne = new Vehicle("toyota", "corola");
console.log(vehOne.make);
