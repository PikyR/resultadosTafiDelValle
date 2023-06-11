// LEGISLADOR
const cardsContainerLeg = document.querySelector(".cards-container--leg");
const mesasEscrutadasLeg = document.querySelector("#mesas-escrutadas-leg");
const votosEmitidosLeg = document.querySelector("#votos-emitidos-leg");
const votosBlancoLeg = document.querySelector("#votos-blanco-leg");

function renderLeg(data, i) {
  const card = document.createElement('div');
  card.classList.add('card');
  card.classList.add('card--legislador');

  const cardHeader = document.createElement('div');
  cardHeader.classList.add('card__header');

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
  cardHeader.append(cardInfo);

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

  cardsContainerLeg.appendChild(card);
}

async function loadLeg() {
  const resultadoLeg = await fetchData(URL(CATEGORIA.LEG));
  const resultadoDividido = dividirArreglo(resultadoLeg);

  const resultadoCandidatos = ordenarPorVotos(resultadoDividido[0]);
  const resultadoOtros = ordenarPorVotos(resultadoDividido[1]);

  votosEmitidosLeg.textContent = `${resultadoOtros[0].VOTOS}`;
  votosBlancoLeg.textContent = `${resultadoOtros[1].VOTOS}`;

  cardsContainer.innerHTML = "";

  resultadoCandidatos.forEach((element, i) => {
    renderLeg(element, i);
  });
}



function ejecutar(func, intervalo) {
  document.addEventListener("DOMContentLoaded", function() {
    func();

    setInterval(func, intervalo);
  });
}

ejecutar(loadLeg, 1000);