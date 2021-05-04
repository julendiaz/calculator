"use strict";

// ---------SELECTORS------------//
const allDigits = document.querySelectorAll(".digit");
const allOperators = document.querySelectorAll(".operation");
const equalsKey = document.querySelector("#equals-key");
const clearKey = document.querySelector("#clear-key");
const resultsDisplay = document.querySelector("#results");
const operationDisplay = document.querySelector("#operation-display");
const backKey = document.querySelector("#back-key");

// Declare an empty first input array
let inputArr = [];
// Declare the result as 0
let results;
// Declare each pressed digit
let digitsArr = [];
// Operations Count
let operationsCount = [];

//----------MAIN FUNCTIONS--------------//

// Add function for adding numbers (a, b)
let add = (a, b) => {
  return a + b;
};
// Add function for substract (a, b)
let substract = (a, b) => {
  return a - b;
};
// Add function for multiply (a, b)
let multiply = (a, b) => {
  return a * b;
};
// Add function for divide (a, b)
let divide = (a, b) => {
  return a / b;
};

// Create function operation with (operator, firstInput, secondInput)
let operate = (operator, x, y) => {
  if (operator === "add") {
    return add(x, y);
  } else if (operator === "substract") {
    return substract(x, y);
  } else if (operator === "multiply") {
    return multiply(x, y);
  } else if (operator === "divide") {
    return divide(x, y);
  }
};

let decimalCount = (num) => {
  // Convert to String
  let numStr = String(num);
  // String Contains Decimal
  if (numStr.includes(".")) {
    return numStr.split(".")[1].length;
  }
  // String Does Not Contain Decimal
  return 0;
};

let checkForDecimals = (num) => {
  if (decimalCount(num) === 1) {
    return num.toFixed(1);
  } else if (decimalCount(num) === 2) {
    return num.toFixed(2);
  } else if (decimalCount(num) >= 3) {
    return num.toFixed(3);
  } else {
    return num;
  }
};

let checkForInfinity = (num) => {
  if (!isFinite(num)) {
    // Display a transition into black like a black hole and say something like, hey you created a black hole.
    operationDisplay.style.backgroundColor = "red";
  }
};

// Create a function to clear all past data
let clearAll = () => {
  inputArr = [];
  results = 0;
  digitsArr = [];
  operationsCount = [];
  resultsDisplay.textContent = results;
};

let startOperating = () => {
  for (let i = 0; i < operationsCount.length; i++) {
    // Operate the first two pair of numbers and push it to the beggining
    inputArr.unshift(operate(inputArr[1], inputArr[0], inputArr[2]));
    // remove the previous operation
    inputArr.splice(1, 3);
    // Update the results
    results = inputArr[0];
  }
};

//--------------EVENT LISTENERS------------//

// Listen for an operation digit
allOperators.forEach((operator) => {
  operator.addEventListener("click", function () {
    // Enable the button just when there is a number
    if (digitsArr.length > 0 || inputArr.length === 1) {
      // Check for odd or even so we can operate more than once
      if (inputArr.length % 2 === 0) {
        inputArr.push(parseFloat(digitsArr.join("")));
      }
      if (inputArr.length % 2 !== 0) {
        inputArr.push(operator.id);
        operationsCount.push(operator.id);
      }
      digitsArr = [];
      results = 0;
      console.log(operationsCount, inputArr, digitsArr);
    }
  });
});

// Listen for an Input from all the number digits
allDigits.forEach((digit) => {
  digit.addEventListener("click", function () {
    // Store each digit into an array
    if (inputArr.length === 1) {
      inputArr = [];
      digitsArr.push(digit.textContent);
      resultsDisplay.textContent = digitsArr.join("");
    } else {
      digitsArr.push(digit.textContent);
      resultsDisplay.textContent = digitsArr.join("");
    }

    console.log(operationsCount, inputArr, digitsArr);
  });
});

// Listen for the equals key
equalsKey.addEventListener("click", function () {
  // Enable the button if there is any operation going on
  if (inputArr.length >= 2 && digitsArr.length > 0) {
    inputArr.push(parseInt(digitsArr.join("")));
    startOperating();
    checkForInfinity(results);
    resultsDisplay.textContent = checkForDecimals(results);
    digitsArr = [];
    operationsCount = [];
    console.log(operationsCount, inputArr, digitsArr);
  }
});

// Listen for the back key
backKey.addEventListener("click", function () {
  if (digitsArr.length > 0) {
    digitsArr.pop();
    resultsDisplay.textContent = parseInt(digitsArr.join(""));
  } else if (inputArr.length > 1) {
    // Check if there is an operator and Remove it
    if (inputArr.length % 2 === 0 && digitsArr.length === 0) {
      inputArr.pop();
      operationsCount.pop();
      // Check if there is a second input and remove it
    } else if (inputArr.length % 2 === 0 && digitsArr.length > 0) {
      digitsArr.pop();
    }
  }
  console.log(operationsCount, inputArr, digitsArr);
});

// Listen for a clear button
clearKey.addEventListener("click", function () {
  clearAll();
});
