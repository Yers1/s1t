const colors = ['red', 'blue', 'green', 'purple', 'orange', 'pink'];
let cards = [];
let selectedCards = [];
let score = 0;
let timeLeft = 30;
let gameInterval;

const startbtn = document.getElementById('startbtn');
const gameContainer = document.getElementById('game-container');
const scoreElement = document.getElementById('score');
const timerElement = document.getElementById('timer');

// Shuffle array
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Generate cards
function generateCards() {
    for (const color of cards) {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.color = color;
        card.textContent = '?';
        gameContainer.appendChild(card);
    }
}

// Check if two selected cards match
function checkMatch() {
    const [card1, card2] = selectedCards;

    if (card1.dataset.color === card2.dataset.color) {
        card1.classList.add('matched');
        card2.classList.add('matched');
        score += 10;
        scoreElement.textContent = `Score: ${score}`;
    } else {
        card1.textContent = '?';
        card1.style.backgroundColor = '#ddd';
        card2.textContent = '?';
        card2.style.backgroundColor = '#ddd';
    }

    selectedCards = [];

    // Check if game won
    const allMatched = document.querySelectorAll('.matched').length === cards.length;
    if (allMatched) {
        clearInterval(gameInterval);
        alert('You win! 🎉');
        startbtn.disabled = false;
    }
}

// Handle card click
function handleCardClick(event) {
    const card = event.target;
    if (!card.classList.contains('card') || card.classList.contains('matched')) {
        return;
    }

    // Prevent clicking same card twice
    if (selectedCards.includes(card)) return;

    card.textContent = card.dataset.color;
    card.style.backgroundColor = card.dataset.color;
    selectedCards.push(card);

    if (selectedCards.length === 2) {
        setTimeout(checkMatch, 600);
    }
}

// Start the timer
function startGameTimer() {
    clearInterval(gameInterval);
    timerElement.textContent = `Time Left: ${timeLeft}`;
    gameInterval = setInterval(() => {
        timeLeft--;
        timerElement.textContent = `Time Left: ${timeLeft}`;

        if (timeLeft <= 0) {
            clearInterval(gameInterval);
            alert('Game Over! ⏰');
            startbtn.disabled = false;
        }
    }, 1000);
}

// Start the game
function startGame() {
    clearInterval(gameInterval);
    gameContainer.innerHTML = '';
    selectedCards = [];
    score = 0;
    timeLeft = 30;
    scoreElement.textContent = `Score: ${score}`;
    startbtn.disabled = true;

    cards = shuffle(colors.concat(colors)); // Duplicate and shuffle
    generateCards();
    startGameTimer();

    gameContainer.removeEventListener('click', handleCardClick);
    gameContainer.addEventListener('click', handleCardClick);
}

startbtn.addEventListener('click', startGame);
