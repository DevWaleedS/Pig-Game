'use strict';

// select all element fro html
const play0El = document.querySelector('.player--0');
const play1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

// Declare initial variables
let scores, currentScore, activePlayer, playing;

// Create the initial function
const init = () => {
  score0El.textContent = 0;
  score1El.textContent = 0;

  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  diceEl.classList.add('hidden');
  play0El.classList.remove('player--winner');
  play1El.classList.remove('player--winner');
  play0El.classList.add('player--active');
  play1El.classList.remove('player--active');
};
init();

// Create Switch Player Function
const switchPlayer = () => {
  // reset the current score to zero
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore;
  activePlayer = activePlayer === 0 ? 1 : 0;

  // to change active class to the active player
  play0El.classList.toggle('player--active');
  play1El.classList.toggle('player--active');
};

// 1- Create user rolls dice function
btnRoll.addEventListener('click', () => {
  if (playing) {
    // 1. Generate the random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    // 2. display dice roll
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    // 3. check if the rolled = 1 or not
    if (dice !== 1) {
      // add dice to current score
      currentScore += dice;

      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // Switch to the next Player
      switchPlayer();
    }
  }
});

// 2- Create user hold score function
btnHold.addEventListener('click', () => {
  if (playing) {
    // 1. add current score to total score
    scores[activePlayer] += currentScore;

    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // 2. check is score >= 100
    if (scores[activePlayer] >= 100) {
      // The current player is wins
      playing = false;

      // add player winner class to the winner player element and remove active class

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      diceEl.classList.add('hidden');
    } else {
      // Switch to the next Player
      switchPlayer();
    }
  }
});

// 3- Create reset game function
btnNew.addEventListener('click', init);
