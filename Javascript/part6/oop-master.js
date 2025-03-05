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
