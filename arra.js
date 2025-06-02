let person = {
    name: "John",
    age: 30,
    isStudent: false,
    hobbies: ["reading", "coding"],
    
    greet: function() {
        console.log("Hello!");
    }
};

// Access properties
console.log(person.name); // "John"
person.greet();          // Calls the method
