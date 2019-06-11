// Create an array that holds all of your cards and maps them with HTML format to the Deck
let symbols = ["fa-diamond", "fa-paper-plane-o", "fa-anchor", "fa fa-bolt", "fa fa-cube", "fa fa-leaf", "fa fa-bicycle", "fa fa-bomb"];
const cardDeck = [...symbols, ...symbols];
let cardDisplay = cardDeck.map(card => `<li class="card" data-card="${card}"><i class="fa ${card} fa-2x"></i></li>`);
let deckClass = document.querySelector('.deck');


// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
// Declaration of all global variables for the game setup 
let restartButton = document.querySelector('.restart').addEventListener('click', restart);
let movesCounter = document.querySelector('.moves');
let rating = document.querySelector('starts');
let timer = document.querySelector('.timer');
let time = 0;
let moves = 0;
let timerRunning = false;
let matchedCards = [];
let cardInPlay = null;
let flippedCards = [];
let cardsInPlay = [];
let checkDoubleClick = [];

// Upon clicking the restart button game is rest, including emptying all game play arrays 
function restart(event) {
  if (event.type == 'click')
    matchedCards = [];
  cardInPlay = null;
  flippedCards = [];
  cardsInPlay = [];
  checkDoubleClick = [];
  // Call functions to clear the timer using clearInterval and to start the game
  clearInterval();
  startGame();
}

function startGame() {
  // Cards shuffled using shuffle function
  shuffle(cardDisplay);
  // Show all cards for one second and then hide all cards
  deckClass.innerHTML = cardDisplay.join(' ');
  let allCards = document.querySelectorAll('.card');
  for (let card of allCards) {
    card.classList.add('open', 'show');
  }
  setTimeout(function () {
    for (let card of allCards) {
      card.classList.remove('open', 'show');
    }
  }, 1000);
  // Once cards are in place, the panel is reset
  resetPanel();
}

// Resetting of all score panel stats and notice to start game!
function resetPanel() {
  moves = 0;
  movesCounter.textContent = moves;
  time = 0;
  timerRunning = true;
  timer.textContent = "00:00";
  gameStatus.textContent = "START GAME!";
  // Call function to start the timer
  startTimer();
}

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
// Declaration of all global variables for the game play, score stats and end of game
let allCards = document.querySelectorAll('.card');
let deck = document.querySelector('.deck').addEventListener('click', playGame);
let gameStatus = document.querySelector('.game-status');
let stars = document.querySelector('.stars');
let star = '<i class="fa fa-star"></i>';
// setInterval in hundreds of a second for greater time accuracy.
let timeClock = setInterval(startTimer, 10);
let winMoves = document.querySelector('.win-moves');
let winStars = document.querySelector('.win-stars');
let winTime = document.querySelector('.win-time');

// Once a card is clicked (therefore nodeElement "LI" check) the gamer begins.
function playGame(event) {
  // Game status update and all 5 stars added to score panel
  gameStatus.textContent = "GAME ON!";
  stars.innerHTML = star.repeat(5);
  let cardInPlay = event.target;
  // Check that card is not already turned over, then continue.
  if (cardInPlay.classList.contains('show')) {
    nodeElement = 0;
  } else {
    nodeElement = cardInPlay.tagName;
  }

  if (nodeElement === "LI") {
    /* If click is a card ("LI") then number of moves and star counter both activated.
    Also, card added to flipped cards array for checking match */
    moves++;
    starCounter(moves);
    let flippedCard = cardInPlay.dataset.card;
    movesCounter.textContent = moves;
    flippedCards.push(flippedCard);
    cardsInPlay.push(cardInPlay);
  }
  // Process for checking if cards match or not using switch
  switch (cardsInPlay.length) {

    case 1: cardsInPlay[0].classList.add('open', 'show'); break;

    case 2: cardsInPlay[1].classList.add('open', 'show');

      switch (true) {

        case flippedCards[0] == flippedCards[1]:
          setTimeout(function cardsMatch() {
            cardsInPlay[0].classList.add('match');
            cardsInPlay[1].classList.add('match');
            matchedCards.push(flippedCards[0], flippedCards[1]);
            cardsInPlay = [];
            flippedCards = [];
            // End game check after each successful match 
            endGame(matchedCards);
          }, 1000);
          break;

        case flippedCards[0] === flippedCards[1]:
          setTimeout(function cardsNotMatch() {
            cardsInPlay[0].classList.remove('open', 'show');
            cardsInPlay[1].classList.remove('open', 'show');
            cardsInPlay = [];
            flippedCards = [];
          }, 1000);
          break;

        case flippedCards[0] != flippedCards[1]:
          setTimeout(function cardsNotMatch() {
            cardsInPlay[0].classList.remove('open', 'show');
            cardsInPlay[1].classList.remove('open', 'show');
            cardsInPlay = [];
            flippedCards = [];
          }, 1000);
      }
  }
}

// Number of stars to start is 5 which then decreases as number of moves goes past 20.
function starCounter(moves) {
  if (moves >= 20 && moves <= 30) {
    // stars.innerHTML.remove();
    stars.innerHTML = star.repeat(4);
  } else if (moves >= 31 && moves <= 40) {
    // stars.innerHTML.remove();
    stars.innerHTML = star.repeat(3);
  } else if (moves >= 41 && moves <= 50) {
    // stars.innerHTML.remove();
    stars.innerHTML = star.repeat(2);
  } else if (moves >= 51) {
    // stars.innerHTML.remove();
    stars.innerHTML = star.repeat(1);
  } else {
    // stars.innerHTML.remove();
    stars.innerHTML = star.repeat(5);

  }
}

// If all cards are matched function stops clock, changes game status and launches game end modal.
function endGame(matchedCards) {
  console.log(matchedCards.length);
  console.log(matchedCards.length == 16);
  if (matchedCards.length == 16) {
    stopClock();
    gameStatus.textContent = "GAME WON!";
    gameModal();
  }
}

// Stop clock function clears the timeClock setInterval variable 
function stopClock() {
  clearInterval(timeClock);
  timerRunning = false;
}

// Timer function uses Window setInterval function (API) to calulate seconds and minutes
function startTimer() {
  time++;
  let mins = Math.floor(time / 100 / 60);
  let secs = Math.floor(time / 100) - (mins * 60);
  mins.toFixed(2);
  secs.toFixed(2);
  if (mins < 10) {
    mins = `0${mins}`;
  }
  if (secs < 10) {
    secs = `0${secs}`;
  }
  timer.textContent = `${mins}:${secs}`;
}

// end of gamer modal launches modal with final game scores
function gameModal() {
  $("#myModal").modal();
  winMoves.innerHTML = movesCounter.innerHTML;
  winTime.innerHTML = timer.innerHTML;
  winStars.innerHTML = stars.innerHTML;
  console.log(winTime, winMoves, winStars);
}

// Game started eah time browser window refreshes
startGame();
