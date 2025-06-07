let numbers = [1, 2, 3, 4, 5];

// map - creates new array
let squares = numbers.map(num => num * num);
console.log(squares); // [1, 4, 9, 16, 25]

// filter - selects elements
let evens = numbers.filter(num => num % 2 === 0);
console.log(evens); // [2, 4]

// reduce - reduces to single value
let sum = numbers.reduce((total, num) => total + num, 0);
console.log(sum); // 15

// find - finds first match
let firstBig = numbers.find(num => num > 3);
console.log(firstBig); // 4

// some & every
console.log(numbers.some(num => num > 3)); // true
console.log(numbers.every(num => num > 3)); // false
