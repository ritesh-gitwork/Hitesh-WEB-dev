/* Task: Prototype Chaining

Create a constructor function Animal that has a method speak() that return 'Animal speaking'.

Then create another constructor Dog that inherits from Animal using prototypes.

The Dog constructor should add a method bark() that returns 'Woof!'. Demonstrate the prototype chain between Dog and Animal.

 */

function Animal() {}

Animal.prototype.speak = function () {
  return `Animal speaking`;
};

function Dog() {}

//  Inherit from Animal using prototype chaining
Dog.prototype = Object.create(Animal.prototype);

Dog.prototype.bark = function () {
  return `Woof!`;
};

Dog.prototype.constructor = Dog;

let mydog = new Dog();
console.log(mydog.speak());
console.log(mydog.bark());

// Step 4: Verify the prototype chain
console.log(mydog instanceof Dog); // true
console.log(mydog instanceof Animal); // true
console.log(Object.getPrototypeOf(mydog) === Dog.prototype); // true
console.log(Object.getPrototypeOf(Dog.prototype) === Animal.prototype);
