window.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('button');

    const time = document.querySelector('.calculator__form__header__time');
    const displayField = document.getElementById('inputField');

    const historyField = document.querySelector('.calculator__form__screen__input__field__history');
    const historyElement = document.createElement('div');

    const standartCalculator = document.querySelector('.calculator__form__screen__nums');
    const engineerCalculator = document.querySelector('.calculator__form__screen__nums__engineer');
    const calculatorMode = document.querySelector('.calculator__form__screen__switchmode');

    let lastInput = ''; // Последнее веденное число
    let inputType = 'number'; // По умолчанию вводится число
    let decimal  = false; // Число с плавающей точкой
    let operationCompleted = false; // Флаг, сигнализирующий о выполнении операции


    // Этот код обновляет время в заголовке калькулятора каждую секунду.
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

    // Эта функция добавляет результат вычисления в историю калькулятора.
    function addToHistory(result) {
        historyElement.textContent = result;
        historyField.appendChild(historyElement);
    }

    function calculatorToggleMode() {
        standartCalculator.classList.toggle('hidden');
        engineerCalculator.classList.toggle('hidden');

        if(calculatorMode.innerHTML === 'Engineer Mode') {
            return calculatorMode.innerHTML = 'Standard Mode';
        } else {
            return calculatorMode.innerHTML = 'Engineer Mode';
        }
    }

    calculatorMode.addEventListener('click', calculatorToggleMode);

    // В этом блоке обработчиков нажатия на кнопки обрабатывается нажатие на каждую кнопку калькулятора. 
    // В зависимости от нажатой кнопки выполняются соответствующие действия.
    buttons.forEach((button) => {
        button.addEventListener('click', (e) => {
            const target = e.target;

            if (target.dataset.value === 'CA') {
                if (operationCompleted) {
                    const result = lastInput;
                    addToHistory(result);
                    operationCompleted = false; // Сбрасываем флаг после добавления в историю
                }

                displayField.value = '';
                lastInput = '';
                inputType = 'number';
                decimal = false;
            } else if (target.innerText === '←') {
                lastInput = lastInput.slice(0, -1);

                displayField.value = lastInput;
                decimal = /\.\d*$/.test(lastInput); // Проверяем наличие точки
            } else if (target.dataset.value === '=') {
                if(displayField.value && !operationCompleted) {
                    try {
                        lastInput = eval(lastInput).toString();
                        displayField.value = lastInput;
                        operationCompleted = true;
                    } catch (e) {
                        console.log('Calculation Error!', e);
                    }
                }
            } else if (target.dataset.value && target.dataset.value.match(/[0-9]$/)) {
                lastInput += target.innerHTML;
                displayField.value = lastInput;
                inputType = 'number';
                console.log('Last Input: ', lastInput);
            } else if (target.dataset.value === '.' && inputType === 'number' && !decimal && displayField.value.trim().length > 0) {
                lastInput += target.innerHTML;
                displayField.value = lastInput;
                decimal = true;
                inputType = 'operator';
            } else if (target.dataset.value === '-' && lastInput === '') {
                lastInput += '-';
                displayField.value = lastInput;
                inputType = 'number';
            } else if (target.dataset.value && target.dataset.value.match(/[\+\*\-%\/]/) && lastInput.match(/[0-9\)]$/) && !operationCompleted) {
                lastInput += ' ' + target.dataset.value + ' ';
                displayField.value = lastInput;
                inputType = 'operator';
                decimal = false;
            } else if (target.dataset.value === 'sin()') {
                if(lastInput !== '') {
                    const degrees = parseFloat(lastInput);
                    const radians = degrees * Math.PI / 180;
                    const mathResult = Math.sin(radians);
                    lastInput = mathResult.toFixed(1);
                    displayField.value = lastInput;
                    operationCompleted = false;
                }
            } else if (target.dataset.value === 'cos()') {
                if(lastInput !== '') {
                    const degrees = parseFloat(lastInput);
                    const radians = degrees * Math.PI / 180;
                    const mathResult = Math.cos(radians);
                    lastInput = mathResult.toFixed(1);
                    displayField.value = lastInput;
                    operationCompleted = false;
                }
            } else if (target.dataset.value === 'tan()') {
                if(lastInput !== '') {
                    const degrees = parseFloat(lastInput);
                    const radians = degrees * Math.PI / 180;
                    const mathResult = Math.tan(radians);
                    lastInput = mathResult.toFixed(1);
                    displayField.value = lastInput;
                    operationCompleted = false;
                }
            } else if (target.dataset.value === 'asin()') {
                if(lastInput !== '') {
                    const value = parseFloat(lastInput);
                    if (value >= -1 && value <= 1) {
                        const radians = Math.asin(value);
                        const degrees = radians * 180 / Math.PI;
                        lastInput = degrees.toFixed(1); 
                        displayField.value = lastInput;
                        operationCompleted = false;
                    }
                }
            } else if (target.dataset.value === 'acos()') {
                if(lastInput !== '') {
                    const value = parseFloat(lastInput);
                    if (value >= -1 && value <= 1) {
                        const radians = Math.acos(value);
                        const degrees = radians * 180 / Math.PI;
                        lastInput = degrees.toFixed(10); // Округляем до 10 знаков после запятой
                        displayField.value = lastInput;
                        operationCompleted = false;
                    }
                }
            } else if (target.dataset.value === 'atan()') {
                if(lastInput !== '') {
                    const value = parseFloat(lastInput);
                    if (value >= -1 && value <= 1) {
                        const radians = Math.atan(value);
                        const degrees = radians * 180 / Math.PI;
                        lastInput = degrees.toFixed(10); // Округляем до 10 знаков после запятой
                        displayField.value = lastInput;
                        operationCompleted = false;
                    }
                }
            } else if (target.dataset.value === 'log()') {
                if(lastInput !== '') {
                    const mathResult = Math.log(parseFloat(lastInput)).toFixed(10);
                    lastInput = mathResult;
                    displayField.value = lastInput;
                    operationCompleted = false;
                }
            } else if (target.dataset.value === 'ln()') {
                if(lastInput !== '') {
                    const mathResult = Math.log(parseFloat(lastInput)).toFixed(10);
                    lastInput = mathResult;
                    displayField.value = lastInput;
                    operationCompleted = false;
                }
            } else if (target.dataset.value === 'sqrt()') {
                if(lastInput !== '') {
                    const mathResult = Math.sqrt(parseFloat(lastInput));
                    lastInput = mathResult;
                    displayField.value = lastInput;
                    operationCompleted = false;
                }
            } else if (target.dataset.value === 'pi()') {
                const piResult = Math.PI.toFixed(10);
                lastInput += piResult;
                displayField.value += lastInput;
                operationCompleted = false;
            } else if (target.dataset.value === 'e()') {
                const eValue = Math.E.toFixed(10); 
                lastInput += eValue; 
                displayField.value += lastInput;
                operationCompleted = false; 
            } else if (target.dataset.value === 'exp()') {
                const expValue = Math.exp(parseFloat(lastInput)).toFixed(10);
                lastInput = expValue; 
                displayField.value = lastInput;
                operationCompleted = false; 
            } else if (target.dataset.value === 'abs()') {
                if (lastInput !== '') {
                    const absValue = Math.abs(parseFloat(lastInput));
                    lastInput = absValue; 
                    displayField.value = lastInput;
                    operationCompleted = false; 
                }
            } else if (target.dataset.value === 'cbrt()') {
                if (lastInput !== '') {
                    const cbrtValue = Math.cbrt(parseFloat(lastInput));
                    lastInput = cbrtValue; 
                    displayField.value = lastInput;
                    operationCompleted = false; 
                }
            } else if (target.dataset.value === 'deg()') {
                if (lastInput !== '') {
                    const degValue = (parseFloat(lastInput) * 180 / Math.PI).toFixed(10);
                    lastInput = degValue;
                    displayField.value = lastInput;
                    operationCompleted = false;
                }
            } else if (target.dataset.value === 'rad()') {
                if (lastInput !== '') {
                    const radValue = (parseFloat(lastInput) * Math.PI / 180).toFixed(10);
                    lastInput = radValue;
                    displayField.value = lastInput;
                    operationCompleted = false;
                }
            } else if (target.dataset.value === 'leftBracket()') {
                lastInput += '(';
                displayField.value = lastInput;
                decimal = false;
            } else if (target.dataset.value === 'rightBracket()') {
                lastInput += ')';
                displayField.value = lastInput;
                decimal = false;
            }
        });
    });
});