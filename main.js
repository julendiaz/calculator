"use strict";

// ---------SELECTORS------------//
const allDigits = [...document.querySelectorAll(".digit")];
const allOperators = [...document.querySelectorAll(".operation")];
const equalsKey = document.querySelector("#equals-key");
const clearKey = document.querySelector("#clear-key");
const resultsDisplay = document.querySelector("#results");
const operationDisplay = document.querySelector("#operation-display");
const backKey = document.querySelector("#back-key");
const miniSpeakers = [...document.querySelectorAll(".mini-speakers")];
const digitZero = document.querySelector("#digit-0");
const digitComa = document.querySelector("#digit-coma");
const message = document.querySelector("#message-text");

//-----------STARTER VARIABLES-------------//
let inputArr = [];
let results;
let digitsArr = [];
let displayArr = [];
let operationsCount = [];

//----------MAIN FUNCTIONS--------------//

// Simple math operations
let add = (a, b) => a + b;
let subtract = (a, b) => a - b;
let multiply = (a, b) => a * b;
let divide = (a, b) => a / b;

// Main function for operating a pair of numbers
let operate = (operator, x, y) => {
  switch (operator) {
    case "add":
      return add(x, y);
      break;
    case "subtract":
      return subtract(x, y);
      break;
    case "multiply":
      return multiply(x, y);
      break;
    case "divide":
      return divide(x, y);
      break;
  }
};

let clickIt = (digit) => {
  digit.click();
  digit.classList.add("active");
  setTimeout(function () {
    digit.classList.remove("active");
  }, 150);
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

// Create a function to clear all past data
let clearAll = () => {
  inputArr = [];
  results = 0;
  digitsArr = [];
  operationsCount = [];
  displayArr = [];
  operationDisplay.textContent = 0;
  digitComa.disabled = false;
  message.textContent = "";
  resultsDisplay.textContent = results;
  resultsDisplay.style.fontSize = "1.6em";
  operationDisplay.style.fontSize = "1em";
};

let countDecimals = (num) => {
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
  if (countDecimals(num) === 1) {
    return num.toFixed(1);
  } else if (countDecimals(num) === 2) {
    return num.toFixed(2);
  } else if (countDecimals(num) >= 3) {
    return num.toFixed(3);
    // Check for unwanted zero's when fixing the decimals to three
  } else if (
    countDecimals(num) >= 3 &&
    String(num.toFixed(3))[String(num.toFixed(3)).length - 1] === "0"
  ) {
    return num.toFixed(2);
  } else if (
    countDecimals(num) >= 3 &&
    String(num.toFixed(3))[String(num.toFixed(3)).length - 1] === "0" &&
    String(num.toFixed(3))[String(num.toFixed(3)).length - 2] === "0"
  ) {
    return num.toFixed(1);
    // Return number if there are no decimals
  } else {
    return num;
  }
};

let checkForInfinity = (num) => {
  if (!isFinite(num)) {
    // Display a transition into black like a black hole and say something like, hey you created a black hole.
    message.textContent = "Please don't create a black hole!";
  }
};

let showResults = () => {
  operationDisplay.textContent = displayArr.join("");
  resultsDisplay.textContent = digitsArr.join("");
};

let checkForTooManyNumbers = () => {
  if (
    resultsDisplay.textContent.length > 7 &&
    resultsDisplay.textContent.length < 9
  ) {
    resultsDisplay.style.fontSize = "1em";
  } else if (resultsDisplay.textContent.length > 11) {
    clearAll();
    message.textContent = "wow wow wow please don't get excited!";
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
  // Check for two consecutive zeros at the beginning
  if (digitsArr[0] === "0" && digitsArr[1] === "0") {
    digitsArr.splice(1);
    displayArr.splice(1);
    showResults();
  } else if (
    inputArr.length < 2 &&
    digitsArr[0] === "0" &&
    digitsArr[1] !== "." &&
    digitsArr.length > 1
  ) {
    digitsArr.shift();
    displayArr.shift();
    showResults();
  }
  // Check for consecutive zero's after the first operation
  if (
    inputArr.length === 2 &&
    displayArr[displayArr.length - 2] === "0" &&
    displayArr[displayArr.length - 1] !== "." &&
    digitsArr.length < 3
  ) {
    digitsArr.shift();
    displayArr.splice(displayArr.length - 2, 1);
    showResults();
  }
};

let checkForComa = () => {
  if (digitsArr.includes(".")) {
    digitComa.disabled = true;
  }
};
// When the user gets a result, but wants to start a new operation without clear
let checkForNewNum = () => {
  if (typeof displayArr[0] === "number" && displayArr.length === 2) {
    displayArr.shift();
    showResults();
  }
};
// Remove the last number when pressing the goBack key
let popLastDigit = () => {
  digitsArr.pop();
  displayArr.pop();
};

//--------------EVENT LISTENERS------------//

// Keyboard support feature
document.addEventListener("keydown", function (event) {
  // Get the event code to match with digits and operators
  let numCode = event.code[event.code.length - 1];
  let operatorCode = event.code.slice(6).toLowerCase();
  if (event.code === "NumpadDecimal") {
    clickIt(allDigits[10]);
  } else if (event.code === "NumpadEnter") {
    clickIt(equalsKey);
  } else if (event.code === "Backspace") {
    clickIt(backKey);
  }
  // Itinerate through all the digits and click the one pressed
  for (let i = 0; i < allDigits.length; i++) {
    if (allDigits[i].textContent === numCode) {
      clickIt(allDigits[i]);
    }
  }
  // Itinerate through all the Operations and click the one pressed
  for (let i = 0; i < allOperators.length; i++) {
    if (allOperators[i].id === operatorCode) {
      clickIt(allOperators[i]);
    }
  }
});

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
      digitComa.disabled = false;
      console.log(operationsCount, inputArr, digitsArr, displayArr);
    }
  });
});

// Listen for an Input from all the number digits
allDigits.forEach((digit) => {
  digit.addEventListener("click", function () {
    // Check if there was an operation before
    if (inputArr.length === 1) {
      inputArr = [];
      digitsArr.push(digit.textContent);
      displayArr.push(digit.textContent);
      showResults();
    } else {
      digitsArr.push(digit.textContent);
      displayArr.push(digit.textContent);
      showResults();
    }
    checkForComa();
    checkForZero();
    checkForTooManyNumbers();
    checkForNewNum();
    console.log(operationsCount, inputArr, digitsArr, displayArr);
  });
});

// Listen for the equals key
equalsKey.addEventListener("click", function () {
  // Enable the button if there is any operation going on
  if (inputArr.length >= 2 && digitsArr.length > 0) {
    inputArr.push(parseFloat(digitsArr.join("")));
    startOperating();
    checkForInfinity(results);
    resultsDisplay.textContent = checkForDecimals(results);
    operationDisplay.textContent = checkForDecimals(results);
    // Clean up the results
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
    // Display a zero if user gets rid of all numbers
    operationDisplay.textContent = 0;
    resultsDisplay.textContent = 0;
    popLastDigit();
  } else if (digitsArr.length > 0) {
    popLastDigit();
    showResults();
  } else if (inputArr.length > 1) {
    // Check if there is an operator and Remove it
    if (inputArr.length % 2 === 0 && digitsArr.length === 0) {
      inputArr.pop();
      operationsCount.pop();
      displayArr.pop();
      operationDisplay.textContent = displayArr.join("");
      // Check if there is a second input and remove it
    } else if (inputArr.length % 2 === 0 && digitsArr.length > 0) {
      popLastDigit();
    }
  }
  console.log(operationsCount, inputArr, digitsArr, displayArr);
});

// Listen for a clear button
clearKey.addEventListener("click", function () {
  clearAll();
});

//-------------HTML APPENDING-----------//

// Insert the little dots inside the speakers
for (let i = 0; i < miniSpeakers.length; i++) {
  for (let j = 0; j < 135; j++) {
    const mini = document.createElement("div");
    mini.classList.add("mini-style");
    miniSpeakers[i].appendChild(mini);
  }
}
