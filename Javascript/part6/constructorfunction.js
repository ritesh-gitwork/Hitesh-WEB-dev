function Person(name, age) {
  this.name = name;
  this.age = age;
}

function Car(make, model) {
  this.make = make;
  this.model = model;
}

let myCar = new Car("toyota", "Camry"); // new keyword is used to declare or make a contructor function
console.log(myCar);

let myNewCar = new Car("tata", "safari");
console.log(myNewCar);
