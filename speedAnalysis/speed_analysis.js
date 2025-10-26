let testText = "The quick brown fox jumps over the lazy dog.";
let startTime, endTime;

function startTest() {
    // Устанавливаем текст для теста
    document.getElementById("inputText").value = testText;

    // Сбрасываем пользовательский ввод и результаты
    const userInput = document.getElementById("userInput");
    userInput.value = "";
    userInput.readOnly = false;
    userInput.focus();

    document.getElementById("output").innerHTML = "";

    // Запускаем таймер
    startTime = new Date().getTime();
}

function endTest() {
    endTime = new Date().getTime();

    // Отключаем ввод
    document.getElementById("userInput").readOnly = true;

    const userTypedText = document.getElementById("userInput").value;
    const timeElapsed = (endTime - startTime) / 1000; // секунды

    // Подсчёт слов
    const typedWords = userTypedText.split(/\s+/).filter(word => word !== "").length;
    let wpm = 0;
    if (timeElapsed !== 0 && !isNaN(typedWords)) {
        wpm = Math.round((typedWords / timeElapsed) * 60);
    }

    // Подсчёт правильных символов и ошибок
    let correctChars = 0;
    for (let i = 0; i < userTypedText.length; i++) {
        if (userTypedText[i] === testText[i]) {
            correctChars++;
        }
    }

    const totalLength = userTypedText.length;
    const errors = totalLength - correctChars;
    const accuracy = totalLength > 0 ? ((correctChars / totalLength) * 100).toFixed(2) : 0;

    // Вывод результатов
    const outputDiv = document.getElementById("output");
    outputDiv.innerHTML = `
        <h2>Typing Test Results:</h2>
        <p><strong>Total Length:</strong> ${totalLength}</p>
        <p><strong>Correct Characters:</strong> ${correctChars}</p>
        <p><strong>Errors:</strong> ${errors}</p>
        <p><strong>Accuracy:</strong> ${accuracy}%</p>
        <p><strong>Words Typed:</strong> ${typedWords}</p>
        <p><strong>Time Elapsed:</strong> ${timeElapsed.toFixed(2)} seconds</p>
        <p><strong>Words Per Minute (WPM):</strong> ${wpm}</p>
    `;
}
