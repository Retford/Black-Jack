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
let puntosJugador = 0,
  puntosComputadora = 0;

// Referencia del HTML
const btnPedirCarta = document.querySelector('#btn__pedir');
const btnDetenerCarta = document.querySelector('#btn__detener');
const valorJugadores = document.querySelectorAll('small');
const contenedorJugadorCarta = document.querySelector('#jugador__cartas');
const contenedorComputadoraCarta = document.querySelector(
  '#computadora__cartas'
);

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

  deck = _.shuffle(deck);
  return deck;
};

crearDeck();

// Esta funcion me permite pedir una carta

const pedirCarta = () => {
  if (deck.length === 0) {
    throw 'No hay cartas en el deck';
  }
  const cartaExtraida = deck.pop();
  return cartaExtraida;
};

const valorCarta = (cartaExtraida) => {
  const valor = cartaExtraida.substring(0, cartaExtraida.length - 1);
  return !isNaN(valor) ? valor * 1 : valor === 'A' ? 11 : 10;
};

// Turno de la Computadora
const turnoComputadora = (puntosMinimos) => {
  do {
    const carta = pedirCarta();
    puntosComputadora = puntosComputadora + valorCarta(carta);
    console.log(puntosComputadora);
    valorJugadores[1].textContent = puntosComputadora;
    const imgCarta = document.createElement('img');
    imgCarta.classList.add('carta');
    imgCarta.src = `assets/cartas/${carta}.png`;
    contenedorComputadoraCarta.appendChild(imgCarta);

    if (puntosMinimos > 21) {
      break;
    }
  } while (puntosComputadora < puntosMinimos && puntosMinimos <= 21);
};

// Botón detener
btnDetenerCarta.addEventListener('click', () => {
  btnPedirCarta.disabled = true;
  btnDetenerCarta.disabled = true;

  turnoComputadora(puntosJugador);
});

// Eventos
console.log(deck);

btnPedirCarta.addEventListener('click', () => {
  const carta = pedirCarta();
  puntosJugador = puntosJugador + valorCarta(carta);
  console.log(puntosJugador);
  valorJugadores[0].textContent = puntosJugador;
  const imgCarta = document.createElement('img');
  imgCarta.classList.add('carta');
  imgCarta.src = `assets/cartas/${carta}.png`;
  contenedorJugadorCarta.appendChild(imgCarta);

  if (puntosJugador > 21) {
    valorJugadores[0].textContent = 'Perdió :(';
    btnPedirCarta.disabled = true;
    btnDetenerCarta.disabled = true;

    turnoComputadora(puntosJugador);
  } else if (puntosJugador === 21) {
    console.warn('21, ganaste!');
    btnPedirCarta.disabled = true;
    btnDetenerCarta.disabled = true;

    turnoComputadora(puntosJugador);
  }
});
