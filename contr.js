// If-Else
let time = 14;
if (time < 12) {
  console.log("Good morning");
} else if (time < 18) {
  console.log("Good afternoon"); // This will execute
} else {
  console.log("Good evening");
}

// Switch Case
let day = 3;
switch(day) {
  case 1: console.log("Monday"); break;
  case 2: console.log("Tuesday"); break;
  case 3: console.log("Wednesday"); break; // This will execute
  default: console.log("Invalid day");
}

// For Loop
for(let i = 0; i < 5; i++) {
  console.log(i); // 0, 1, 2, 3, 4
}

// While Loop
let j = 0;
while(j < 3) {
  console.log(j); // 0, 1, 2
  j++;
}
