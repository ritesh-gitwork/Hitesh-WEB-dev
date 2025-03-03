/* Task 1:
Write a function stringToNumber that takes a string input and tries to convert it to a number. If the conversion fails, return "Not a number". 
*/

function stringToNumber(inpStr) {
  const num = Number(inpStr);
  return typeof num === "number" && !isNaN(num) ? num : "not a number";
}

// console.log(stringToNumber(100));
// console.log(stringToNumber("100sdffds"));

/* Task 2:
Write a function flipBoolean that takes any input and converts it to its boolean equivalent, then flips it.For example, true becomes false, 0 becomes true, etc
 */

function flipBoolean(value) {
  return !Boolean(value);
}

// console.log(flipBoolean(true));
// console.log(flipBoolean(0));

/* Task 3:
Write a function whatAmI that takes an input and returns a string describing its type after conversion.If it's a number, return "I'm a number!", if it's a string, return "I'm a string!"
 */

function whatAmI(num) {
  if (typeof num == "number") return "it is number";
  else if (typeof num == "string") return "it is string";
  else {
    return "somethin else";
  }
}

/* console.log(whatAmI(42)); // "I'm a number!"
console.log(whatAmI("hello")); // "I'm a string!"
console.log(whatAmI(true)); // "I'm something else!"
console.log(whatAmI([])); // "I'm something else!"
console.log(whatAmI(null)); // "I'm something else!"
console.log(whatAmI(undefined)); // "I'm something else!"
 */

/* Task 4:

Write a function isItTruthy that takes an input and returns "It's truthy!" if the value is truthy in JavaScript, or "It's falsey!" if it's falsey.
 */

function isItTruthy(value) {
  return value ? "It's truthy!" : "It's falsey!";
}

console.log(isItTruthy(true)); // "It's truthy!"
console.log(isItTruthy(false)); // "It's falsey!"
console.log(isItTruthy(1)); // "It's truthy!"
console.log(isItTruthy(0));
