const board = document.getElementById('game-board');
const message = document.getElementById('message');
const movesDisplay = document.getElementById('moves');
const restartBtn = document.getElementById('restart');
const difficultySelect = document.getElementById('difficulty');

const symbolBank = ['⛏️', '🪓', '🧱', '🔥', '🌲', '🟩', '💎', '🐷', '👾', '🌋', '🧊', '🍖', '🌑', '🪨', '📦', '🧠', '🕹️', '🐺', '🪵', '⚒️', '🧟', '👻', '🌾', '🪙', '🐔', '🎮'];


let cards = [];
let flipped = [];
let matched = [];
let moves = 0;
let gridSize = 4;

const themeToggle = document.getElementById('theme-toggle');
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('minecraft');
});

// Shuffle function (Functional programming)
const shuffle = (array) => array.sort(() => Math.random() - 0.5);

// Create board
function createBoard() {
  board.innerHTML = '';
  board.style.gridTemplateColumns = `repeat(${gridSize}, 100px)`;
  board.style.gridTemplateRows = `repeat(${gridSize}, 100px)`;

  const pairCount = (gridSize * gridSize) / 2;
  const symbols = shuffle([...symbolBank]).slice(0, pairCount);
  cards = shuffle([...symbols, ...symbols]);

  cards.forEach((symbol, index) => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.symbol = symbol;
    card.dataset.index = index;
    card.addEventListener('click', flipCard);
    board.appendChild(card);
  });
}

function flipCard(e) {
  const clickedCard = e.target;
  const index = clickedCard.dataset.index;

  if (flipped.includes(index) || clickedCard.classList.contains('matched')) return;

  clickedCard.classList.add('flipped');
  clickedCard.textContent = clickedCard.dataset.symbol;
  flipped.push(index);

  if (flipped.length === 2) {
    moves++;
    movesDisplay.textContent = `Moves: ${moves}`;
    checkMatch();
  }
}

function checkMatch() {
  const [i1, i2] = flipped;
  const c1 = board.children[i1];
  const c2 = board.children[i2];

  if (c1.dataset.symbol === c2.dataset.symbol) {
    c1.classList.add('matched');
    c2.classList.add('matched');
    matched.push(c1.dataset.symbol);

    if (matched.length === cards.length / 2) {
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

function resetGame() {
  moves = 0;
  flipped = [];
  matched = [];
  movesDisplay.textContent = `Moves: 0`;
  message.textContent = '';

  // Get grid size from the dropdown (4, 6, or 8)
  gridSize = parseInt(difficultySelect.value);
  
  // Calculate total cards
  let totalCards = gridSize * gridSize;

  // ✅ Ensure totalCards is even so we can create pairs
  if (totalCards % 2 !== 0) totalCards--; // If it's odd, reduce by 1

  // Set the board's CSS grid style
  board.style.gridTemplateColumns = `repeat(${gridSize}, 100px)`;
  board.style.gridTemplateRows = `repeat(${gridSize}, 100px)`;

  // ✅ Select just enough symbols for the number of pairs needed
  const pairCount = totalCards / 2;
  const symbols = shuffle([...symbolBank]).slice(0, pairCount);

  // ✅ Duplicate symbols for pairs and shuffle them
  cards = shuffle([...symbols, ...symbols]);

  // ✅ Clear board and create card elements
  board.innerHTML = '';
  cards.forEach((symbol, index) => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.symbol = symbol;
    card.dataset.index = index;
    card.addEventListener('click', flipCard);
    board.appendChild(card);
  });

  // ✅ If totalCards is less than full grid (e.g., 25 in 5x5), fill the last square with a hidden dummy card
  const remainingSpots = (gridSize * gridSize) - cards.length;
  for (let i = 0; i < remainingSpots; i++) {
    const dummy = document.createElement('div');
    dummy.classList.add('card');
    dummy.style.visibility = 'hidden'; // Makes it invisible but keeps spacing
    board.appendChild(dummy);
  }
}

