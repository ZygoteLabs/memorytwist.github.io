document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.memory-card');
  let hasFlippedCard = false;
  let lockBoard = false;
  let firstCard, secondCard;
  let wrongMatches = 0; // Track consecutive wrong matches
  const maxWrongMatches = 4; // Maximum allowed consecutive wrong matches

  function flipCard() {
    if (lockBoard || this === firstCard) return;
    this.classList.add('flip');

    if (!hasFlippedCard) {
      hasFlippedCard = true;
      firstCard = this;
      return;
    }

    secondCard = this;
    checkForMatch();
  }

  function checkForMatch() {
    let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
    isMatch ? disableCards() : unflipCards();
  }

  function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    resetBoard();
    wrongMatches = 0; // Reset wrong matches counter

    // Check if all cards are flipped
    if (document.querySelectorAll('.flip').length === cards.length) {
      showPopupMessage("You're Unstoppable!!");
      resetGame();
    }
  }

  function unflipCards() {
    lockBoard = true;
    setTimeout(() => {
      firstCard.classList.remove('flip');
      secondCard.classList.remove('flip');
      resetBoard();
      wrongMatches++;
      if (wrongMatches >= maxWrongMatches) {
        showPopupMessage("Not This Time!! Try Again?");
        resetGame();
      }
    }, 1000);
  }

  function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
  }

  function shuffleCards() {
    cards.forEach(card => {
      let randomPos = Math.floor(Math.random() * cards.length);
      card.style.order = randomPos;
    });
  }

  function flipAllCardsFaceDown() {
    cards.forEach(card => {
      card.classList.remove('flip');
    });
  }

  function resetGame() {
    wrongMatches = 0;
    shuffleCards();
    flipAllCardsFaceDown();
  }

  function showPopupMessage(message) {
    const popup = document.createElement('div');
    popup.classList.add('popup');
    popup.textContent = message;
    document.body.appendChild(popup);
    setTimeout(() => {
      popup.remove();
    }, 2000);
  }

  cards.forEach(card => card.addEventListener('click', flipCard));

  shuffleCards();
  flipAllCardsFaceDown();
});
