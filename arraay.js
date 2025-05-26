let numbers = [1, 2, 3, 4];

// Add element
numbers.push(5); // [1, 2, 3, 4, 5]

// Map to double each number
let doubled = numbers.map(num => num * 2);
console.log(doubled); // Output: [2, 4, 6, 8, 10]

// Filter even numbers
let evens = numbers.filter(num => num % 2 === 0);
console.log(evens); // Output: [2, 4]
