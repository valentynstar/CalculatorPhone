window.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('button');
    const time = document.querySelector('.calculator__form__header__time');
    const displayField = document.getElementById('inputField');
    const historyField = document.querySelector('.calculator__form__screen__input__field__history');
    const historyElement = document.createElement('div');
    let lastInput = ''; // Последнее веденное число
    let inputType = 'number'; // По умолчанию вводится число
    let hasDecimal  = false; // Число с плавающей точкой
    let operationCompleted = false; // Флаг, сигнализирующий о выполнении операции

    window.setInterval(() => {
        let date = new Date();
        let hours = date.getHours();
        let minutes = date.getMinutes();

        if(hours < 10) {
            hours = '0' + hours;
        } else if(minutes < 10) {
            minutes = '0' + minutes;
        }
        
        time.innerHTML = hours + ':' + minutes;
    });
    
    function calculateResultForHistory(expression) {
        try {
            return eval(expression).toString();
        } catch (e) {
            return 'Error Message!';
        }
    }

    function addToHistory(result) {
        historyElement.textContent = result;
        historyField.appendChild(historyElement);
    }

    buttons.forEach((button) => {
        button.addEventListener('click', (e) => {
            const target = e.target;
    
            if (target.dataset.value === 'CA') {
                if (operationCompleted) {
                    const result = calculateResultForHistory(lastInput);
                    addToHistory(result);
                    operationCompleted = false; // Сбрасываем флаг после добавления в историю
                }

                displayField.value = '';
                lastInput = '';
                inputType = 'number';
                hasDecimal = false;
            } else if (target.dataset.value === '') {
                lastInput = lastInput.slice(0, -1);
                displayField.value = lastInput;
                hasDecimal = /\.\d*$/.test(lastInput); // Проверяем наличие точки
            } else if (target.dataset.value === '=') {
                if (displayField.value) {
                    try {
                        lastInput = eval(lastInput).toString();
                    } catch (e) {
                        lastInput = 'Error Message!';
                    }
                    displayField.value = lastInput;
                    operationCompleted = true;
                }
            } else if (target.innerText.match(/[0-9]$/)) {
                lastInput += target.innerHTML;
                displayField.value = lastInput;
                inputType = 'number';
            } else if (target.dataset.value === '.' && inputType === 'number' && !hasDecimal) {
                lastInput += target.innerHTML;
                displayField.value = lastInput;
                hasDecimal = true;
                inputType = 'operator';
            }else if (target.dataset.value === '-' && lastInput === '') {
                lastInput += '-';
                displayField.value = lastInput;
                inputType = 'number';
            } else if (target.dataset.value.match(/[\+\*\-%\/]/) && lastInput.match(/[0-9]$/)) {
                lastInput += target.dataset.value;
                displayField.value = lastInput;
                inputType = 'operator';
                hasDecimal = false;
            } 
        });
    });
});