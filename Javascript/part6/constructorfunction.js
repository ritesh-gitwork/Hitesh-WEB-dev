function Person(name, age) {
  this.name = name;
  this.age = age;
}

function Car(make, model) {
  this.make = make;
  this.model = model;
}

let myCar = new Car("toyota", "Camry"); // new keyword is used to declare or make a contructor function
// console.log(myCar);

let myNewCar = new Car("tata", "safari");
// console.log(myNewCar);

function Tea(type) {
  this.type = type;
  this.describe = function () {
    return `this is a cup of ${this.type}`;
  };
}

let lemonTea = new Tea("lemon tea");
// console.log(lemonTea.describe());

//Another method which is used above is also done below given method

function Animal(species) {
  this.species = species;

  Animal.prototype.sound = function () {
    return `${this.species} makes a sound`;
  };
}

let dog = new Animal("dog");
// console.log(dog.sound());

let cat = new Animal("cat");
// console.log(cat.sound());

// a little bit advanced version which specify as we have used the keyword new or not

function Drink(name) {
  if (!new.target) {
    throw new Error("Drink must be called with new keyword");
  }
  this.name = name;
}

let tea = new Drink("tea");
let coffee = new Drink("coffee");
