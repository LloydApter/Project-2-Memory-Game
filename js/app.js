/*
 * Create a list that holds all of your cards
 */
let cardDeck = [
    'fa-diamond', 'fa-diamond',
    'fa-paper-plane-o', 'fa-paper-plane-o',
    'fa-anchor', 'fa-anchor',
    'fa-bolt', 'fa-bolt',
    'fa-cube', 'fa-cube',
    'fa-leaf', 'fa-leaf',
    'fa-bicycle', 'fa-bicycle',
    'fa-bomb', 'fa-bomb'
                 ];

let cardDisplay = cardDeck.map(card => `<li class="card" data-card="${card}"><i class="fa ${card}"></i></li>`);
let deckClass = document.querySelector('.deck');


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

let restartButton = document.querySelector('.restart').addEventListener('click', restart);
let moves = 0;
let movesCounter = document.querySelector('.moves');
let rating = document.querySelector('starts');

function restart (event) {
if ( event.type == 'click' )
startGame();
moves = 0;
movesCounter.textContent = moves;
}


 function startGame () {

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
      
      let shuffledCards = shuffle(cardDisplay);
      deckClass.innerHTML = cardDisplay.join(' ');

 }
 

 startGame();


 

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

let deck = document.querySelector('.deck').addEventListener('click', playGame);
let gameOver = document.querySelector('.game-over');
let stars = document.querySelector('.stars');
let star = '<li><i class="fa fa-star"></i></li>';
let cardInPlay = null;
let flippedCards = [];
let cardsInPlay = [];
let matchedCards = [];
moves = 0;

function playGame(event)  {
  
  let cardInPlay = event.target;
  let flippedCard = cardInPlay.dataset.card; 
  moves++;
  movesCounter.textContent = moves;
  flippedCards.push(flippedCard);
  cardsInPlay.push(cardInPlay);
  

  switch (cardsInPlay.length) {
  
  case 1: cardsInPlay[0].classList.add('open', 'show'); break;

  case 2: cardsInPlay[1].classList.add('open', 'show');

      switch (true) {
    
      case flippedCards[0] == flippedCards[1]: 
      //setTimeout (function cardsMatch() {
      cardsInPlay[0].classList.add('match');
      cardsInPlay[1].classList.add('match'); 
      matchedCards.push(flippedCards[0], flippedCards[1]);
      cardsInPlay = [];
      flippedCards = [];
       //}, 1000);
       
            switch(true) {

            case matchedCards.length == 16 && moves < 30:
            gameOver.style.display = 'inline'; 
            stars.innerHTML = star.repeat(5);
            break;
            case matchedCards.length == 16 && moves < 40:
            gameOver.style.display = 'inline'; 
            stars.innerHTML = star.repeat(4);
            break;
            case matchedCards.length == 16 && moves < 50:
            gameOver.style.display = 'inline'; 
            stars.innerHTML = star.repeat(3);
            break;
            case matchedCards.length == 16 && moves < 60:
            gameOver.style.display = 'inline'; 
            stars.innerHTML = star.repeat(2);
            break;
            case matchedCards.length == 16 && moves < 70:
            gameOver.style.display = 'inline'; 
            stars.innerHTML = star.repeat(1);
            break;
    } break;

      case flippedCards[0] != flippedCards[1]:
        setTimeout (function cardsNotMatch() {
        cardsInPlay[0].classList.remove('open', 'show');
        cardsInPlay[1].classList.remove('open', 'show');
        cardsInPlay = [];
        flippedCards = [];
      }, 1000);
      break;
  }  
 }
}