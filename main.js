console.log("hello world");

// ---------SELECTORS------------//
const allDigits = document.querySelectorAll(".digit");
const allOperators = document.querySelectorAll(".operation");
const equalsKey = document.querySelector("#equals-key");
const clearKey = document.querySelector("#clear-key");
const resultsDisplay = document.querySelector("#results");
const operationDisplay = document.querySelector("#operation-display");
const backKey = document.querySelector("#back-key");

let superInput = [];
// Declare an empty first input array
let inputArr = [];
// Declare the result as 0
let results;
// Declare each pressed digit
let digitsArr = [];
// Operations Count
let operationsCount = [];
let counter;
// Declare the finalInput
let finalInput = 0;
// Declare inputs length
let inputsLength;
// For splitting result
let splitted;

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
  //   Make an if statement for each basic math operation
  //   if currentOperator corresponds to the operation  {
  //     return that operation function with (firstInput, secondInput)
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

let checkForDecimals = (num) => {
  if (num % 1 != 0) {
    return num.toPrecision(4);
  } else {
    return num;
  }
};

let checkForInfinity = (num) => {
  if (!isFinite(num)) {
    operationDisplay.style.backgroundColor = "red";
  }
};
// Create a function to clear all past data
let clearAll = () => {
  //   empty both of the inputs arrays
  //   empty the current operator array
  //   declare the results as 0 again
  inputArr = [];
  currentOperator = [];
  results = 0;
  digitsArr = [];
  operationsCount = [];
  resultsDisplay.textContent = results;
};

// Listen for an operation digit
allOperators.forEach((operator) => {
  //   Get the id of the pressed operation digit
  //   push that id to the currentOperator array
  operator.addEventListener("click", function () {
    // We push the current digitsArr into the first element of the input
    if (digitsArr.length > 0 || inputArr.length === 1) {
      if (inputArr.length % 2 === 0) {
        inputArr.push(parseInt(digitsArr.join("")));
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
    digitsArr.push(digit.textContent);
    resultsDisplay.textContent = digitsArr.join("");
    console.log(operationsCount, inputArr, digitsArr);
  });
});

// Listen for the equals key
equalsKey.addEventListener("click", function () {
  if (inputArr.length >= 2 && digitsArr.length > 0) {
    inputArr.push(parseInt(digitsArr.join("")));
    for (let i = 0; i < operationsCount.length; i++) {
      inputArr.unshift(operate(inputArr[1], inputArr[0], inputArr[2]));
      inputArr.splice(1, 3);
      results = inputArr[0];
    }
    checkForInfinity(results);
    resultsDisplay.textContent = checkForDecimals(results);
    digitsArr = [];
    operationsCount = [];
    console.log(operationsCount, inputArr, digitsArr);
  }
});

// Listen for the back key
backKey.addEventListener("click", function () {
  if (inputArr.length === 0) {
    digitsArr.pop();
  } else if (inputArr.length === 1) {
    splitted = inputArr.pop().toString().slice(0, -1);
    inputArr.push(Number(splitted));
  } else if (inputArr.length > 1) {
    if (inputArr.length % 2 === 0 && digitsArr.length === 0) {
      inputArr.pop();
      operationsCount.pop();
    } else if (inputArr.length % 2 === 0 && digitsArr.length > 0) {
      digitsArr.pop();
    }
  }
  console.log(operationsCount, inputArr, digitsArr, splitted);
});

// Listen for a clear button
clearKey.addEventListener("click", function () {
  clearAll();
});
//   call the clear function ()
