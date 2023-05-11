const BASE_URL =
  "https://docs.google.com/spreadsheets/d/1C4sBJ9SoTKKyLLpnMUxZmhFPJLt3u6VkQoauOZIWZTo/gviz/tq?tqx=out:json&gid=";

const CATEGORIA = {
  GOB: "0",
  LEG: "2124893845",
  INT: "593516931",
  CON: "1110350784",
}

const INTERVALO = {
  '30_seg': 30000,
  '1_min': 60000,
  '5_min': 300000,
  '15_min': 900000,
  '30_min': 1800000,
}

const cardsContainer = document.querySelector(".cards-container");
const mesasEscrutadas = document.querySelector("#mesas-escrutadas");
const votosEmitidos = document.querySelector("#votos-emitidos");
const votosBlanco = document.querySelector("#votos-blanco");

console.log([mesasEscrutadas, votosEmitidos, votosBlanco]);

function convertirObjeto(data) {
  var obj = {};

  obj = data.table.rows.map(function(item) {
    return {
      LISTA: item.c[0].v.toString(),
      PARTIDO: item.c[1].v.toString(),
      CANDIDATO: item.c[2].v.toString(),
      VOTOS: item.c[3].v,
      PORCENTAJE: item.c[4].v.toFixed(1)
    }
  });

  return obj;
}

function ordenarPorVotos(arr) {
  arr.sort(function(a, b) {
    const votosA = Number(a.VOTOS);
    const votosB = Number(b.VOTOS);

    if (votosA > votosB) {
      return -1;
    }
    if (votosA < votosB) {
      return 1;
    }
    return 0;
  });

  return arr;
}

function dividirArreglo (arr){
  const totalLength = arr.length;

  const candidatos = arr.slice(0, (totalLength - 5));
  const otrosElementos = arr.slice(totalLength - 5);

  return [candidatos, otrosElementos];
}

async function fetchData(url){
  try {
    const respuesta = await fetch(url);
    const texto = await respuesta.text();
    const data = JSON.parse(texto.substring(47, texto.length - 2));
    return convertirObjeto(data)
  } catch (err) {
    console.log("Error name: " + err.name);
    console.log("Error message: " + err.message);
  }
}

function renderHeader(data) {
  mesasEscrutadas.textContent("0/23");
  votosEmitidos.textContent(data.VOTOS);
}


function renderInt(data, i) {
  const card = document.createElement('div');
  card.classList.add('card');

  if (i === 0) {
    card.classList.add('card--primary');
  }

  console.log(" a"  , data.LISTA);

  switch (data.LISTA) {
    case '69':
      card.classList.add("card--yapura");
      console.log(data.LISTA);
      break;
    case '85':
      card.classList.add("card--guanco");
      console.log(data.LISTA);
      break;
    case '821':
      card.classList.add("card--saavedra");
      console.log(data.LISTA);
      break;
    case '830':
      card.classList.add("card--caliva");
      console.log(data.LISTA);
      break;
    case '831':
      card.classList.add("card--paz");
      console.log(data.LISTA);
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
  votos.textContent = `${data.VOTOS}`;
  cardBody.append(porcentaje, votos);

  card.append(cardHeader, cardBody);

  cardsContainer.appendChild(card);
}

async function loadInt() {
  const resultadoGob = await fetchData(`${BASE_URL}${CATEGORIA.INT}`);
  const resultadoDividido = dividirArreglo(resultadoGob);

  const resultadoCandidatos = ordenarPorVotos(resultadoDividido[0]);
  const resultadoOtros = ordenarPorVotos(resultadoDividido[1]);

  votosEmitidos.textContent = `${resultadoOtros[0].VOTOS}`;
  votosBlanco.textContent = `${resultadoOtros[3].VOTOS}`;

  resultadoCandidatos.forEach((element, i) => {
    renderInt(element, i);
  });
}

loadInt();
console.log('Coso');