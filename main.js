"use strict";

// ---------SELECTORS------------//
const allDigits = document.querySelectorAll(".digit");
const allOperators = document.querySelectorAll(".operation");
const equalsKey = document.querySelector("#equals-key");
const clearKey = document.querySelector("#clear-key");
const resultsDisplay = document.querySelector("#results");
const operationDisplay = document.querySelector("#operation-display");
const backKey = document.querySelector("#back-key");
const miniSpeakers = [...document.querySelectorAll(".mini-speakers")];
const digitZero = document.querySelector("#digit-0");
// Declare an empty first input array
let inputArr = [];
// Declare the result as 0
let results;
// Declare each pressed digit
let digitsArr = [];
// Declare an array for displaying the operations
let displayArr = [];
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
  displayArr = [];
  operationDisplay.textContent = 0;
  resultsDisplay.textContent = results;
  resultsDisplay.style.fontSize = "1.6em";
  operationDisplay.style.fontSize = "1em";
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

let checkForTooManyNumbers = () => {
  if (
    resultsDisplay.textContent.length > 7 &&
    resultsDisplay.textContent.length < 9
  ) {
    resultsDisplay.style.fontSize = "1em";
  } else if (resultsDisplay.textContent.length > 11) {
    clearAll();
  }

  if (
    operationDisplay.textContent.length > 10 &&
    operationDisplay.textContent.length < 14
  ) {
    operationDisplay.style.fontSize = "0.8em";
  } else if (operationDisplay.textContent.length > 14) {
    clearAll();
  }
};

let checkForZero = () => {
  if (digitsArr[0] === "0" && digitsArr[1] === "0") {
    digitsArr.splice(1);
    displayArr.splice(1);
    operationDisplay.textContent = displayArr.join("");
    resultsDisplay.textContent = digitsArr.join("");
  } else if (
    inputArr.length < 2 &&
    digitsArr[0] === "0" &&
    digitsArr[1] !== "." &&
    digitsArr.length > 1
  ) {
    digitsArr.shift();
    displayArr.shift();
    operationDisplay.textContent = displayArr.join("");
    resultsDisplay.textContent = digitsArr.join("");
  }

  if (
    inputArr.length === 2 &&
    displayArr[displayArr.length - 2] === "0" &&
    displayArr[displayArr.length - 1] !== "." &&
    digitsArr.length < 3
  ) {
    digitsArr.shift();
    displayArr.splice(displayArr.length - 2, 1);
    resultsDisplay.textContent = digitsArr.join("");
    operationDisplay.textContent = displayArr.join("");
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
        displayArr.push(operator.textContent);
        operationDisplay.textContent = displayArr.join("");
        operationsCount.push(operator.id);
      }
      digitsArr = [];
      results = 0;
      console.log(operationsCount, inputArr, digitsArr, displayArr);
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
      displayArr.push(digit.textContent);
      operationDisplay.textContent = displayArr.join("");
      resultsDisplay.textContent = digitsArr.join("");
    } else {
      digitsArr.push(digit.textContent);
      displayArr.push(digit.textContent);
      operationDisplay.textContent = displayArr.join("");
      resultsDisplay.textContent = digitsArr.join("");
    }
    checkForZero();
    checkForTooManyNumbers();
    console.log(operationsCount, inputArr, digitsArr, displayArr);
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
    operationDisplay.textContent = checkForDecimals(results);
    // Limpiar resultado
    displayArr[0] = checkForDecimals(results);
    displayArr.splice(1);
    digitsArr = [];
    operationsCount = [];

    console.log(operationsCount, inputArr, digitsArr, displayArr);
  }
  checkForTooManyNumbers();
});

// Listen for the back key
backKey.addEventListener("click", function () {
  if (digitsArr.length === 1 && displayArr.length === 1) {
    operationDisplay.textContent = 0;
    resultsDisplay.textContent = 0;
    digitsArr.pop();
    displayArr.pop();
  } else if (digitsArr.length > 0) {
    digitsArr.pop();
    displayArr.pop();
    operationDisplay.textContent = displayArr.join("");
    resultsDisplay.textContent = digitsArr.join("");
  } else if (inputArr.length > 1) {
    // Check if there is an operator and Remove it
    if (inputArr.length % 2 === 0 && digitsArr.length === 0) {
      inputArr.pop();
      operationsCount.pop();
      displayArr.pop();
      operationDisplay.textContent = displayArr.join("");
      // Check if there is a second input and remove it
    } else if (inputArr.length % 2 === 0 && digitsArr.length > 0) {
      digitsArr.pop();
      displayArr.pop();
    }
  }
  console.log(operationsCount, inputArr, digitsArr, displayArr);
});

// Listen for a clear button
clearKey.addEventListener("click", function () {
  clearAll();
});

//-------------HTML APPENDING-----------//

for (let i = 0; i < miniSpeakers.length; i++) {
  for (let j = 0; j < 135; j++) {
    const mini = document.createElement("div");
    mini.classList.add("mini-style");
    miniSpeakers[i].appendChild(mini);
  }
}
