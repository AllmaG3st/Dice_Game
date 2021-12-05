'use strict';

// DECLARING VARIABLE

//Player
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const winner = document.querySelector(`.win--1`);

//Scores
const currentScore0El = document.getElementById('current--0');
const currentScore1El = document.getElementById('current--1');
const totalScores0El = document.getElementById('score--0');
const totalScores1El = document.getElementById('score--1');

//Dice
const dice = document.querySelector('.dice');
dice.classList.add('hidden');

//Buttons
const rollBtn = document.querySelector('.btn--roll');
const holdBtn = document.querySelector('.btn--hold');
const newBtn = document.querySelector('.btn--new');

//Initial Values

const winScore = 100;

let totalScores, gameInProgress, currentScore, activePlayer;
// let gameInProgress = true;
// let totalScores = [0, 0];
// totalScores0El.textContent = totalScores[0];
// totalScores1El.textContent = totalScores[1];
// let currentScore = 0;
// let activePlayer = 0;

// FUNCTIONS

const init = () => {
   gameInProgress = true;
   totalScores = [0, 0];
   currentScore = 0;
   activePlayer = 0;

   currentScore0El.textContent = 0;
   currentScore1El.textContent = 0;
   totalScores0El.textContent = 0;
   totalScores1El.textContent = 0;

   player0El.classList.remove('player--winner');
   player0El.classList.add('player--active');
   player1El.classList.remove('player--winner', 'player--active');
   dice.classList.add('hidden');

   winner.classList.add('hidden');
   winner.classList.add('hidden');
}
init();

//Get current score of active player
const getCurrentScore = (activePlayer) => {
   return document.getElementById(`current--${activePlayer}`)
}

//Change active Player
const changeActivePlayer = () => {
   activePlayer = activePlayer === 0 ? 1 : 0;
   player0El.classList.toggle('player--active');
   player1El.classList.toggle('player--active');
}
//roll the dice
const rollTheDice = () => {
   if (gameInProgress) {
      //Roll The number
      const rolledNum = Math.trunc(Math.random() * 6 + 1);

      //Show correct Dice the Dice
      dice.src = `./public/dice-${rolledNum}.png`
      dice.classList.remove('hidden');

      //Check number
      if (rolledNum === 1) {
         currentScore = 0;
         getCurrentScore(activePlayer).textContent = currentScore;
         changeActivePlayer();
      } else {
         console.log(activePlayer);
         currentScore += rolledNum;
         getCurrentScore(activePlayer).textContent = currentScore;
      }
   }
}

//hold the score
const holdTheScore = () => {
   if (gameInProgress && currentScore !== 0) {
      //Summarizing total score
      totalScores[activePlayer] += currentScore;
      //Checking if someone win
      if (totalScores[activePlayer] >= winScore) {
         document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
         document.querySelector(`.win--${activePlayer}`).classList.remove('hidden');
         gameInProgress = false;
      }
      currentScore = 0;
      getCurrentScore(activePlayer).textContent = currentScore;
      document.getElementById(`score--${activePlayer}`).textContent = totalScores[activePlayer];
      changeActivePlayer();
   }
}

//reset the game

const restartTheGame = () => {
   init();
}

// EventListeners

rollBtn.addEventListener('click', rollTheDice);
holdBtn.addEventListener('click', holdTheScore);
newBtn.addEventListener('click', restartTheGame);


