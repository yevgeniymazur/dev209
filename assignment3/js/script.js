// DOM Elements
const board = document.getElementById('game-board');
const message = document.getElementById('message');
const movesDisplay = document.getElementById('moves');
const restartBtn = document.getElementById('restart');
const difficultyRadios = document.querySelectorAll('input[name="difficulty"]');

// Symbol bank using emojis (you can switch to images later)
const symbolBank = [
  '⛏️', '🪓', '🧱', '🔥', '🌲', '🟩', '💎', '🐷',
  '👾', '🌋', '🧊', '🍖', '🌑', '🪨', '📦', '🧠',
  '🕹️', '🐺', '🪵', '⚒️', '🧟', '👻', '🌾', '🪙',
  '🐔', '🎮', '📡', '💣', '🔩', '🧪', '🧬', '🧤'
];

// ✅ Sound Effects
const flipSound = new Audio('sounds/flip.mp3');
const matchSound = new Audio('sounds/match.mp3');
const mismatchSound = new Audio('sounds/mismatch.mp3');

let cards = [];
let flipped = [];
let matched = [];
let moves = 0;
let gridSize = 4;

// ✅ Functional Programming Example (pure shuffle function)
const shuffle = (array) => array.sort(() => Math.random() - 0.5);

function createBoard() {
  board.innerHTML = '';
  board.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;
  board.style.gridTemplateRows = `repeat(${gridSize}, 1fr)`;

  let totalCards = gridSize * gridSize;
  if (totalCards % 2 !== 0) totalCards--;

  const pairCount = totalCards / 2;
  const symbols = shuffle([...symbolBank]).slice(0, pairCount);
  cards = shuffle([...symbols, ...symbols]);

  cards.forEach((symbol, index) => {
    // ✅ DOM Manipulation
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.symbol = symbol;
    card.dataset.index = index;
    card.textContent = ''; // start face down

    // ✅ Event Listener
    card.addEventListener('click', flipCard);
    board.appendChild(card);
  });


  const remaining = (gridSize * gridSize) - cards.length;
  for (let i = 0; i < remaining; i++) {
    const dummy = document.createElement('div');
    dummy.classList.add('card');
    dummy.style.visibility = 'hidden';
    board.appendChild(dummy);
  }
}

function flipCard(e) {
  const clickedCard = e.target;
  const index = clickedCard.dataset.index;

  if (flipped.includes(index) || clickedCard.classList.contains('matched')) return;

  clickedCard.classList.add('flipped');
  clickedCard.textContent = clickedCard.dataset.symbol;

  // ▶️ Flip Sound
  flipSound.currentTime = 0;
  flipSound.play();

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

    // ✅ Match Sound
    matchSound.currentTime = 0;
    matchSound.play();

    if (matched.length === cards.length / 2) {
      message.textContent = `🎉 Game Over! You won in ${moves} moves.`;
    }
  } else {
    // ❌ Mismatch Sound
    mismatchSound.currentTime = 0;
    mismatchSound.play();

    setTimeout(() => {
      c1.classList.remove('flipped');
      c2.classList.remove('flipped');
      c1.textContent = '';
      c2.textContent = '';
    }, 1000);
  }

  flipped = [];
}

// ✅ ES6 Arrow Function
const resetGame = () => {
  moves = 0;
  flipped = [];
  matched = [];
  movesDisplay.textContent = `Moves: 0`;
  message.textContent = '';

  const selectedRadio = [...difficultyRadios].find(r => r.checked);
  gridSize = parseInt(selectedRadio.value);

  createBoard();
};

// Start and reset event listeners
restartBtn.addEventListener('click', resetGame);
difficultyRadios.forEach(radio => radio.addEventListener('change', resetGame));

// Start game on load
resetGame();


