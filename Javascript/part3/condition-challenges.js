/*
let num1 = 6;
let num2 = 9;

if (num1 > num2) {
  console.log("num 1 is greater than 2");
} else {
  console.log("num2 is greater");
}

*/

// Checking if string is equal to another string

let user = "ritesh";
let anotherUser = "ritesh";

if (user == anotherUser) {
  console.log("you can't choose this username");
} else {
  console.log("you can choose this username");
}

// Checking a variabal is number or not

let score = "hvbh";

if (typeof score === "number") {
  console.log("Yes this is a number");
} else {
  console.log("this is not a number");
}

// Checking if a bolean value is true or false

let isSignedIN = true;

if (isSignedIN) {
  console.log("User signed in");
} else {
  console.log("not signed in");
}

//Check if array is empty or not

let product = [];

console.log("Length of product :", product.length);

if (product.length === 0) {
  console.log("Product is empty");
} else {
  console.log("product is not empty");
}
