// DOM Elements
const board = document.getElementById('game-board');
const message = document.getElementById('message');
const movesDisplay = document.getElementById('moves');
const timerDisplay = document.getElementById('timer');
const restartBtn = document.getElementById('restart');
const difficultyRadios = document.querySelectorAll('input[name="difficulty"]');

// Sounds
const flipSound = new Audio('sounds/flip.mp3');
const matchSound = new Audio('sounds/match.mp3');
const mismatchSound = new Audio('sounds/mismatch.mp3');

// Symbols
const symbolBank = [/* same list */ '⛏️','🪓','🧱','🔥','🌲','🟩','💎','🐷','👾','🌋','🧊','🍖','🌑','🪨','📦','🧠','🕹️','🐺','🪵','⚒️','🧟','👻','🌾','🪙','🐔','🎮','📡','💣','🔩','🧪','🧬','🧤'];

// Game variables
let cards = [];
let flipped = [];
let matched = [];
let moves = 0;
let gridSize = 4;
let timerInterval = null;
let secondsElapsed = 0;
let sessionKey = `game-state-${Date.now()}`; // Unique per tab
sessionStorage.setItem('sessionKey', sessionKey);

// Total move counter (localStorage across all tabs)
function incrementGlobalMoves() {
  let total = parseInt(localStorage.getItem('totalMoves') || '0');
  localStorage.setItem('totalMoves', total + 1);
}

// Global move sync listener
window.addEventListener('storage', (e) => {
  if (e.key === 'totalMoves') {
    console.log(`🔁 Total moves across tabs: ${e.newValue}`);
  }
});

// Pure shuffle function
const shuffle = (array) => array.sort(() => Math.random() - 0.5);

function saveState() {
  const state = {
    cards,
    flipped,
    matched,
    moves,
    secondsElapsed,
    gridSize
  };
  sessionStorage.setItem(sessionKey, JSON.stringify(state));
}

function loadState() {
  const saved = sessionStorage.getItem(sessionKey);
  if (!saved) return false;

  const state = JSON.parse(saved);
  cards = state.cards;
  flipped = state.flipped;
  matched = state.matched;
  moves = state.moves;
  secondsElapsed = state.secondsElapsed;
  gridSize = state.gridSize;

  return true;
}

function createBoard() {
  board.innerHTML = '';
  board.style.gridTemplateColumns = `repeat(${gridSize}, 100px)`;
  board.style.gridAutoRows = '100px';

  cards.forEach((symbol, index) => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.symbol = symbol;
    card.dataset.index = index;

    if (matched.includes(symbol)) {
      card.classList.add('matched');
      card.textContent = symbol;
    } else if (flipped.includes(index.toString())) {
      card.classList.add('flipped');
      card.textContent = symbol;
    } else {
      card.textContent = '';
    }

    card.addEventListener('click', flipCard);
    board.appendChild(card);
  });
}

function flipCard(e) {
  const card = e.target;
  const index = card.dataset.index;

  if (flipped.includes(index) || card.classList.contains('matched')) return;

  card.classList.add('flipped');
  card.textContent = card.dataset.symbol;
  flipSound.currentTime = 0;
  flipSound.play();

  flipped.push(index);

  if (flipped.length === 2) {
    moves++;
    movesDisplay.textContent = `Moves: ${moves}`;
    incrementGlobalMoves();
    checkMatch();
  }

  saveState();
}

function checkMatch() {
  const [i1, i2] = flipped;
  const c1 = board.children[i1];
  const c2 = board.children[i2];

  if (c1.dataset.symbol === c2.dataset.symbol) {
    c1.classList.add('matched');
    c2.classList.add('matched');
    matched.push(c1.dataset.symbol);
    matchSound.currentTime = 0;
    matchSound.play();

    if (matched.length === cards.length / 2) {
      stopTimer();
      message.textContent = `🎉 Game Over! You won in ${moves} moves and ${formatTime(secondsElapsed)}.`;
    }

    flipped = [];
    saveState();
  } else {
    mismatchSound.currentTime = 0;
    mismatchSound.play();

    // ⏳ Let second card render visibly before flipping both back
    setTimeout(() => {
      c1.classList.remove('flipped');
      c2.classList.remove('flipped');
      c1.textContent = '';
      c2.textContent = '';
      flipped = [];
      saveState();
    }, 300);
  }
}



function resetGame() {
  flipped = [];
  matched = [];
  moves = 0;
  secondsElapsed = 0;
  message.textContent = '';
  stopTimer();

  const selectedRadio = [...difficultyRadios].find(r => r.checked);
  gridSize = parseInt(selectedRadio.value);
  const totalCards = gridSize * gridSize;
  const pairCount = Math.floor(totalCards / 2);
  const symbols = shuffle([...symbolBank]).slice(0, pairCount);
  cards = shuffle([...symbols, ...symbols]);

  createBoard();
  movesDisplay.textContent = `Moves: ${moves}`;
  updateTimerDisplay();
  saveState();
  startTimer();
}

function startTimer() {
  clearInterval(timerInterval);
  timerInterval = setInterval(() => {
    secondsElapsed++;
    updateTimerDisplay();
    saveState();
  }, 1000);
}

function stopTimer() {
  clearInterval(timerInterval);
}

function updateTimerDisplay() {
  timerDisplay.textContent = `Time: ${formatTime(secondsElapsed)}`;
}

function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

// Event listeners
restartBtn.addEventListener('click', resetGame);
difficultyRadios.forEach(radio => radio.addEventListener('change', resetGame));

// 🔁 Restore state or start fresh
if (!loadState()) {
  resetGame();
} else {
  createBoard();
  movesDisplay.textContent = `Moves: ${moves}`;
  updateTimerDisplay();
  startTimer();
}
