let display = document.getElementById('display');
let currentInput = '';
let previousInput = '';
let operation = null;
let shouldResetDisplay = false;

function updateDisplay() {
    display.value = currentInput;
}

function clearDisplay() {
    currentInput = '';
    previousInput = '';
    operation = null;
    shouldResetDisplay = false;
    updateDisplay();
}

function deleteLast() {
    if (currentInput.length > 0) {
        currentInput = currentInput.slice(0, -1);
        updateDisplay();
    }
}

function appendToDisplay(value) {
    if (shouldResetDisplay) {
        currentInput = '';
        shouldResetDisplay = false;
    }
    
    if (value === '.' && currentInput.includes('.')) {
        return;
    }
    
    if (['+', '-', '*', '/'].includes(value)) {
        if (operation !== null && !shouldResetDisplay) {
            calculate();
        }
        previousInput = currentInput;
        operation = value;
        shouldResetDisplay = true;
        return;
    }
    
    currentInput += value;
    updateDisplay();
}

function calculate() {
    if (operation === null || previousInput === '') {
        return;
    }
    
    let result;
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);
    
    if (isNaN(prev) || isNaN(current)) {
        return;
    }
    
    switch (operation) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '*':
            result = prev * current;
            break;
        case '/':
            if (current === 0) {
                alert('Cannot divide by zero!');
                return;
            }
            result = prev / current;
            break;
        default:
            return;
    }
    
    currentInput = result.toString();
    operation = null;
    previousInput = '';
    shouldResetDisplay = true;
    updateDisplay();
}

document.addEventListener('keydown', function(event) {
    const key = event.key;
    
    if (key >= '0' && key <= '9') {
        appendToDisplay(key);
    } else if (key === '.') {
        appendToDisplay('.');
    } else if (key === '+' || key === '-' || key === '*' || key === '/') {
        appendToDisplay(key);
    } else if (key === 'Enter' || key === '=') {
        calculate();
    } else if (key === 'Escape') {
        clearDisplay();
    } else if (key === 'Backspace') {
        deleteLast();
    }
});

clearDisplay();