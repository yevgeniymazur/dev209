const board = document.getElementById('game-board');
const message = document.getElementById('message');
const movesDisplay = document.getElementById('moves');

const symbols = ['🍎', '🍌', '🍇', '🍊', '🍓', '🍍', '🥝', '🍒'];
let cards = [...symbols, ...symbols]; // duplicate for matching pairs
let flipped = [];
let matched = [];
let moves = 0;

// ES6 feature: arrow functions, let/const, spread operator

// Functional programming: shuffle is pure, takes input and returns output without side effects
const shuffle = (array) =>
  array.sort(() => Math.random() - 0.5);

// DOM manipulation: create card elements dynamically
function createBoard() {
  board.innerHTML = '';
  shuffle(cards).forEach((symbol, index) => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.symbol = symbol;
    card.dataset.index = index;
    card.addEventListener('click', flipCard); // Event listener
    board.appendChild(card);
  });
}

// Event handler: flipCard
function flipCard(e) {
  const clickedCard = e.target;
  const index = clickedCard.dataset.index;

  if (flipped.includes(index) || matched.includes(clickedCard.dataset.symbol)) return;

  clickedCard.classList.add('flipped');
  clickedCard.textContent = clickedCard.dataset.symbol;
  flipped.push(index);

  if (flipped.length === 2) {
    moves++;
    movesDisplay.textContent = `Moves: ${moves}`;
    checkMatch();
  }
}

// Game logic: matching cards
function checkMatch() {
  const [i1, i2] = flipped;
  const c1 = board.children[i1];
  const c2 = board.children[i2];

  if (c1.dataset.symbol === c2.dataset.symbol) {
    c1.classList.add('matched');
    c2.classList.add('matched');
    matched.push(c1.dataset.symbol);

    if (matched.length === symbols.length) {
      message.textContent = `🎉 Game Over! You won in ${moves} moves.`;
    }
  } else {
    setTimeout(() => {
      c1.classList.remove('flipped');
      c2.classList.remove('flipped');
      c1.textContent = '';
      c2.textContent = '';
    }, 1000);
  }

  flipped = [];
}

createBoard();
