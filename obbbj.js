// Object
let person = {
  name: "Ankit",
  age: 30,
  hobbies: ["cricket", "reading"],
  greet: function() {
    console.log("Hello!");
  }
};

console.log(person.name); // "Ankit"
person.greet(); // "Hello!"

// Array
let fruits = ["apple", "banana", "orange"];
console.log(fruits[1]); // "banana"

// Array Methods
fruits.push("mango"); // Add to end
fruits.pop(); // Remove from end
fruits.map(fruit => console.log(fruit)); // Log each fruit

// Destructuring
let [firstFruit, secondFruit] = fruits;
console.log(firstFruit); // "apple"
