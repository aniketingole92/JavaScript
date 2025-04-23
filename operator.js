// Arithmetic (+, -, *, /, %, **)
let sum = 5 + 3;  // 8

// Assignment (=, +=, -=, *=)
let x = 10;
x += 5;  // x = x + 5 → 15

// Comparison (==, ===, !=, !==, >, <, >=, <=)
let a = 5;
let b = "5";
console.log(a == b);   // true (value same)
console.log(a === b);  // false (type different)

// Logical (&&, ||, !)
let age = 20;
let hasLicense = true;
if(age >= 18 && hasLicense) {
    console.log("Drive kar sakte ho");
}
