
// Get the display element
const display = document.getElementById("display");

// Calculator variables
let currentInput = "0";
let firstNumber = null;
let operator = null;
let shouldReset = false;

// Update calculator display
function updateDisplay() {
    display.value = currentInput;
}

// Handle number and decimal input
function inputNumber(number) {

    if (currentInput === "Error" || shouldReset) {
        currentInput = number;
        shouldReset = false;
    } 
    else if (currentInput === "0") {
        currentInput = number;
    } 
    else {
        currentInput += number;
    }

    updateDisplay();
}

// Handle decimal point
function inputDecimal() {

    if (shouldReset || currentInput === "Error") {
        currentInput = "0";
        shouldReset = false;
    }

    if (!currentInput.includes(".")) {
        currentInput += ".";
    }

    updateDisplay();
}

// Perform calculation
function calculate() {

    if (firstNumber === null || operator === null) {
        return;
    }

    let secondNumber = parseFloat(currentInput);
    let result;

    switch (operator) {

        case "+":
            result = firstNumber + secondNumber;
            break;

        case "-":
            result = firstNumber - secondNumber;
            break;

        case "×":
            result = firstNumber * secondNumber;
            break;

        case "÷":
            if (secondNumber === 0) {
                currentInput = "Error";
                firstNumber = null;
                operator = null;
                shouldReset = true;
                updateDisplay();
                return;
            }

            result = firstNumber / secondNumber;
            break;
    }

    currentInput = String(
        Number(result.toPrecision(10))
    );

    firstNumber = null;
    operator = null;
    shouldReset = true;

    updateDisplay();
}

// Handle operator buttons
function chooseOperator(selectedOperator) {

    if (currentInput === "Error") return;

    if (operator !== null && !shouldReset) {
        calculate();
    }

    firstNumber = parseFloat(currentInput);
    operator = selectedOperator;
    shouldReset = true;
}

// Clear all values
function clearCalculator() {

    currentInput = "0";
    firstNumber = null;
    operator = null;
    shouldReset = false;

    updateDisplay();
}

// Delete last digit
function deleteNumber() {

    if (currentInput === "Error" || shouldReset) {
        currentInput = "0";
        shouldReset = false;
    } 
    else {
        currentInput = currentInput.slice(0, -1);

        if (currentInput === "" || currentInput === "-") {
            currentInput = "0";
        }
    }

    updateDisplay();
}

// Handle button clicks
const buttons = document.querySelectorAll(".buttons button");

buttons.forEach(function(button) {

    button.addEventListener("click", function() {

        const value = button.textContent;

        if (value >= "0" && value <= "9") {
            inputNumber(value);
        }

        else if (value === ".") {
            inputDecimal();
        }

        else if (["+", "-", "×", "÷"].includes(value)) {
            chooseOperator(value);
        }

        else if (value === "=") {
            calculate();
        }

        else if (value === "AC") {
            clearCalculator();
        }

        else if (value === "DEL") {
            deleteNumber();
        }

    });

});
