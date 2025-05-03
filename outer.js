function outer() {
  let x = 10;
  return function inner() {
    console.log(x);
  };
}
const closureFn = outer();
closureFn(); // Output: 10
