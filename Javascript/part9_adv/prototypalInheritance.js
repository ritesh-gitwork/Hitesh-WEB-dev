function Person(name) {
  this.name = name;
}

Person.prototype.greet = function () {
  console.log(`hellooo my name is ${this.name}`);
};

const rit = new Person("ritesh");
// console.log(rit);
rit.greet();
