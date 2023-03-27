import _ from './underscore-min.js';
/*
        C = TREBOL
        D = DIAMANTES
        H = CORAZONES
        S = ESPADAS
*/

// deck es una *Baraja*
let deck = [];
const tipos = ['C', 'D', 'H', 'S'];
const especiales = ['A', 'J', 'Q', 'K'];

// Esta funcion crea una nueva baraja
const crearDeck = () => {
  for (let i = 2; i <= 10; i++) {
    for (let tipo of tipos) {
      deck.push(i + tipo);
    }
  }

  for (let tipo of tipos) {
    for (let especial of especiales) {
      deck.push(especial + tipo);
    }
  }

  // console.log(deck);

  deck = _.shuffle(deck);
  console.log(deck);
  return deck;
};

crearDeck();

// Esta funcion me permite pedir una carta

const pedirCarta = () => {
  let cartaExtraida = deck.pop();
  return cartaExtraida;
};

console.log(pedirCarta());
console.log(deck);
