const person = {
  firstName: "John",
  lastName: "Doe",
  age: 30,
  // Method
  greet: function() {
    console.log(`Hello, my name is ${this.firstName} ${this.lastName}.`);
  },
  // ES6 method shorthand
  sayBye() {
    console.log("Goodbye!");
  }
};

console.log(person.firstName); // Output: John
person.greet();              // Output: Hello, my name is John Doe.
person.sayBye();             // Output: Goodbye!

// Adding a property
person.city = "New York";
console.log(person.city);    // Output: New York

// Accessing with bracket notation (useful for dynamic property names)
let propName = "age";
console.log(person[propName]); // Output: 30
