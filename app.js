/**
 * Default Operations 
 */

Number.prototype.round = function(n) {
    const d = Math.pow(10, n);
    return Math.round((this + Number.EPSILON) * d) / d;
  }

function add(num1, num2) {
    return (num1 + num2).round(4);
}

function subtract(num1, num2) {
    return (num1 - num2).round(4);
}

function divide(num1, num2) {
    return (num1 / num2).round(4);
}

function multiply(num1, num2) {
    return (num1 * num2).round(4);
}

// perform an operation
function operate(num1, num2, operand) {
    // console.log(`${num1} ${operand.name} ${num2} = `);
    return operand(num1, num2);
}

/**
 * Data Fields
 */

let output = "0.0";
let cleared = false;
let operand = add;
let number1 = 5;
let number2 = 7;

const calculator = document.querySelector('.calculator');

// screen handler
const screen = calculator.querySelector('.screen');
// update the screen to the input
function updateScreen(input) {
    output = input.toString();
    screen.textContent = output;
}
updateScreen(output);
cleared = true;

// handler to add repeated click event
function click(btn, func = () => {null;}) {
    btn.addEventListener('click', () => {
        btn.classList.toggle('clicked');
        func();
    });
}

/**
 * Calculator Event Handlers
 */

// clear button handler
const clear = calculator.querySelector('#clear');
click(clear, () => {
    updateScreen(`0.0`);
    cleared = true;
});

// equals button handler
const equals = calculator.querySelector('#equals');
click(equals, () => {
    console.log(screen.textContent);
    console.log(operate(number1, number2, operand));
    updateScreen(operate(number1, number2, operand));
    cleared = true;
});

// operand button handlers
const operands = calculator.querySelectorAll('.op');
operands.forEach((o) => {
    click(o, () => {
        operand = window[o.id];
        updateScreen(output.concat(o.value));
    });
});

// number button handlers
const numbers = calculator.querySelectorAll('.num');
numbers.forEach((n) => {
    click(n, () => {
        if (cleared) output = "";
        cleared = false;
        updateScreen(output.concat(n.value));
        num1 = n.value;
    });
});


