const userName = {
  "first Name": "Ritesh",
  age: 20,
  isLoggedIn: true,
};
userName.lastName = "gupta";

console.log(userName["firstName"]);
console.log(userName.lastName);

console.log(userName);

// Date

let today = new Date();
console.log(today.getDate());

//Array
let city = ["delhi", "mumbai"];

console.log(city[0]);

// type conversion

let isValue = "2swds";
console.log(typeof Number(isValue));
console.log(Number(null));
