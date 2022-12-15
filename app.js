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
function operate(num1, operand, num2) {
    return operand(parseFloat(num1), parseFloat(num2));
}

/**
 * Globals
 */

let output = "0.0";
let cleared = false;
let operand = null;
let inputs = [null, null];

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
    inputs = [null, null];
    operand = null;
    cleared = true;
});

// equals button handler
const equals = calculator.querySelector('#equals');
click(equals, () => {
    if (operand === null) {
        updateScreen(inputs[0]);
    } else updateScreen(operate(inputs[0], operand, inputs[1]));
    operand = null;
    inputs = [null, null];
    cleared = true;
});

// operand button handlers
const operands = calculator.querySelectorAll('.op');
operands.forEach((op) => {
    click(op, () => {
        handleOperator(op);
    });
});

// number button handlers
const numbers = calculator.querySelectorAll('.num');
numbers.forEach((n) => {
    click(n, () => {
        handleNumber(n);
    });
});

// Operator handler
function handleOperator(op) {
    if (inputs[0] === null) {
        updateScreen(opBeforeIn(op));
        return;
    }
    if (operand !== null) {
        inputs[0] = operate(inputs[0], operand, inputs[1]).toString();
        inputs[1] = null;
        updateScreen(inputs[0]);
    }
    operand = window[op.id];
    updateScreen(output.concat(op.value));
}

function opBeforeIn(op) {
    let opName = window[op.id].name;
    switch (opName) {
        case 'subtract':
            inputs[0] = '-';
            break;
        case 'add':
            inputs[0] = '+';
            break;
        default:
            inputs[0] = null;
    };
    return inputs[0];    
}

// Number Handler
function handleNumber(n) {
    if (cleared && inputs[0] === null) output = "";
        if (operand === null) {
            if (inputs[0] !== null) {
                inputs[0] = inputs[0].concat(n.value);
            } else inputs[0] = n.value;
            
        }  else {
            if (inputs[1] !== null) {
                inputs[1] = inputs[1].concat(n.value);
            } else inputs[1] = n.value;    
        }
        cleared = false;
        updateScreen(output.concat(n.value));
}