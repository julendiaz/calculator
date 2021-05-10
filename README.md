# Calculator - The Odin Project

<!-- ![Frame 1portadagithub](images/gitportada.png) -->

Go to the [Live Preview](#);

## Table of contents

- [Overview](#overview)
- [The challenge](#the-challenge)
- [Key Features](#key-features)
- [My process](#my-process)
  - [Understand the problem](#understand-the-problem)
  - [Pseudocode](#pseudocode)
  - [Mindmap](#mindmap)
  - [Useful sources](#useful-sources)
- [Approaches](#approaches)
  - [Main Operator](#main-operator)
  - [Clear All](#clear-all)
  - [Check Decimals](#check-decimals)
  - [Keyboard Support](#keyboard-support)
- [Additional Improvements](#additional-improvements)
- [Attribution](#attribution)
- [Contact](#contact)

## Overview

This is the final assignment from the Foundations course on The Odin Project. Building a calculator from scratch. Being honest with myself, this looks kind of scary at first. I'm sure that everything that I've been learning is going to help in comming up with a great solution, but that doesn't mean I'm fearless.

The main purpose is to make it work with basic operations. Nevertheless, I will try to make it as creative as possible. In this regard, I have an idea of adding a musical feature to each button. So it resembles the popular musical calculator from amazon.

## The Challenge

- [x] Build a basic web-browser calculator
- [x] Put in practice array methods
- [x] Create a basic HTML calculator with buttons for each digit
- [x] Come up with a solution for storing the values for each operation
- [x] Implement the OP-1 Inspiration design
- [x] Have fun

## Key Features

- Be able to operate basic math operations
  - add
  - substract
  - multiply
  - divide
- Keyboard Support
- Equals key for displaying the results
- Clear button to reset operations
- Store multiple operations at the same time
- Round integers so the decimals doesn't overrun the display
- Error message if the user tries to divide by 0

## My Process

> Thinking like a Programmer is about having fun with problem-solving

### Understand the problem

- **How are we going to store the functions for each operation?**
- **How to get the value each time a user presses a button?**
- **Should the input be an array, an object or a single variable?**
- **When are we going to run the operate function?**
- **How to use an event listener for all operation buttons?**
- **Another way of using operations**
  - **How are we going to display the result of each operation?**
  - **What to do when pressing the equals digit?**
  - **How to store multiple operations?**
  - **How to round integers?**
  - **how to get the operator argument?**
- **How to store more than one value like 12 + 33 for example?**
- **How could we store all inputs in one single arr?**

### Pseudocode

After reading the first chapter of the book "Think like a programmer", I wanted to put in practice that philosophy of "Always have a plan". For this purpose, I spend a few hours researching and thinking about the best way to implement each feature in plain english.

```
Declare an empty first input array
Declare an empty second input array
Declare an empty current Operator array
Declare the result as 0

Add function for adding numbers (a, b)
Add function for substract (a, b)
Add function for multiply (a, b)
Add function for divide (a, b)

Create function operation with (operator, firstInput, secondInput)
  Make an if statement for each basic math operation
  if currentOperator corresponds to the operation  {
    return that operation function with (firstInput, secondInput)
  }

Create a function to clear all past data
  empty both of the inputs arrays
  empty the current operator array
  declare the results as 0 again

Listen for an operation digit
  Get the id of the pressed operation digit
  push that id to the currentOperator array

Listen for an Input from all the number digits
  Declare a variable for storing the currentValue
  Store the textcontent from the pressed button into the currentValue
  Convert that string into a number
  check if the sum of firstInputArr.length and secondInputArr.length are even or odd
    if inputs.length = odd
      push the currentValue to the secondInputArr
    if inputs.length = even
      push the currentValue to the firstInputArr

Listen for the equals key
  create a loop to run until the length of currentOperators
    Add the operate(currentOperator[i], firstInputArr[i], secondInputArr[i]) to the result with +=
  display that result value

Listen for a clear button
  call the clear function ()
```

Obviously, after coding for a while, I had to re-arrange blocks and come up with solutions for a few other problems. Overall, it really helped me with speeding up the workflow.

### Mindmap

After finishing up the pseudocode method, I thought that some parts were a bit confusing to digest for my current level. That's why I tried to express each solution and function into a simple mindmap. This way I could visualize all the co-relations between variables and organize all of the ideas.

![Mindmap](#)

### Useful Sources

- [onclick Event](https://www.w3schools.com/jsref/event_onclick.asp);
- [toPresicion Method](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toPrecision)
- [How to empty an array](https://stackoverflow.com/questions/1232040/how-do-i-empty-an-array-in-javascript)
- [Spread Operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax)
- [Arrow Functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions)
- [Switch vs If else](https://medium.com/@michellekwong2/switch-vs-if-else-1d458e7b0711#:~:text=For%20switch%2C%20the%20expression%20inside,point%20type%20or%20boolean%20type.)
- [Set timeout](https://www.w3schools.com/jsref/met_win_settimeout.asp)
- [Unshift Method](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/unshift)
- [ParseInt](https://www.w3schools.com/jsref/jsref_parseint.asp)
- [To Fixed Decimals](https://www.w3schools.com/jsref/jsref_tofixed.asp)
- [Event Code](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/code)

## Approaches

### Main Operator

The first big challenge from this project was to come up with a solution for storing each operation. After spending a few hours dancing with different approaches, I went for the common way of using callback functions to operate a single pair of numbers.

with the help of the switch statement, it all looks more readable and simpler.

```javascript
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
```

This is where the complicated stuff comes in, I had to try and keep storing only one operation at a time, and then get rid of the previous ones. I used the splice method for that.

```javascript
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
```

So as a final step, I just had to call this startOperating function after the user presses the equals key. And BOOM! operation done.

### Clear All

I do not really know why, but this feature was one of the most satisfactory implementations. It is really simple, but at the same time, powerful enough to reset all variables.

```javascript
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
```

### Check Decimals

Adding the coma for the decimals was something that I thought it would be easier. Nevertheless, I had so much fun trying to come up with a 'clean' way of displaying them.

First, we need to count the decimals in each result. For that reason, converting it to string and splitting it became necessary.

```javascript
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
```

Afterwards, knowing the length of the decimals, we can just tell the program to display the result with a fixed number of decimals.

```javascript
let checkForDecimals = (num) => {
  if (countDecimals(num) === 1) {
    return num.toFixed(1);
  } else if (countDecimals(num) === 2) {
    return num.toFixed(2);
  } else if (countDecimals(num) >= 3) {
    return num.toFixed(3);
  } else {
    return num;
  };
```

### Keyboard Support

For implementing the keyboard support I wanted to come up with a way of using the template literal or something similar so I could simplify the code.

That's when the event.code came in handy for the job. Using a few for loops and targeting the rest of buttons like equals, coma or back key was enough for solving it.

```javascript
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
```

If you are wondering about the clickIt function, I added it because of the DRY principle so I was not repeating myself a lot.

```javascript
let clickIt = (digit) => {
  digit.click();
  digit.classList.add("active");
  setTimeout(function () {
    digit.classList.remove("active");
  }, 150);
};
```

## Additional Improvements

- [x] Add a Backspace button
- [x] Add keybord support
- [ ] Make it musical

## Attribution

- Designed and Developed by Julen Diaz

## Contact

[<img alt="Instagram" src="https://img.shields.io/badge/julen.dev%20-%23E4405F.svg?&style=for-the-badge&logo=Instagram&logoColor=white"/>](https://www.instagram.com/julen.dev/)
[<img alt="LinkedIn" src="https://img.shields.io/badge/linkedin%20-%230077B5.svg?&style=for-the-badge&logo=linkedin&logoColor=white"/>](https://www.linkedin.com/in/julenfront/)
[<img alt="Youtube" src="https://img.shields.io/badge/julendev%20-%23FF0000.svg?&style=for-the-badge&logo=YouTube&logoColor=white"/>](https://www.youtube.com/channel/UCUoloquxVnnNLFTD8RwthIQ)
[<img alt="Twitter" src="https://img.shields.io/badge/@julendev%20-%231DA1F2.svg?&style=for-the-badge&logo=Twitter&logoColor=white"/>](https://twitter.com/julendev)
