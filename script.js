const display = document.querySelector('.display');
const buttons = document.querySelectorAll('button');
let currentNumber = '';
let previousNumber = '';
let operation = null;

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.textContent;
        
        if (value >= '0' && value <= '9' || value === '.') {
            appendNumber(value);
        } else if (['+', '-', '×', '/', '%', '±'].includes(value)) {
            appendOperator(value);
        } else if (value === '=') {
            calculate();
        } else if (value === 'C') {
            clearDisplay();
        }
    });
});

function appendNumber(num) {
    if (num === '.' && currentNumber.includes('.')) return;
    currentNumber += num;
    updateDisplay();
}

function appendOperator(op) {
    if (currentNumber === '') return;
    if (previousNumber !== '') calculate();
    
    operation = op;
    previousNumber = currentNumber;
    currentNumber = '';
    updateDisplay();
}

function calculate() {
    let computation;
    const prev = parseFloat(previousNumber);
    const current = parseFloat(currentNumber);
    
    if (isNaN(prev) || isNaN(current)) return;
    
    switch(operation) {
        case '+':
            computation = prev + current;
            break;
        case '-':
            computation = prev - current;
            break;
        case '×':
            computation = prev * current;
            break;
        case '/':
            computation = prev / current;
            break;
        case '%':
            computation = prev % current;
            break;
        case '±':
            computation = prev * -1;
            break;
        default:
            return;
    }
    
    currentNumber = computation.toString();
    operation = null;
    previousNumber = '';
    updateDisplay();
}

function clearDisplay() {
    currentNumber = '';
    previousNumber = '';
    operation = null;
    updateDisplay();
}

function updateDisplay() {
    display.value = currentNumber || '0';
}

// دعم لوحة المفاتيح
document.addEventListener('keydown', (e) => {
    if (e.key >= '0' && e.key <= '9' || e.key === '.') appendNumber(e.key);
    if (e.key === 'Enter') calculate();
    if (e.key === 'Escape') clearDisplay();
    if (['+', '-', '*', '/', '%'].includes(e.key)) {
        const op = e.key === '*' ? '×' : e.key;
        appendOperator(op);
    }
});