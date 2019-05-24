const content = document.querySelector('.content');
const cards = Array.from(document.querySelectorAll('.card'));
const gameScore = document.querySelector('.gameScore');
const gameResult = document.querySelector('.gameResult');

//arr wirh images (classes)
const imagesForCards = [
  'card_poroshenko',
  'card_timoshenko',
  'card_grycenko',
  'card_zelenskyi',
  'card_liashko',
  'card_vaider',
  'card_poroshenko2',
  'card_timoshenko2',
  'card_grycenko2',
  'card_zelenskyi2',
  'card_liashko2',
  'card_vaider2'
];

//shuffle items in array
const Shuffle = arr => arr.sort(() => 0.5 - Math.random());

//process cards content
const processCardsContent = (arr, content) => {
  arr.forEach((card, index) => card.classList.add(content[index]));
};

processCardsContent(cards, Shuffle(imagesForCards));

//counter for score
let counter = 0;

//array for comparing
let selectionArr = [];

const compareCards = event => {
  if (selectionArr.length === 2) {
    //prevent content for clicking
    content.classList.add('disabled');
    //checking for unique class name
    //(-7 and -8 from this.length meens - delete class rotate, that adds by fn rotateCard)
    selectionArr[0].slice(0, this.length - 7) === selectionArr[1].slice(0, this.length - 8) ||
    selectionArr[0].slice(0, this.length - 8) === selectionArr[1].slice(0, this.length - 7)
      ? //allow content for clicking & hide cards
        (content.classList.remove('disabled'), hideAfterCorrectSelection())
      : //allow content for clicking & rotate reverse cards
        setTimeout(() => {
          content.classList.remove('disabled');
          defaultCardsPosition();
        }, 750);
    return (selectionArr = []);
  }
};

const rotateCard = event => {
  let target = event.target;
  while (target !== content) {
    if (target.hasAttribute('data-cardName')) {
      target.classList.add('rotate');
      counter++;
      return selectionArr.push(target.getAttribute('class'));
    }
    target = target.parentNode;
  }
};

const defaultCardsPosition = () => {
  cards.forEach(card =>
    card.classList.contains('rotate') ? card.classList.remove('rotate') : null
  );
};

const hideAfterCorrectSelection = () => {
  cards.forEach(card => (card.classList.contains('rotate') ? card.classList.add('hidden') : null));
};

const showGameScore = () => {
  return (gameScore.textContent = `Your score is: ${counter}`);
};

const generateGameResultMassage = () => {
  let resultMassage1 = [`Awesome`, `It's the best result!`, `Your are lucky!!!`];
  let resultMassage2 = [
    `Congratulation!`,
    `Your result is: ${counter}`,
    `For improving, please, try again!`
  ];
  let resultMassage3 = [`You can better!`, `Your result is: ${counter}`, `Try again!`];
  for (let i = 0; i < 3; i++) {
    if (counter === 12) gameResult.children[i].textContent = resultMassage1[i];
    else if (counter > 12 && counter <= 20) gameResult.children[i].textContent = resultMassage2[i];
    else gameResult.children[i].textContent = resultMassage3[i];
  }
};

const showGameResult = () => {
  let resultArr = [];

  cards.forEach(card => resultArr.push(card.classList.contains('hidden')));

  if (resultArr.reduce((current, next) => (current === next ? next : false))) {
    gameResult.classList.toggle('hide');
    generateGameResultMassage();
    setTimeout(() => window.location.reload(), 7000);
  }
};

content.addEventListener('click', event => {
  rotateCard(event);
  compareCards();
  showGameScore();
  showGameResult();
});

// reload tab
gameResult.addEventListener('click', () => {
  window.location.reload();
});
