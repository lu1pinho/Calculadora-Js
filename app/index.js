const calc_input = document.getElementById('input');
const result_span = document.getElementById('result');
const calculadora = document.getElementById('calculadora');
let resultStored = false;

function appendValue(value) {
    if (value === 'C') {
        resetDisplay();
    } else if (value === 'del') {
        if (calc_input.value.length > 0) {
            calc_input.value = calc_input.value.slice(0, -1);
        }
    } else {
        if (resultStored && ['+', '-', '*', '/'].includes(value)) {
            calc_input.value = result_span.innerText.replace('= ', '') + value;
            resultStored = false;
        } else {
            calc_input.value += value;
        }
    }

    adjustFontSize();
    adjustCalculatorSize();
}

// Calcula o resultado
function calculateResult() {
    if (calc_input.value.trim() === '') {
        return;
    }

    try {
        let expression = calc_input.value;

        if (/\/0(?![.\d])/.test(expression)) {
            throw new Error("Divisão por zero");
        }

        let result = eval(expression);
        result_span.innerText = `= ${result}`;
        resultStored = true;
    } catch (error) {
        if (error.message === "Divisão por zero") {
            result_span.innerText = 'Erro';
        } else {
            result_span.innerText = 'Entrada inválida';
        }
    }

    adjustCalculatorSize();
}


document.addEventListener('keydown', (event) => {
    const allowedKeys = [
        '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
        '+', '-', '*', '/', '.', 'Enter', 'Backspace'
    ];

    if (allowedKeys.includes(event.key)) {
        if (event.key === 'Enter') {
            calculateResult();
        } else if (event.key === 'Backspace') {
            appendValue('del');
            event.preventDefault();
        } else {
            appendValue(event.key);
            event.preventDefault();
        }
    }
});

function resetDisplay() {
    calc_input.value = '';
    result_span.innerText = '';
    resultStored = false;
    adjustCalculatorSize();
}

function adjustFontSize() {
    const defaultFontSize = 40; // Fonte padrão
    calc_input.style.fontSize = `${defaultFontSize}px`;
}

function adjustCalculatorSize() {
    const inputLength = calc_input.value.length;
    const resultLength = result_span.innerText.length;

    const get_width = window.innerWidth;

    console.log(get_width);

    if (inputLength > 10 || resultLength > 10) {
        calculadora.style.width = '80%';
    } else {
        calculadora.style.width = get_width <= 480 ? '80%' : 'clamp(300px, 50%, 400px)';
    }
}

