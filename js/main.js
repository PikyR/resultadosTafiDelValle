const BASE_URL =
  "https://docs.google.com/spreadsheets/d/1eYWQQ32V94kdFIVq07NsaOOG8oYHX6IVaj7M0rafgjU/gviz/tq?tqx=out:json&gid=";

// DATA
// const BASE_URL =
//   "https://docs.google.com/spreadsheets/d/1C4sBJ9SoTKKyLLpnMUxZmhFPJLt3u6VkQoauOZIWZTo/gviz/tq?tqx=out:json&gid=";

const CATEGORIA = {
  GOB: "0",
  LEG: "2124893845",
  INT: "593516931",
  CON: "1110350784",
}



const URL = (categoria) => {
  return `${BASE_URL}${categoria}`;
}

const INTERVALO = {
  '30_seg': 30000,
  '1_min': 60000,
  '5_min': 300000,
  '15_min': 900000,
  '30_min': 1800000,
}

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

console.log('Index Coso');