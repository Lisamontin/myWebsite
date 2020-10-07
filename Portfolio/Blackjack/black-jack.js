let cards = [
  {
    card: `🂡`,
    value: 1
  },
  {
    card: `🂢`,
    value: 2
  },
  {
    card: `🂣`,
    value: 3
  },
  {
    card: `🂤`,
    value: 4
  },
  {
    card: `🂥`,
    value: 5
  },
  {
    card: `🂦`,
    value: 6
  },
  {
    card: `🂧`,
    value: 7
  },
  {
    card: `🂨`,
    value: 8
  },
  {
    card: `🂩`,
    value: 9
  },
  {
    card: `🂪`,
    value: 10
  },
  {
    card: `🂫`,
    value: 10
  },
  {
    card: `🂭`,
    value: 10
  },
  {
    card: `🂮`,
    value: 10
  },
  {
    card: `🂱`,
    value: 1
  },
  {
    card: `🂲`,
    value: 2
  },
  {
    card: `🂳`,
    value: 3
  },
  {
    card: `🂴`,
    value: 4
  },
  {
    card: `🂵`,
    value: 5
  },
  {
    card: `🂶`,
    value: 6
  },
  {
    card: `🂷`,
    value: 7
  },
  {
    card: `🂸`,
    value: 8
  },
  {
    card: `🂹`,
    value: 9
  },
  {
    card: `🂺`,
    value: 10
  },
  {
    card: `🂻`,
    value: 10
  },
  {
    card: `🂽`,
    value: 10
  },
  {
    card: `🂾`,
    value: 10
  },
  {
    card: `🃁`,
    value: 1
  },
  {
    card: `🃂`,
    value: 2
  },
  {
    card: `🃃`,
    value: 3
  },
  {
    card: `🃄`,
    value: 4
  },
  {
    card: `🃅`,
    value: 5
  },
  {
    card: `🃆`,
    value: 6
  },
  {
    card: `🃇`,
    value: 7
  },
  {
    card: `🃈`,
    value: 8
  },
  {
    card: `🃉`,
    value: 9
  },
  {
    card: `🃊`,
    value: 10
  },
  {
    card: `🃋`,
    value: 10
  },
  {
    card: `🃍`,
    value: 10
  },
  {
    card: `🃎`,
    value: 10
  },
  {
    card: `🃑`,
    value: 1
  },
  {
    card: `🃒`,
    value: 2
  },
  {
    card: `🃓`,
    value: 3
  },
  {
    card: `🃔`,
    value: 4
  },
  {
    card: `🃕`,
    value: 5
  },
  {
    card: `🃖`,
    value: 6
  },
  {
    card: `🃗`,
    value: 7
  },
  {
    card: `🃘`,
    value: 8
  },
  {
    card: `🃙`,
    value: 9
  },
  {
    card: `🃚`,
    value: 10
  },
  {
    card: `🃛`,
    value: 10
  },
  {
    card: `🃝`,
    value: 10
  },
  {
    card: `🃞`,
    value: 10
  },

];

let deck = [];
let dealer = [];
let player = [];

let outputArea = document.getElementById("output-area");
let winnerArea = document.getElementById("winner-area");
let newGameButton = document.getElementById("new-game-button");
let hitButton = document.getElementById("hit-button");
let stayButton = document.getElementById("stay-button");

let playerScore;
let dealerScore;

hideGameButtons();

newGameButton.addEventListener('click', function() {startNewGame()});
hitButton.addEventListener('click', function() {dealAnotherCard(player); showHands(); });
stayButton.addEventListener('click', function() {
  hideGameButtons(); 
  while (dealerScore <= 16) { // modified to reflect initial deklaration of rules.
    dealAnotherCard(dealer);
    dealerScore = calculateHand(dealer);
  }
  showHands(true);
});

// Create a randomized array of cards from the cards array and assigns them to a new array called deck.
function shuffleDeck() {
  let pos,
      card;
  let tmpDeck = cards.slice();

  while (tmpDeck.length) {
    pos = Math.floor(Math.random()*tmpDeck.length);
    card = tmpDeck.splice(pos,1);
    deck.push(...card);
  }
}

// remove and return the first element from the deck array.
function drawCard() {
  return deck.shift();
}

// Add shifted elements from the card array to dealer and player arrays and display them in the output area.
function showHand(hand, score) {
  let cards = '';
  
  for(let i = 0; i < hand.length; i++) {
    cards += hand[i].card;
  }
  return `${cards} ${score}`
}

// Add starting cards to player and dealer arrays.
function dealInitialCards() {
  player.push(drawCard());
  player.push(drawCard());
  dealer.push(drawCard());
  dealer.push(drawCard());
  
  showHands();
}

// clear arrays, call functions to shuffle the deck and deal starting cards.
function startNewGame () {
  showGameButtons();

  deck = [];
  player = [];
  dealer = [];
  
  shuffleDeck();
  dealInitialCards();
}

// store and display the scores and the winner.
function showHands(stayed = false) {
  
  playerScore = calculateHand(player);
  dealerScore = calculateHand(dealer);
  
  clearTable();
  
  outputArea.innerHTML = `${showHand(dealer, dealerScore)}</br>${showHand(player, playerScore)}`;
  
  let winner = determineWinner(stayed); 
  
  if (winner !== '') {
    hideGameButtons();
  }
  winnerArea.innerHTML = winner;
}

// deal another card.
function dealAnotherCard(hand) {
 hand.push(drawCard());
}

// returns true if blackjack.
function hasBlackJack(hand, score) {
  if (hand.length === 2 && score === 21) {
    return true;
  } else {
    return false;
  }
}

// returns true if score is over 21
function isBust(score) {
  if (score > 21) {
    return true;
  }
}

// determines and returns the winner
function determineWinner(stayed) {
  const dealerWins = 'Dealer Wins!';
  const playerWins = 'You Win!';
  const draw = 'Draw';

  let dealerBJ = hasBlackJack(dealer, dealerScore);
  let playerBJ = hasBlackJack(player, playerScore);

  if (isBust(playerScore)) {
    return dealerWins;
  } else if (isBust(dealerScore)) {
    return playerWins;
  } else if (dealer.length === 5 && dealerScore <= 21){
    return dealerWins;
  } else if (stayed && dealerScore === playerScore) {
    return draw;
  } else if (stayed && playerScore > dealerScore) {
    return playerWins;
  } else if (stayed && dealerScore > playerScore) {
    return dealerWins;
  } else { 
    
    if (dealerBJ === true && playerBJ === true) {
      return draw;
    }
    if (playerBJ) {
      return playerWins;
    }
    if (dealerBJ) {
      return dealerWins;
    }
  }
  return ''; 
}

function showGameButtons() {
  newGameButton.style.display = "none";
  hitButton.style.display = "inline"
  stayButton.style.display = "inline"
}

function hideGameButtons() {
  newGameButton.style.display = "inline";
  hitButton.style.display = "none"
  stayButton.style.display = "none"
}

function clearTable() {
  outputArea.innerHTML = '';
}

// calculate the score.
function calculateHand(cards) {
  let score = 0;
  
  let ace = cards.find((card) => card.value === 1);
  cards.forEach((card) => score += card.value);
  
  if (ace && score < 12) {
    score += 10;
  }
  
  return score;
}
