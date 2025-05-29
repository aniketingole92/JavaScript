// Global Scope
var globalVar = "I'm global";
let globalLet = "I'm also global";
const globalConst = "I'm a global constant";

function scopeTest() {
  // Function Scope
  var functionVar = "I'm function-scoped";
  let functionLet = "I'm block-scoped (within function)";
  const functionConst = "I'm block-scoped constant (within function)";

  if (true) {
    // Block Scope
    var blockVarWithVar = "I'm still function-scoped due to var"; // Var ignores block scope
    let blockLet = "I'm block-scoped (within if)";
    const blockConst = "I'm block-scoped constant (within if)";
    console.log(blockLet);    // Output: I'm block-scoped (within if)
  }
  // console.log(blockLet); // Error: blockLet is not defined here
  console.log(blockVarWithVar); // Output: I'm still function-scoped due to var
  console.log(functionVar);     // Output: I'm function-scoped
}

scopeTest();
// console.log(functionVar); // Error: functionVar is not defined here
