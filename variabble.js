// Variables
let name = "Amit"; // String
const age = 25; // Number (constant, can't be changed)
var isStudent = true; // Boolean

// Array
let hobbies = ["coding", "gaming", "reading"];

// Object
let person = {
  name: "Amit",
  age: 25,
  greet: function() {
    console.log("Hello, I'm " + this.name);
  }
};

console.log(name); // Output: Amit
console.log(hobbies[0]); // Output: coding
person.greet(); // Output: Hello, I'm Amit
