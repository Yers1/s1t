function performOperation() {
    let num1 = document.getElementById('input1').value;
    let num2 = document.getElementById('input2').value;

    debugger;

    let number1 = parseFloat(num1);
    let number2 = parseFloat(num2);

    if (!isNaN(number1) && !isNaN(number2)) {
        let addition = number1 + number2;
        debugger;

        let multiplication = number1 * number2;
        debugger;

        let division;
        if (number2 !== 0) {
            division = number1 / number2;
        } else {
            division = "Cannot divide by zero!";
        }

        let resultText = `
            Addition: ${addition}
            Multiplication: ${multiplication}
            Division: ${division}
        `;

        displayResult(resultText);
    } else {
        displayResult("Please enter valid numeric values.");
    }
}

function displayResult(result) {
    const resultElement = document.getElementById('result');
    resultElement.textContent = result;
}
