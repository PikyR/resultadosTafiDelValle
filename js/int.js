// INTENDENTE
const cardsContainer = document.querySelector(".cards-container");
const mesasEscrutadas = document.querySelector("#mesas-escrutadas");
const votosEmitidos = document.querySelector("#votos-emitidos");
const votosBlanco = document.querySelector("#votos-blanco");

function renderInt(data, i) {
  // cardsContainer.innerHTML = "";

  const card = document.createElement('div');
  card.classList.add('card');

  if (i === 0) {
    card.classList.add('card--primary');
  }

  switch (data.LISTA) {
    case '69':
      card.classList.add("card--yapura");
      break;
    case '85':
      card.classList.add("card--guanco");
      break;
    case '821':
      card.classList.add("card--saavedra");
      break;
    case '830':
      card.classList.add("card--caliva");
      break;
    case '831':
      card.classList.add("card--paz");
      break;
  }

  const cardHeader = document.createElement('div');
  cardHeader.classList.add('card__header');

  const cardImage = document.createElement('img');
  cardImage.classList.add('card__image');
  cardImage.setAttribute('src', `assets/images/intendente/${data.LISTA}.png`);
  cardImage.setAttribute('alt', `${data.CANDIDATO}`);

  const cardInfo = document.createElement('div');
  cardInfo.classList.add('card__info');

  const infoText = document.createElement('p');
  infoText.classList.add('card__info-text');
  infoText.textContent = 'Lista ';

  const numLista = document.createElement('span');
  numLista.classList.add('card__info-numLista');
  numLista.textContent = data.LISTA;

  infoText.append(numLista);

  const lista = document.createElement('p');
  lista.classList.add('card__info-lista');
  lista.textContent = `${data.PARTIDO}`;

  const candidato = document.createElement('p');
  candidato.classList.add('card__info-candidato');
  candidato.textContent = `${data.CANDIDATO}`;

  cardInfo.append(infoText, lista, candidato);
  cardHeader.append(cardImage,cardInfo);

  const cardBody = document.createElement('div');
  cardBody.classList.add('card__body');

  const porcentaje = document.createElement('p');
  porcentaje.classList.add('card__body-porcentaje');
  porcentaje.textContent = `${data.PORCENTAJE} %`;

  const votos = document.createElement('p');
  votos.classList.add('card__body-votos');
  votos.textContent = `Votos: ${data.VOTOS}`;
  cardBody.append(votos, porcentaje);

  card.append(cardHeader, cardBody);

  cardsContainer.appendChild(card);
}

async function loadInt() {
  const resultadoInt = await fetchData(URL(CATEGORIA.INT));
  const resultadoDividido = dividirArreglo(resultadoInt);

  const resultadoCandidatos = ordenarPorVotos(resultadoDividido[0]);
  const resultadoOtros = ordenarPorVotos(resultadoDividido[1]);

  votosEmitidos.textContent = `${resultadoOtros[0].VOTOS}`;
  votosBlanco.textContent = `${resultadoOtros[3].VOTOS}`;

  cardsContainer.innerHTML = "";

  resultadoCandidatos.forEach((element, i) => {
    renderInt(element, i);
  });
}

// function ejecutar(func, intervalo) {
//   document.addEventListener("DOMContentLoaded", function() {
//     cardsContainer.innerHTML = "";
//     func();

//     setInterval(func, intervalo);
//   });
// }

// ejecutar(loadInt, INTERVALO["1_min"]);

loadInt();
