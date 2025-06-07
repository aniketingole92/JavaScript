// Function Declaration
function greet(name) {
  return `Hello, ${name}!`;
}
console.log(greet("Amit")); // "Hello, Amit!"

// Function Expression
const add = function(a, b) {
  return a + b;
};
console.log(add(2, 3)); // 5

// Arrow Function (ES6)
const multiply = (a, b) => a * b;
console.log(multiply(4, 5)); // 20

// Default Parameters
function createUser(name, age = 18) {
  console.log(`${name} is ${age} years old`);
}
createUser("Rahul"); // "Rahul is 18 years old"
