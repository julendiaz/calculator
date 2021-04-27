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
- [Additional Improvements](#additional-improvements)
- [Attribution](#attribution)
- [Contact](#contact)

## Overview

This is the final assignment from the Foundations course on The Odin Project. Building a calculator from scratch. Being honest with myself, this looks kind of scary at first. I'm sure that everything that I've been learning is going to help in comming up with a great solution, but that doesn't mean I'm fearless.

The main purpose is to make it work with basic operations. Nevertheless, I will try to make it as creative as possible. In this regard, I have an idea of adding a musical feature to each button. So it resembles the popular musical calculator from amazon.

## The Challenge

- [ ] Build a basic web-browser calculator
- [ ] Put in practice array methods
- [ ] Create a basic HTML calculator with buttons for each digit
- [ ] Come up with a solution for storing the values for each operation
- [ ] Implement the OP-1 Inspiration design
- [ ] Have fun

## Key Features

- [ ]Be able to operate basic math operations
  - [ ] add
  - [ ] substract
  - [ ] multiply
  - [ ] divide
- [ ] Equals key for displaying the results
- [ ] Clear button to reset operations
- [ ] Display to showcase the operations
- [ ] Store multiple operations at the same time
- [ ] Round integers so the decimals doesn't overrun the display
- [ ] Error message if the user tries to divide by 0

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

### Pseudocode

After reading the first chapter of the book "Think like a programmer", I wanted to put in practice that philosophy of "Always have a plan". For this purpose, I spend a few hours researching and thinking about the best way to implement each feature in plain english.

```
Create an empty input array

<!-- Basic math operations -->
function for adding numbers (a, b)
function for substract (a, b)
function for multiply (a, b)
function for divide (a, b)

<!-- Operation -->
Create function operation with (operator, firstInput, secondInput)
  if currentOperator corresponds to the operation  {
    return that operation function with (firstInput, secondInput)
  }

Create a function completeOperation
  if(inputArr.length === 2) {
    return the operation function with (currentOperator, input[0], input[1]);
  }

<!-- Event listeners -->
Listen for an operation digit
  Get the id of the pressed operation digit
  Assign that id to a variable called currentOperator

Listen for an Input from all the number digits
  Store the textcontent from the pressed button into a variable
    Convert that string into a number
    push that number into the input array.

Listen for the equals key
  assign a variable result to the completeOperation function
  display that value

Listen for a clear button
  empty the inputArr
```

Obviously, after coding for a while, I had to re-arrange blocks and come up with solutions for a few other problems. Overall, it really helped me with speeding up the workflow.

### Mindmap

After finishing up the pseudocode method, I thought that some parts were a bit confusing to digest for my current level. That's why I tried to express each solution and function into a simple mindmap. This way I could visualize all the co-relations between variables and organize all of the ideas.

![Mindmap](#)

### Useful Sources

- [onclick Event](https://www.w3schools.com/jsref/event_onclick.asp);
- [toPresicion Method](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toPrecision)
- [How to empty an array](https://stackoverflow.com/questions/1232040/how-do-i-empty-an-array-in-javascript)

## Approaches

## Additional Improvements

- [ ] Add decimals to the operations
- [ ] Add a Backspace button
- [ ] Add keybord support
- [ ] Make it musical

## Attribution

- Designed and Developed by Julen Diaz

## Contact

[<img alt="Instagram" src="https://img.shields.io/badge/julen.dev%20-%23E4405F.svg?&style=for-the-badge&logo=Instagram&logoColor=white"/>](https://www.instagram.com/julen.dev/)
[<img alt="LinkedIn" src="https://img.shields.io/badge/linkedin%20-%230077B5.svg?&style=for-the-badge&logo=linkedin&logoColor=white"/>](https://www.linkedin.com/in/julenfront/)
[<img alt="Youtube" src="https://img.shields.io/badge/julendev%20-%23FF0000.svg?&style=for-the-badge&logo=YouTube&logoColor=white"/>](https://www.youtube.com/channel/UCUoloquxVnnNLFTD8RwthIQ)
[<img alt="Twitter" src="https://img.shields.io/badge/@julendev%20-%231DA1F2.svg?&style=for-the-badge&logo=Twitter&logoColor=white"/>](https://twitter.com/julendev)
