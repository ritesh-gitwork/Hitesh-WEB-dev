let computer = { thread: 12 };
let lenovo = {
  screen: "hd",
  __proto__: computer,
};
let tomHardware = {};

// console.log(`lenovo`, lenovo.__proto__);

let genericCar = { tyres: 4 };

let tesla = { driver: "AI" };

Object.setPrototypeOf(tesla, genericCar);
console.log(`tesla`, Object.getPrototypeOf(tesla));
