// GOBERNADOR
const cardsContainerCon = document.querySelector(".cards-container--conc");
const cardsContainerConPrimary = document.querySelector(".cards-container--primary");
const mesasEscrutadasCon = document.querySelector("#mesas-escrutadas-conc");
const votosEmitidosCon = document.querySelector("#votos-emitidos-conc");
const votosBlancoCon = document.querySelector("#votos-blanco-conc");

function renderCon(data, i) {
  const card = document.createElement('div');
  card.classList.add('card');
  card.classList.add('card--concejal');

  const cardHeader = document.createElement('div');
  cardHeader.classList.add('card__header');

  const cardImage = document.createElement('img');
  cardImage.classList.add('card__image');

  cardImage.setAttribute('src', `assets/images/concejal/${data.LISTA}.png`);
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

  if (i <= 5) {
    cardHeader.append(cardImage,cardInfo);
  } else {
    card.classList.add('card--secondary');
    cardHeader.append(cardInfo);
  }

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

  if (i <= 5) {
    cardsContainerConPrimary.appendChild(card);
  } else {
    cardsContainerCon.appendChild(card);
  }
}

async function loadCon() {
  const resultadoCon = await fetchData(URL(CATEGORIA.CON));
  const resultadoDividido = dividirArreglo(resultadoCon);

  const resultadoCandidatos = ordenarPorVotos(resultadoDividido[0]);
  const resultadoOtros = ordenarPorVotos(resultadoDividido[1]);

  votosEmitidosCon.textContent = `${resultadoOtros[0].VOTOS}`;
  votosBlancoCon.textContent = `${resultadoOtros[1].VOTOS}`;

  cardsContainerCon.innerHTML = "";

  resultadoCandidatos.forEach((element, i) => {
    renderCon(element, i);
  });
}

function ejecutar(func, intervalo) {
  document.addEventListener("DOMContentLoaded", function() {
    func();

    setInterval(func, intervalo);
  });
}

ejecutar(loadCon, INTERVALO["1_min"]);