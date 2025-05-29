console.log(5 == "5");   // Output: true (coercion happens)
console.log(5 === "5");  // Output: false (strict, different types)
console.log(0 == false); // Output: true
console.log(0 === false);// Output: false

let age = 20;
let status = (age >= 18) ? "Adult" : "Minor";
console.log(status); // Output: Adult
