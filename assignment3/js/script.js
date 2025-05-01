const board = document.getElementById('game-board');
const message = document.getElementById('message');
const movesDisplay = document.getElementById('moves');
const restartBtn = document.getElementById('restart');
const difficultyRadios = document.querySelectorAll('input[name="difficulty"]');

const symbolBank = [
  '⛏️', '🪓', '🧱', '🔥', '🌲', '🟩', '💎', '🐷',
  '👾', '🌋', '🧊', '🍖', '🌑', '🪨', '📦', '🧠',
  '🕹️', '🐺', '🪵', '⚒️', '🧟', '👻', '🌾', '🪙',
  '🐔', '🎮', '📡', '💣', '🔩', '🧪', '🧬', '🧤'
];

let cards = [];
let flipped = [];
let matched = [];
let moves = 0;
let gridSize = 4;

const shuffle = (array) => array.sort(() => Math.random() - 0.5);

function createBoard() {
  board.innerHTML = '';
  board.style.gridTemplateColumns = `repeat(${gridSize}, 100px)`;
  board.style.gridTemplateRows = `repeat(${gridSize}, 100px)`;

  let totalCards = gridSize * gridSize;
  if (totalCards % 2 !== 0) totalCards--;

  const pairCount = totalCards / 2;
  const symbols = shuffle([...symbolBank]).slice(0, pairCount);
  cards = shuffle([...symbols, ...symbols]);

  cards.forEach((symbol, index) => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.symbol = symbol;
    card.dataset.index = index;
    card.textContent = ''; // initially hidden
    card.addEventListener('click', flipCard);
    board.appendChild(card);
  });

  // Fill any remaining spots with hidden dummy cards (e.g., for odd-sized grids)
  const missing = (gridSize * gridSize) - cards.length;
  for (let i = 0; i < missing; i++) {
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

  const selectedRadio = [...difficultyRadios].find(r => r.checked);
  gridSize = parseInt(selectedRadio.value);

  createBoard();
}

restartBtn.addEventListener('click', resetGame);
difficultyRadios.forEach(radio => radio.addEventListener('change', resetGame));

resetGame();


