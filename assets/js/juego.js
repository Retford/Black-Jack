/*
        C = TREBOL
        D = DIAMANTES
        H = CORAZONES
        S = ESPADAS
*/

const miModulo = (() => {
  'use strict';

  // deck es una *Baraja*
  let deck = [];
  const tipos = ['C', 'D', 'H', 'S'],
    especiales = ['A', 'J', 'Q', 'K'];

  let puntosJugadores = [];

  // Referencia del HTML
  const btnPedirCarta = document.querySelector('#btn__pedir'),
    btnDetenerCarta = document.querySelector('#btn__detener'),
    btnNuevoJuego = document.querySelector('#btn__nuevo'),
    valorJugadores = document.querySelectorAll('small'),
    divCartasJugadores = document.querySelectorAll('.divCartas');

  // Esta función inicializa el Juego
  const inicializarJuego = (numJugadores = 2) => {
    deck = crearDeck();

    puntosJugadores = [];

    for (let i = 0; i < numJugadores; i++) {
      puntosJugadores.push(0);
    }

    valorJugadores.forEach((element) => (element.innerText = 0));
    divCartasJugadores.forEach((element) => (element.innerHTML = ''));

    btnPedirCarta.disabled = false;
    btnDetenerCarta.disabled = false;
  };

  // Esta funcion crea una nueva baraja
  const crearDeck = () => {
    deck = [];
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

    return _.shuffle(deck);
  };

  // Esta funcion me permite pedir una carta

  const pedirCarta = () => {
    if (deck.length === 0) {
      throw 'No hay cartas en el deck';
    }
    return deck.pop();
  };

  const valorCarta = (cartaExtraida) => {
    const valor = cartaExtraida.substring(0, cartaExtraida.length - 1);
    return !isNaN(valor) ? valor * 1 : valor === 'A' ? 11 : 10;
  };

  // Turno:0 es el primero jugador y el último es la computadora
  const acumularPuntos = (carta, turno) => {
    puntosJugadores[turno] += valorCarta(carta);
    valorJugadores[turno].innerHTML = puntosJugadores[turno];
    return puntosJugadores[turno];
  };

  const CrearCarta = (carta, turno) => {
    const imgCarta = document.createElement('img');
    imgCarta.classList.add('carta');
    imgCarta.src = `assets/cartas/${carta}.png`;
    divCartasJugadores[turno].append(imgCarta);
  };

  const determinarGanador = () => {
    const [puntosMinimos, puntosComputadora] = puntosJugadores;
    setTimeout(() => {
      puntosMinimos > 21
        ? alert('La Computadora Gana')
        : puntosMinimos === puntosComputadora
        ? alert('Nadie Gana')
        : puntosComputadora > 21
        ? alert('El Jugador Gana')
        : puntosMinimos < puntosComputadora
        ? alert('La Computadora Gana')
        : alert('El Jugador Gana');
    }, 250);
  };

  // Turno de la Computadora
  const turnoComputadora = (puntosMinimos) => {
    let puntosComputadora = 0;
    do {
      const carta = pedirCarta();
      puntosComputadora = acumularPuntos(carta, puntosJugadores.length - 1);
      CrearCarta(carta, puntosJugadores.length - 1);
    } while (puntosComputadora < puntosMinimos && puntosMinimos <= 21);
    determinarGanador();
  };

  // Botón detener
  btnDetenerCarta.addEventListener('click', () => {
    btnPedirCarta.disabled = true;
    btnDetenerCarta.disabled = true;

    turnoComputadora(puntosJugadores[0]);
  });

  // Eventos
  btnPedirCarta.addEventListener('click', () => {
    const carta = pedirCarta();

    const puntosJugador = acumularPuntos(carta, 0);

    CrearCarta(carta, 0);

    if (puntosJugador > 21) {
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

  // Boton de Juego Nuevo

  btnNuevoJuego.addEventListener('click', () => {
    inicializarJuego();
  });

  return {
    iniciarJuego: inicializarJuego,
  };
})();
