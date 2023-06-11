// GOBERNADOR
const cardsContainerGob = document.querySelector(".cards-container--gob");
const mesasEscrutadasGob = document.querySelector("#mesas-escrutadas-gob");
const votosEmitidosGob = document.querySelector("#votos-emitidos-gob");
const votosBlancoGob = document.querySelector("#votos-blanco-gob");

function renderGob(data, i) {
  const card = document.createElement('div');
  card.classList.add('card');
  card.classList.add('card--gobernador');

  // if (i === 0) {
  //   card.classList.add('card--primary');
  // }

  const cardHeader = document.createElement('div');
  cardHeader.classList.add('card__header');

  const cardImage = document.createElement('img');
  cardImage.classList.add('card__image');
  
  cardImage.setAttribute('src', `assets/images/gobernador/${data.LISTA}.png`);
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

  cardsContainerGob.appendChild(card);
}

async function loadGob() {
  const resultadoGob = await fetchData(URL(CATEGORIA.GOB));
  const resultadoDividido = dividirArreglo(resultadoGob);

  const resultadoCandidatos = ordenarPorVotos(resultadoDividido[0]);
  const resultadoOtros = ordenarPorVotos(resultadoDividido[1]);

  votosEmitidosGob.textContent = `${resultadoOtros[0].VOTOS}`;
  votosBlancoGob.textContent = `${resultadoOtros[1].VOTOS}`;

  cardsContainerGob.innerHTML = "";

  resultadoCandidatos.forEach((element, i) => {
    renderGob(element, i);
  });
}

function ejecutar(func, intervalo) {
  document.addEventListener("DOMContentLoaded", function() {
    func();

    setInterval(func, intervalo);
  });
}

ejecutar(loadGob, INTERVALO["1_min"]);