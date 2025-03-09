// DOM Elements
const links = document.querySelectorAll("link[rel='stylesheet']");
const themeLink = document.getElementById("theme-link");
const toggleBtn = document.querySelectorAll("input[name='theme']");
const prevOperandText = document.querySelector("[data-previous-operand]");
const currentOperandText = document.querySelector("[data-current-operand]");
const operands = document.querySelectorAll("[data-num]");
const operatorBtn = document.querySelectorAll("[data-operator]");
const resultBtn = document.querySelector("[data-output]");
const resetBtn = document.querySelector("[data-reset]");
const deleteBtn = document.querySelector("[data-delete]");

// Initial operand values
let prevOperand = prevOperandText.innerText || '';
let currentOperand = currentOperandText.innerText || '';
let operation;

// Perform the calculation based on the selected operation
function calculatorOperation() {
    let result;
    let prev = parseFloat(prevOperand);
    let current = parseFloat(currentOperand);
    if (isNaN(prev) || isNaN(current)) return;

    switch (operation) {
        case "+": result = prev + current; break;
        case "-": result = prev - current; break;
        case "×": result = prev * current; break;
        case "/": result = prev / current; break;
        default: return;
    }

    currentOperand = result;
    operation = undefined;
    prevOperand = "";
    prevOperandText.innerText = "";
}

// Reset all values
function reset() {
    prevOperand = currentOperand = "";
    operation = undefined;
}

// Remove the last character from the current operand
function deleteOperand() {
    currentOperand = currentOperand.toString().slice(0, -1);
}

// Add a number to the current operand
function addNumber(number) {
    if (number === "." && currentOperand.includes(".")) return; // Prevent multiple decimals
    currentOperand += number;
}

// Select the operation and set the current operand as previous operand
function operationSelection(operate) {
    if (!currentOperand) return;
    if (prevOperand) calculatorOperation(); // Perform calculation if there's a previous operand
    operation = operate;
    prevOperand = currentOperand;
    currentOperand = "";
}

// Display the current and previous operands on the screen
function displayNum() {
    currentOperandText.innerText = currentOperand.toLocaleString("en");
    prevOperandText.innerText = operation ? `${prevOperand} ${operation}` : prevOperand;
}

// Change theme based on the selected radio button value
function themeChange(i) {
    if(i === "0") {
        themeLink.setAttribute("href", "");
    } else {
        themeLink.setAttribute("href", `css/theme${i}.css`);
    }
}

// Event listener for reset
resetBtn.addEventListener("click", () => {
    reset();
    displayNum();
});

// Event listener for delete button
deleteBtn.addEventListener("click", () => {
    deleteOperand();
    displayNum();
});

// Event listeners for operand buttons
operands.forEach(operand => {
    operand.addEventListener("click", () => {
        addNumber(operand.innerText);
        displayNum();
    });
});

// Event listeners for operator buttons
operatorBtn.forEach(btn => {
    btn.addEventListener("click", () => {
        operationSelection(btn.innerText);
        displayNum();
    });
});

// Event listener for result button
resultBtn.addEventListener("click", () => {
    calculatorOperation();
    displayNum();
});

// Event listeners for theme selection
toggleBtn.forEach(btn => {
    btn.addEventListener("change", () => themeChange(btn.value));
});