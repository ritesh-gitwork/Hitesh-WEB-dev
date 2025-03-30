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

// Inheritance

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

// Encapsulation

class BankAccount {
  #balance = 0;

  deposite(amount) {
    this.#balance += amount;
    return this.#balance;
  }
  getbalance() {
    return `$ ${this.#balance}`;
  }
}

let account = new BankAccount();
console.log(account.getbalance());

// Abstraction

class coffeMachine {
  start() {
    //various process
    //making coffee
    return `starting the machine....`;
  }

  brewMachine() {
    //complex calculation
    return `Brewing the coffee..`;
  }
  pressStartButton() {
    let msg1 = this.start();
    let msg2 = this.brewMachine();
    return `${msg1} + ${msg2}`;
  }
}

let myCoffee = new coffeMachine();
// console.log(myCoffee.start());
// console.log(myCoffee.brewMachine());

console.log(myCoffee.pressStartButton());

// Polymorphism

class Bird {
  fly() {
    return `flying....`;
  }
}

class Penguin extends Bird {
  fly() {
    return `Penguin can't fly ...`;
  }
}

let bird = new Bird();
let penguin = new Penguin();

console.log(bird.fly());
console.log(penguin.fly());

// Static Method

class Calculator {
  static add(a, b) {
    return a + b;
  }
}

// let miniCalc = new Calculator();
// console.log(miniCalc.add(2, 3));

console.log(Calculator.add(5, 8));

// Getter Setter

class Employee {
  #salary;
  constructor(name, salary) {
    if (salary < 0) {
      throw new Error("salary cannot be in negative");
    }
    this.name = name;
    this._salary = salary;
  }

  get salary() {
    return `you are not alllowed to see salary`;
  }

  set salary(value) {
    if (value < 0) {
      console.error("invalid salary");
    } else {
      this._salary = value;
    }
  }
}

let emp = new Employee("alice", 50000);
console.log(emp._salary);
